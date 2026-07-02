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
       IMAGE URL LOOKUP
       Maps image filenames to their hosted Qualtrics graphic URLs.
       ========================================================== */
    var IMG = {
        "2394_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_5lxgbEa3yaEPMIs",
        "None.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_4u30N2tqJoyGQHo",
        "2700_neg.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_uBcToCowu1VT2iL",
        "2276_neg.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_chGjHXVvAwWrCN2",
        "2359_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_IlAF9vg4iD1pTPW",
        "4605_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_Iu4ReFTKEAjN8zh",
        "6831_neg.bmp": "MISSING",
        "2305_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_5ULiEyToDlcDKJP",
        "2026_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_7UiEXEozpIXJlON",
        "7493_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_qREp8l9C9zQwX3S",
        "3550_neg.bmp": "MISSING",
        "2273_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_t3fLwedy3hFjegH",
        "2749_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_URFHRBm9Ln640as",
        "6571_neg.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_L0pRWLQA0s4i306",
        "9400_neg.bmp": "MISSING",
        "9332_neg.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_NVE4R3ecPnMhCPF",
        "9419_neg.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_cU2Ps8SRJkKqbZe",
        "2036_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_x8gKrRccKr2MeV3",
        "2102_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_CmHmTD0Vt5TScV0",
        "2107_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_JhKecVuww9vrL09",
        "2214_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_AeeejmV2an6wQi2",
        "2308_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_Mb6iTQ0lmP1Q2XJ",
        "2382_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_BaHbPK2ZmFVawBf",
        "2390_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_FqFxfOqP0XbMUgx",
        "2393_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_uZdUsRLWl7qTROT",
        "2396_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_weI25Rl6nVbImhc",
        "2397_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_JngF9hpdhze7Dwy",
        "2411_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_iHqYJTzs5RiD9JH",
        "2435_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_sm6zePuB3VtBORR",
        "2488_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_nsHteBGWpPnQ9KZ",
        "2489_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_5jiXcZy9ZOR4cfl",
        "2495_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_0QzdylqeJ5zasoS",
        "2514_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_H7RlkrIEbqpDsh2",
        "2518_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_U7yRxFnILbtWttt",
        "2570_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_nTBs1GeduWKkDDD",
        "2579_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_nMbGzOwWbOdg1Aj",
        "2580_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_mghwXOX5NcN4PGl",
        "2593_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_Q0q0IjpEsBy3AWR",
        "2745.1_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_8jgR4d7kH8mEzVt",
        "2850_neut.JPG": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_n4vAdlCqBJc3pY0",
        "8312_neut.jpg": "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_84VgqilIWvAA8p7"
    };

    /* ==========================================================
       TRIAL DATA
       f1 = left flanker filename
       cp = center picture filename
       f2 = right flanker filename
       ft = flanker type (neu / neg / none)
       ========================================================== */
    var SET1 = [
        { trial_num: 1, f1: "2394_neut.JPG", cp: "2036_neut.jpg", f2: "2394_neut.JPG", ft: "neu" },
        { trial_num: 2, f1: "None.jpg", cp: "2102_neut.jpg", f2: "None.jpg", ft: "none" },
        { trial_num: 3, f1: "2700_neg.JPG", cp: "2107_neut.jpg", f2: "2700_neg.JPG", ft: "neg" },
        { trial_num: 4, f1: "None.jpg", cp: "2214_neut.jpg", f2: "None.jpg", ft: "none" },
        { trial_num: 5, f1: "2276_neg.JPG", cp: "2308_neut.jpg", f2: "2276_neg.JPG", ft: "neg" },
        { trial_num: 6, f1: "None.jpg", cp: "2382_neut.jpg", f2: "None.jpg", ft: "none" },
        { trial_num: 7, f1: "2359_neut.jpg", cp: "2390_neut.jpg", f2: "2359_neut.jpg", ft: "neu" },
        { trial_num: 8, f1: "4605_neut.JPG", cp: "2393_neut.JPG", f2: "4605_neut.JPG", ft: "neu" },
        { trial_num: 9, f1: "None.jpg", cp: "2396_neut.jpg", f2: "None.jpg", ft: "none" },
        { trial_num: 10, f1: "6831_neg.bmp", cp: "2397_neut.jpg", f2: "6831_neg.bmp", ft: "neg" },
        { trial_num: 11, f1: "None.jpg", cp: "2411_neut.jpg", f2: "None.jpg", ft: "none" },
        { trial_num: 12, f1: "None.jpg", cp: "2435_neut.JPG", f2: "None.jpg", ft: "none" },
        { trial_num: 13, f1: "2305_neut.jpg", cp: "2488_neut.jpg", f2: "2305_neut.jpg", ft: "neu" },
        { trial_num: 14, f1: "2026_neut.jpg", cp: "2489_neut.jpg", f2: "2026_neut.jpg", ft: "neu" },
        { trial_num: 15, f1: "7493_neut.JPG", cp: "2495_neut.JPG", f2: "7493_neut.JPG", ft: "neu" },
        { trial_num: 16, f1: "3550_neg.bmp", cp: "2514_neut.JPG", f2: "3550_neg.bmp", ft: "neg" },
        { trial_num: 17, f1: "None.jpg", cp: "2518_neut.JPG", f2: "None.jpg", ft: "none" },
        { trial_num: 18, f1: "2273_neut.jpg", cp: "2570_neut.JPG", f2: "2273_neut.jpg", ft: "neu" },
        { trial_num: 19, f1: "2749_neut.JPG", cp: "2579_neut.JPG", f2: "2749_neut.JPG", ft: "neu" },
        { trial_num: 20, f1: "None.jpg", cp: "2580_neut.JPG", f2: "None.jpg", ft: "none" },
        { trial_num: 21, f1: "6571_neg.JPG", cp: "2593_neut.jpg", f2: "6571_neg.JPG", ft: "neg" },
        { trial_num: 22, f1: "9400_neg.bmp", cp: "2745.1_neut.jpg", f2: "9400_neg.bmp", ft: "neg" },
        { trial_num: 23, f1: "9332_neg.jpg", cp: "2850_neut.JPG", f2: "9332_neg.jpg", ft: "neg" },
        { trial_num: 24, f1: "9419_neg.jpg", cp: "8312_neut.jpg", f2: "9419_neg.jpg", ft: "neg" }
    ];

    /* Set 2: same images, trial numbers 25-48 */
    var SET2 = SET1.map(function (t) {
        return { trial_num: t.trial_num + 24, f1: t.f1, cp: t.cp, f2: t.f2, ft: t.ft };
    });

    /* Select correct set based on group and block */
    var trials;
    if (BLOCK === 1) {
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
