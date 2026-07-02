/* ============================================================
   BLOCK TRIALS – All 24 trials in one question
   To use for Block 2: change BLOCK = 1 to BLOCK = 2
   at the top of the CONFIGURATION section.

   External-file version: expects trial.html to be injected
   into the DOM and trial.css to be loaded before this runs.
   ============================================================ */

/* ==========================================================
   Qualtrics hooks
   ----------------------------------------------------------
   • addOnload  – injects the CSS <link> into <head>
   • addOnReady – runs the experiment logic once the DOM
                  and the injected HTML are ready

   If running outside Qualtrics (standalone testing), the
   fallback at the bottom of this file calls initTrial()
   directly.
   ========================================================== */

/* ----------------------------------------------------------
   initTrial(qualtricsContext)
   Main entry point.  `qualtricsContext` is either the
   Qualtrics `this` object or null for standalone mode.
   ---------------------------------------------------------- */
function initTrial(qualtricsContext) {

    /* ==========================================================
       CONFIGURATION
       Change BLOCK to 2 for the Block 2 question.
       ========================================================== */
    var BLOCK = window.block;

    /* ==========================================================
       GROUP ASSIGNMENT (set by Randomizer in Survey Flow)
       ----------------------------------------------------------
       In Qualtrics this is piped; for standalone testing you can
       hardcode 'A' or 'B'.
       ========================================================== */
    var group;
    if (qualtricsContext) {
        group = "${e://Field/group}";           // Qualtrics piped text
    } else {
        group = 'A';                            // standalone fallback
    }

    /* ==========================================================
       IMAGE URL LOOKUP  +  TRIAL DATA
       ----------------------------------------------------------
       Both are loaded from trial-config.js (window.TRIAL_CONFIG).
       Make sure trial-config.js is included BEFORE trial.js.
       ========================================================== */
    if (!window.TRIAL_CONFIG) {
        console.error('[trial.js] window.TRIAL_CONFIG is not defined. ' +
            'Did you forget to load trial-config.js before trial.js?');
        return;
    }

    var IMG = window.TRIAL_CONFIG.images;
    var SET1 = window.TRIAL_CONFIG.trials;
    var SET_PRACTICE_TRIALS = window.TRIAL_CONFIG.practiceTrials;

    /* Set 2: same images, trial numbers 25-48 */
    var SET2 = SET1.map(function (t) {
        return { trial_num: t.trial_num + 24, f1: t.f1, cp: t.cp, f2: t.f2, ft: t.ft };
    });

    /* Select correct set based on group, block and if it's a practice */
    var trials;
    if (window.isPractice == true) {
        trials = SET_PRACTICE_TRIALS
    }
    else if (BLOCK === 1) {
        trials = (group === 'A') ? SET1 : SET2;
    } else {
        trials = (group === 'A') ? SET2 : SET1;
    }

    /* ==========================================================
       GORILLA RANDOMIZATION
       Direct port of the original Gorilla preProcessSpreadsheet.
       No more than 2 consecutive trials with the same flanker type.
       ========================================================== */
    function randomizeTrials(spreadsheet) {
        var modifiedSpreadsheet = [];
        var arr = [];
        var spreadsheetLen = spreadsheet.length;
        var flankerType = "";
        var k = 0;
        var i, j, random;

        for (j = 0; j < spreadsheetLen; j++) {
            arr.push(j);
        }

        while (modifiedSpreadsheet.length < spreadsheetLen) {
            k += 1;
            if (k > 100) {
                arr = [];
                for (j = 0; j < spreadsheetLen; j++) {
                    arr.push(j);
                }
                modifiedSpreadsheet = [];
                k = 0;
                continue;
            }

            random = arr[Math.floor(Math.random() * arr.length)];
            flankerType = spreadsheet[random].ft;

            if (modifiedSpreadsheet.length < 2) {
                modifiedSpreadsheet.push(spreadsheet[random]);
                for (i = 0; i < arr.length; i++) {
                    if (arr[i] === random) {
                        arr.splice(i, 1);
                        break;
                    }
                }
                continue;
            }

            if (flankerType === modifiedSpreadsheet[modifiedSpreadsheet.length - 1].ft &&
                flankerType === modifiedSpreadsheet[modifiedSpreadsheet.length - 2].ft) {
                continue;
            }

            modifiedSpreadsheet.push(spreadsheet[random]);
            for (i = 0; i < arr.length; i++) {
                if (arr[i] === random) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }

        return modifiedSpreadsheet;
    }

    var orderedTrials = randomizeTrials(trials);

    /* Save trial order for data analysis */
    if (qualtricsContext) {
        Qualtrics.SurveyEngine.setJSEmbeddedData(
            'trial_order_b' + BLOCK,
            JSON.stringify(orderedTrials.map(function (t) {
                return {
                    trial_num: t.trial_num,
                    center: t.cp,
                    flanker: t.f1,
                    flanker_type: t.ft
                };
            }))
        );
    }

    /* ==========================================================
       DOM REFERENCES
       These elements must exist in trial.html.
       ========================================================== */
    var overlay = document.getElementById('trial-overlay');
    var fixation = document.getElementById('fixation');
    var imageRow = document.getElementById('image-row');
    var sliderRow = document.getElementById('slider-row');
    var slider = document.getElementById('rating-slider');
    var nextBtn = document.getElementById('next-btn');

    /* Hide the Qualtrics "Next" button */
    if (qualtricsContext) {
        qualtricsContext.hideNextButton();
    }
    document.body.style.backgroundColor = '#000';

    /* ==========================================================
       IMAGE BUILDER
       Returns an <img> element or a blank <div> placeholder.
       ========================================================== */
    function buildImage(url, isCenter) {
        if (!url || url === 'MISSING') {
            var blank = document.createElement('div');
            blank.className = 'trial-img-blank';
            return blank;
        }
        var img = document.createElement('img');
        img.src = url;
        img.className = 'trial-img ' + (isCenter ? 'center' : 'flanker');
        return img;
    }

    /* ==========================================================
       TRIAL RUNNER
       ========================================================== */
    var currentTrial = 0;
    var sliderStartTime = 0;
    var phase1Timer, phase2Timer;

    function runTrial() {
        if (currentTrial >= orderedTrials.length) {
            /* All trials done — clean up and advance survey */
            if (overlay) overlay.remove();
            var bgStyle = document.getElementById('trial-bg');
            if (bgStyle) bgStyle.remove();
            document.body.style.backgroundColor = '';

            if (qualtricsContext) {
                qualtricsContext.clickNextButton();
            }
            return;
        }

        var t = orderedTrials[currentTrial];

        /* --- Reset for new trial --- */
        fixation.style.display = 'flex';
        imageRow.style.display = 'none';
        imageRow.innerHTML = '';
        sliderRow.style.display = 'none';
        slider.value = '0';
        slider.classList.remove('active');
        nextBtn.style.display = 'none';

        /* Pre-build images for this trial */
        imageRow.appendChild(buildImage(IMG[t.f1], false));
        imageRow.appendChild(buildImage(IMG[t.cp], true));
        imageRow.appendChild(buildImage(IMG[t.f2], false));

        /* Phase 1: fixation 1 000 ms */
        phase1Timer = setTimeout(function runPhase2() {
            fixation.style.display = 'none';
            imageRow.style.display = 'flex';
            sliderRow.style.display = 'flex';

            /* Phase 2: images visible for 3 000 ms */
            phase2Timer = setTimeout(function runPhase3() {
                imageRow.style.display = 'none';
                slider.classList.add('active');
                nextBtn.style.display = 'block';
                sliderStartTime = Date.now();
            }, 3000);
        }, 1000);
    }

    /* ==========================================================
       RESPONSE HANDLER
       ========================================================== */
    nextBtn.addEventListener('click', function handleNextClick() {
        var rating = parseInt(slider.value, 10);
        var rt = Date.now() - sliderStartTime;
        var t = orderedTrials[currentTrial];

        if (qualtricsContext) {
            Qualtrics.SurveyEngine.setJSEmbeddedData('rating_t' + t.trial_num, rating);
            Qualtrics.SurveyEngine.setJSEmbeddedData('rt_t' + t.trial_num, rt);
        } else {
            /* Standalone: log to console for debugging */
            console.log('Trial ' + t.trial_num +
                '  rating=' + rating +
                '  rt=' + rt + 'ms');
        }

        currentTrial++;
        runTrial();
    });

    /* ==========================================================
       BLOCK ACCIDENTAL KEYBOARD ADVANCES
       ========================================================== */
    document.addEventListener('keydown', function blockKeys(e) {
        if (e.which === 13 || e.which === 32) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    /* Start the first trial */
    runTrial();
}


/* ==========================================================
   BOOTSTRAP
   ----------------------------------------------------------
   • Inside Qualtrics: the addOnload / addOnReady hooks call
     initTrial() with the survey engine context.
   • Standalone (loaded directly in a browser): detect that
     Qualtrics is absent and self-start.
   ========================================================== */
if (typeof Qualtrics === 'undefined') {
    /* Standalone mode */
    document.addEventListener('DOMContentLoaded', function () {
        initTrial(null);
    });
}
