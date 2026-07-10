/* ============================================================
   TRIAL ENGINE — Flanker images + Monetary lottery decision
   ----------------------------------------------------------
   Each trial shows:
     Phase 1  Fixation cross            (fixationMs)
     Phase 2  Flankers only, no lottery (flankerOnlyMs)
     Phase 3  Flankers + lottery widget, NOT interactive
                                        (displayNonInteractiveMs)
     Phase 4  Lottery becomes clickable; flankers stay visible.
              Participant chooses Fixed or the Lottery,
              then clicks "next" to advance.

   Data saved per trial (Qualtrics embedded data):
     choice_t{N}  — "fixed" or "lottery"
     rt_t{N}      — ms from lottery becoming interactive to
                     "next" button click

   Expects trial-config.js and trial.html loaded first.
   ============================================================ */

async function initTrial(qualtricsContext) {

    /* ==========================================================
       CONFIGURATION
       ========================================================== */
    var BLOCK = window.block;

    /* Group assignment */
    var group;
    if (qualtricsContext) {
        group = "${e://Field/group}";
    } else {
        group = 'A';
    }

    /* color_gain is a between-subject variable derived from group:
       Group A → blue (gain side), all others → red */
    var colorGain = (group === 'A') ? 'blue' : 'red';

    /* ==========================================================
       LOAD CONFIG
       ========================================================== */
    if (!window.TRIAL_CONFIG) {
        console.error('[trial.js] window.TRIAL_CONFIG not defined. ' +
            'Load trial-config.js before trial.js.');
        return;
    }

    var fixationMs = window.TRIAL_CONFIG.fixationMs !== undefined ? window.TRIAL_CONFIG.fixationMs : 1000;
    var flankerOnlyMs = window.TRIAL_CONFIG.flankerOnlyMs !== undefined ? window.TRIAL_CONFIG.flankerOnlyMs : 2000;
    var displayNonInteractiveMs = window.TRIAL_CONFIG.displayNonInteractiveMs !== undefined ? window.TRIAL_CONFIG.displayNonInteractiveMs : 2000;
    var autoAdvanceDelayMs = window.TRIAL_CONFIG.autoAdvanceDelayMs !== undefined ? window.TRIAL_CONFIG.autoAdvanceDelayMs : 500;
    var fixedAmount = window.TRIAL_CONFIG.fixedAmount !== undefined ? window.TRIAL_CONFIG.fixedAmount : 5;
    var IMG = window.TRIAL_CONFIG.images;
    var SET1 = window.TRIAL_CONFIG.trials;
    var SET_PRACTICE_TRIALS = window.TRIAL_CONFIG.practiceTrials;

    /* Set 2: same trials, offset trial_num by 49 */
    var SET2 = SET1.map(function (t) {
        return {
            trial_num: t.trial_num + 49,
            f1: t.f1, f2: t.f2, ft: t.ft,
            lottery: t.lottery
        };
    });

    /* Select correct set */
    var trials;
    if (window.isPractice) {
        trials = SET_PRACTICE_TRIALS;
    } else if (BLOCK === 1) {
        trials = (group === 'A') ? SET1 : SET2;
    } else {
        trials = (group === 'A') ? SET2 : SET1;
    }

    /* ==========================================================
       GORILLA RANDOMIZATION
       No more than 2 consecutive same flanker type.
       ========================================================== */
    function randomizeTrials(spreadsheet) {
        var result = [];
        var arr = [];
        var len = spreadsheet.length;
        var k = 0;
        var i, j, rand, ft;

        for (j = 0; j < len; j++) arr.push(j);

        while (result.length < len) {
            k += 1;
            if (k > 100) {
                arr = [];
                for (j = 0; j < len; j++) arr.push(j);
                result = [];
                k = 0;
                continue;
            }

            rand = arr[Math.floor(Math.random() * arr.length)];
            ft = spreadsheet[rand].ft;

            if (result.length < 2) {
                result.push(spreadsheet[rand]);
                for (i = 0; i < arr.length; i++) {
                    if (arr[i] === rand) { arr.splice(i, 1); break; }
                }
                continue;
            }

            if (ft === result[result.length - 1].ft &&
                ft === result[result.length - 2].ft) {
                continue;
            }

            result.push(spreadsheet[rand]);
            for (i = 0; i < arr.length; i++) {
                if (arr[i] === rand) { arr.splice(i, 1); break; }
            }
        }
        return result;
    }

    var orderedTrials = randomizeTrials(trials);

    /* Generate counterbalanced fixed-side assignment:
       Exactly half the trials have the fixed option on the left,
       the other half on the right. Shuffled randomly. */
    var fixedOnLeftAssignment = (function () {
        var n = orderedTrials.length;
        var arr = [];
        for (var i = 0; i < n; i++) {
            arr.push(i < Math.floor(n / 2));
        }
        // Fisher-Yates shuffle
        for (var j = arr.length - 1; j > 0; j--) {
            var k = Math.floor(Math.random() * (j + 1));
            var tmp = arr[j]; arr[j] = arr[k]; arr[k] = tmp;
        }
        return arr;
    })();

    /* Save trial order */
    if (qualtricsContext) {
        Qualtrics.SurveyEngine.setJSEmbeddedData(
            'trial_order_b' + BLOCK,
            JSON.stringify(orderedTrials.map(function (t) {
                return {
                    trial_num: t.trial_num,
                    flanker: t.f1,
                    flanker_type: t.ft,
                    lottery_type: t.lottery.type,
                    lottery_level: t.lottery.level,
                    lottery_amount: t.lottery.amount,
                    lottery_color: t.lottery.color_gain
                };
            }))
        );
    }

    /* ==========================================================
       DOM REFERENCES
       ========================================================== */
    var overlay = document.getElementById('trial-overlay');
    var fixation = document.getElementById('fixation');
    var imageRow = document.getElementById('image-row');
    var nextBtn = document.getElementById('next-btn');

    if (qualtricsContext) {
        qualtricsContext.hideNextButton();
    }
    document.body.style.backgroundColor = '#000';

    /* ==========================================================
       IMAGE BUILDER (flankers)
       ========================================================== */
    function buildImage(url) {
        if (!url || url === 'MISSING') {
            var blank = document.createElement('div');
            blank.className = 'trial-img-blank';
            return blank;
        }
        var img = document.createElement('img');
        img.src = url;
        img.className = 'trial-img flanker';
        return img;
    }

    /* ==========================================================
       LOTTERY WIDGET BUILDER
        ----------------------------------------------------------
        Builds the center decision widget:
          Left panel:  Fixed $500 (icon + label)
          OR divider
          Right panel: Lottery (top-icon, probability rect, bottom-icon)

        Gain is always displayed on top; its color is color_gain (red or blue).
        The opposite color is always the bottom (loss / $0) outcome.
        - Risk:      top segment = level%, bottom segment = (100-level)%.
        - Ambiguity: grey bar occludes the middle; visible areas are equal.

        Click handling uses event delegation on the widget container.
        ========================================================== */
    function buildLotteryWidget(lottery, fixedOnLeft) {
        var widget = document.createElement('div');
        widget.className = 'lottery-widget';

        /* --- Fixed option (left) --- */
        var fixedOpt = document.createElement('div');
        fixedOpt.className = 'lottery-option lottery-fixed';
        fixedOpt.dataset.choice = 'fixed';

        var fixedLabel = document.createElement('div');
        fixedLabel.className = 'lottery-amount-label';
        fixedLabel.textContent = '$' + fixedAmount;
        fixedOpt.appendChild(fixedLabel);

        /* --- OR divider --- */
        var orDiv = document.createElement('div');
        orDiv.className = 'lottery-or-divider';

        /* --- Lottery / gamble option (right) --- */
        var gambleOpt = document.createElement('div');
        gambleOpt.className = 'lottery-option lottery-gamble';
        gambleOpt.dataset.choice = 'lottery';

        // Gain is always on top; colorGain (derived from group) sets the top segment's color
        var topAmount = lottery.amount;   // gain always on top
        var bottomAmount = 0;             // loss ($0) always on bottom
        var topColor = colorGain;                               // 'red' or 'blue'
        var bottomColor = colorGain === 'red' ? 'blue' : 'red';

        // Top outcome row
        var topRow = document.createElement('div');
        topRow.className = 'lottery-outcome-column';
        var topLabel = document.createElement('span');
        topLabel.className = 'lottery-amount-label small';
        topLabel.textContent = topAmount > 0 ? '$' + topAmount : '$0';
        topRow.appendChild(topLabel);
        gambleOpt.appendChild(topRow);

        // Probability rectangle
        var rect = document.createElement('div');
        rect.className = 'lottery-rect';

        if (lottery.type === 'risk' || lottery.type === 'control') {
            // Risky: top segment = gain color at level%, bottom = loss color at (100-level)%
            var topPct = lottery.level;
            var bottomPct = 100 - lottery.level;

            var topSeg = document.createElement('div');
            topSeg.className = 'lottery-segment segment-' + topColor;
            topSeg.style.height = topPct + '%';
            rect.appendChild(topSeg);

            var botSeg = document.createElement('div');
            botSeg.className = 'lottery-segment segment-' + bottomColor;
            botSeg.style.height = bottomPct + '%';
            rect.appendChild(botSeg);

        } else {
            // Ambiguous: grey bar occludes the middle; top = gain color, bottom = loss color
            var visEach = (100 - lottery.level) / 2;

            if (visEach > 0) {
                var tSeg = document.createElement('div');
                tSeg.className = 'lottery-segment segment-' + topColor;
                tSeg.style.height = visEach + '%';
                rect.appendChild(tSeg);
            }

            var greySeg = document.createElement('div');
            greySeg.className = 'lottery-segment segment-grey';
            greySeg.style.height = lottery.level + '%';
            rect.appendChild(greySeg);

            if (visEach > 0) {
                var bSeg = document.createElement('div');
                bSeg.className = 'lottery-segment segment-' + bottomColor;
                bSeg.style.height = visEach + '%';
                rect.appendChild(bSeg);
            }
        }

        gambleOpt.appendChild(rect);

        // Bottom outcome row
        var botRow = document.createElement('div');
        botRow.className = 'lottery-outcome-column flex-reverse';
        var botLabel = document.createElement('span');
        botLabel.className = 'lottery-amount-label small';
        botLabel.textContent = bottomAmount > 0 ? '-$' + bottomAmount : '$0';
        botRow.appendChild(botLabel);
        gambleOpt.appendChild(botRow);

        /* --- Assemble widget (order depends on counterbalancing) --- */
        if (fixedOnLeft) {
            widget.appendChild(fixedOpt);
            widget.appendChild(orDiv);
            widget.appendChild(gambleOpt);
        } else {
            widget.appendChild(gambleOpt);
            widget.appendChild(orDiv);
            widget.appendChild(fixedOpt);
        }

        /* --- Click handler (delegated) --- */
        widget.addEventListener('click', function (e) {
            if (!widget.classList.contains('interactive')) return;

            // Walk up from click target to find .lottery-option
            var target = e.target;
            while (target && target !== widget) {
                if (target.classList.contains('lottery-option')) {
                    // Deselect all options
                    var opts = widget.querySelectorAll('.lottery-option');
                    for (var i = 0; i < opts.length; i++) {
                        opts[i].classList.remove('selected');
                    }
                    // Select the clicked option
                    target.classList.add('selected');
                    selectedChoice = target.dataset.choice;

                    // Automatically advance to the next trial after 500ms
                    setTimeout(function () {
                        var rt = Date.now() - choiceStartTime;
                        var t = orderedTrials[currentTrial];

                        if (qualtricsContext) {
                            Qualtrics.SurveyEngine.setJSEmbeddedData(
                                'choice_t' + t.trial_num, selectedChoice);
                            Qualtrics.SurveyEngine.setJSEmbeddedData(
                                'rt_t' + t.trial_num, rt);
                            Qualtrics.SurveyEngine.setJSEmbeddedData(
                                'fixed_side_t' + t.trial_num,
                                fixedOnLeftAssignment[currentTrial] ? 'left' : 'right');
                        } else {
                            console.log(
                                'Trial ' + t.trial_num +
                                '  choice=' + selectedChoice +
                                '  rt=' + rt + 'ms' +
                                '  fixed_side=' + (fixedOnLeftAssignment[currentTrial] ? 'left' : 'right') +
                                '  [' + t.lottery.type + ' ' + t.lottery.level +
                                '% $' + t.lottery.amount + ']'
                            );
                        }

                        currentTrial++;
                        runTrial();
                    }, autoAdvanceDelayMs);
                    return;
                }
                target = target.parentElement;
            }
        });

        return widget;
    }

    /* ==========================================================
       TRIAL RUNNER
       ========================================================== */
    var currentTrial = 0;
    var choiceStartTime = 0;
    var selectedChoice = null;
    var phase1Timer, phase2Timer, phase3Timer;

    function runTrial() {
        if (currentTrial >= orderedTrials.length) {
            /* All trials done — clean up and advance */
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

        /* --- Reset --- */
        if (phase3Timer) {
            clearTimeout(phase3Timer);
        }
        fixation.style.display = 'flex';
        imageRow.style.display = 'none';
        imageRow.innerHTML = '';
        nextBtn.style.display = 'none';
        selectedChoice = null;

        /* --- Build flanker images --- */
        var leftFlanker = buildImage(IMG[t.f1]);
        var rightFlanker = buildImage(IMG[t.f2]);

        /* --- Build lottery widget (hidden initially) --- */
        var fixedOnLeft = fixedOnLeftAssignment[currentTrial];
        var lotteryWidget = buildLotteryWidget(t.lottery, fixedOnLeft);
        lotteryWidget.style.visibility = 'hidden';

        imageRow.appendChild(leftFlanker);
        imageRow.appendChild(lotteryWidget);
        imageRow.appendChild(rightFlanker);

        /* Phase 1: fixation */
        phase1Timer = setTimeout(function () {
            fixation.style.display = 'none';
            imageRow.style.display = 'flex'; // flankers visible, lottery hidden

            /* Phase 2: flankers only — lottery still hidden */
            phase2Timer = setTimeout(function () {
                /* Reveal lottery (non-interactive) */
                lotteryWidget.style.visibility = 'visible';

                /* Phase 3: lottery visible but NOT interactive */
                phase3Timer = setTimeout(function () {
                    /* Enable lottery interaction; flankers stay visible */
                    lotteryWidget.classList.add('interactive');
                    choiceStartTime = Date.now();
                }, displayNonInteractiveMs);
            }, flankerOnlyMs);
        }, fixationMs);
    }

    /* ==========================================================
       BLOCK ACCIDENTAL KEYBOARD ADVANCES
       ========================================================== */
    document.addEventListener('keydown', function (e) {
        if (e.which === 13 || e.which === 32) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    /* ==========================================================
       START
       ========================================================== */
    // Loading screen is visible by default (CSS). After promises resolve,
    // hide it and let runTrial() show the fixation cross.
    var loadingScreen = document.getElementById('loading-screen');

    // Warning checks for missing promises
    if (!window.EXPERIMENT_IMAGE_PRELOAD_SETUP_PROMISE) {
        console.warn('[trial.js] window.EXPERIMENT_IMAGE_PRELOAD_SETUP_PROMISE is missing.');
    }

    var preload = window.EXPERIMENT_IMAGE_PRELOAD;
    if (!preload) {
        console.warn('[trial.js] window.EXPERIMENT_IMAGE_PRELOAD is missing.');
    } else {
        if (window.isPractice) {
            if (!preload.practice || !preload.practice.promise) {
                console.warn('[trial.js] window.EXPERIMENT_IMAGE_PRELOAD.practice.promise is missing.');
            }
        } else {
            if (!preload.trials || !preload.trials.promise) {
                console.warn('[trial.js] window.EXPERIMENT_IMAGE_PRELOAD.trials.promise is missing.');
            }
        }
    }

    if (window.EXPERIMENT_IMAGE_PRELOAD_SETUP_PROMISE) {
        await window.EXPERIMENT_IMAGE_PRELOAD_SETUP_PROMISE;
    }

    if (window.isPractice) {
        if (preload && preload.practice && preload.practice.promise) {
            await preload.practice.promise;
        }
    } else {
        if (preload && preload.trials && preload.trials.promise) {
            await preload.trials.promise;
        }
    }

    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }

    // runTrial() will automatically show the fixation cross.
    runTrial();
}


/* ==========================================================
   BOOTSTRAP
   ========================================================== */
if (typeof Qualtrics === 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        initTrial(null);
    });
}
