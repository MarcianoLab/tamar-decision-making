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
    /* Group assignment (1-4 between-subjects)
       1 = Blue colorGain, risk first
       2 = Blue colorGain, ambiguity first
       3 = Red  colorGain, risk first
       4 = Red  colorGain, ambiguity first */
    var group;
    if (qualtricsContext) {
        group = "${e://Field/group}";
    } else {
        group = '1';
    }
    var groupNum = parseInt(group, 10);

    var colorGain = (groupNum <= 2) ? 'blue' : 'red';
    var riskFirst = (groupNum === 1 || groupNum === 3);

    console.log(colorGain)
    console.log(riskFirst)

    /* ==========================================================
       LOAD CONFIG
       ========================================================== */
    if (!window.TRIAL_CONFIG) {
        throw new Error('[trial.js] window.TRIAL_CONFIG not defined. Load trial-config.js before trial.js.');
    }

    var fixationMs = window.TRIAL_CONFIG.fixationMs;
    var flankerOnlyMs = window.TRIAL_CONFIG.flankerOnlyMs;
    var displayNonInteractiveMs = window.TRIAL_CONFIG.displayNonInteractiveMs;
    var autoAdvanceDelayMs = window.TRIAL_CONFIG.autoAdvanceDelayMs;
    var fixedAmount = window.TRIAL_CONFIG.fixedAmount;
    var trials = window.TRIAL_CONFIG.trials;
    var SET_PRACTICE_TRIALS = window.TRIAL_CONFIG.practiceTrials;

    if (fixationMs === undefined || flankerOnlyMs === undefined || displayNonInteractiveMs === undefined ||
        autoAdvanceDelayMs === undefined || fixedAmount === undefined || trials === undefined || SET_PRACTICE_TRIALS === undefined) {
        throw new Error('[trial.js] One or more required configuration parameters are undefined in TRIAL_CONFIG.');
    }

    /* ==========================================================
       IMAGE QUEUE SETUP
       ----------------------------------------------------------
       Shuffle the keys of each image list into arrays.
       During trial execution, images are popped from the
       appropriate queue so each image appears exactly once.
       ========================================================== */

    // Fisher-Yates shuffle (in-place)
    function shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
        return arr;
    }

    // Build shuffled key arrays from image maps
    var negImageQueue = shuffleArray(Object.keys(window.TRIAL_CONFIG.negative_images || {}));
    var neuImageQueue = shuffleArray(Object.keys(window.TRIAL_CONFIG.neutral_images || {}));
    var ctrlNegImageQueue = shuffleArray(Object.keys(window.TRIAL_CONFIG.control_negative_images || {}));
    var ctrlNeuImageQueue = shuffleArray(Object.keys(window.TRIAL_CONFIG.control_neutral_images || {}));
    var practiceImageQueue = shuffleArray(Object.keys(window.TRIAL_CONFIG.practice_images || {}));

    // Lookup helpers — resolve filename → URL from the correct image map
    function getNegImageUrl(filename) {
        return (window.TRIAL_CONFIG.negative_images || {})[filename] || null;
    }
    function getNeuImageUrl(filename) {
        return (window.TRIAL_CONFIG.neutral_images || {})[filename] || null;
    }
    function getCtrlNegImageUrl(filename) {
        return (window.TRIAL_CONFIG.control_negative_images || {})[filename] || null;
    }
    function getCtrlNeuImageUrl(filename) {
        return (window.TRIAL_CONFIG.control_neutral_images || {})[filename] || null;
    }
    function getPracticeImageUrl(filename) {
        return (window.TRIAL_CONFIG.practice_images || {})[filename] || null;
    }

    /* ==========================================================
       GORILLA RANDOMIZATION
       No more than 2 consecutive same picture_valence.
       ========================================================== */
    function randomizeTrials(spreadsheet) {
        var result = [];
        var arr = [];
        var len = spreadsheet.length;
        var failures = 0;
        var i, j, rand, pv;

        for (j = 0; j < len; j++) arr.push(j);

        while (result.length < len) {
            if (failures > 50) {
                // Dead end reached (e.g. only one valence left), restart sequence
                arr = [];
                for (j = 0; j < len; j++) arr.push(j);
                result = [];
                failures = 0;
                continue;
            }

            rand = arr[Math.floor(Math.random() * arr.length)];
            pv = spreadsheet[rand].picture_valence;

            if (result.length < 2) {
                result.push(spreadsheet[rand]);
                for (i = 0; i < arr.length; i++) {
                    if (arr[i] === rand) { arr.splice(i, 1); break; }
                }
                failures = 0;
                continue;
            }

            if (pv === result[result.length - 1].picture_valence &&
                pv === result[result.length - 2].picture_valence) {
                failures += 1;
                continue;
            }

            result.push(spreadsheet[rand]);
            for (i = 0; i < arr.length; i++) {
                if (arr[i] === rand) { arr.splice(i, 1); break; }
            }
            failures = 0;
        }
        return result;
    }

    /* ==========================================================
       BLOCK CONSTRUCTION
       ----------------------------------------------------------
       Split trials into risk and ambiguity blocks (by lottery.type).
       Each block is randomized independently.
       Block order is determined by the group variable (riskFirst).
       Practice trials are not split into blocks.
       ========================================================== */
    var orderedTrials;
    var block1Length = 0; // index where block 2 starts (used for break)

    if (window.isPractice) {
        orderedTrials = randomizeTrials(SET_PRACTICE_TRIALS);
    } else {
        var riskTrials = [];
        var ambiguityTrials = [];
        for (var s = 0; s < trials.length; s++) {
            if (trials[s].lottery.type === 'risk') {
                riskTrials.push(trials[s]);
            } else {
                ambiguityTrials.push(trials[s]);
            }
        }

        var block1Trials, block2Trials;
        if (riskFirst) {
            block1Trials = randomizeTrials(riskTrials);
            block2Trials = randomizeTrials(ambiguityTrials);
        } else {
            block1Trials = randomizeTrials(ambiguityTrials);
            block2Trials = randomizeTrials(riskTrials);
        }

        block1Length = block1Trials.length;
        orderedTrials = block1Trials.concat(block2Trials);
    }

    if (window.isTest) {
        orderedTrials = orderedTrials.slice(0, 10);
    }


    /* Pick a random non-control trial as the payment trial (not for practice) */
    var paymentTrialIndex = -1;
    if (!window.isPractice) {
        var nonControlIndices = [];
        for (var i = 0; i < orderedTrials.length; i++) {
            if (!orderedTrials[i].is_control) {
                nonControlIndices.push(i);
            }
        }
        if (nonControlIndices.length > 0) {
            paymentTrialIndex = nonControlIndices[Math.floor(Math.random() * nonControlIndices.length)];
        }
    }

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

    /* ==========================================================
       ASSIGN IMAGES TO TRIALS
       ----------------------------------------------------------
       Pop from the shuffled queues so each image is used once.
       Store the assigned filename + URL on each trial object.
       ========================================================== */
    for (var ti = 0; ti < orderedTrials.length; ti++) {
        var t = orderedTrials[ti];
        var imgFile, imgUrl;

        if (window.isPractice) {
            imgFile = practiceImageQueue.length > 0 ? practiceImageQueue.pop() : null;
            imgUrl = imgFile ? getPracticeImageUrl(imgFile) : null;
        } else if (t.is_control && t.picture_valence === 'neg') {
            imgFile = ctrlNegImageQueue.length > 0 ? ctrlNegImageQueue.pop() : null;
            imgUrl = imgFile ? getCtrlNegImageUrl(imgFile) : null;
        } else if (t.is_control && t.picture_valence === 'neu') {
            imgFile = ctrlNeuImageQueue.length > 0 ? ctrlNeuImageQueue.pop() : null;
            imgUrl = imgFile ? getCtrlNeuImageUrl(imgFile) : null;
        } else if (t.picture_valence === 'neg') {
            imgFile = negImageQueue.length > 0 ? negImageQueue.pop() : null;
            imgUrl = imgFile ? getNegImageUrl(imgFile) : null;
        } else {
            imgFile = neuImageQueue.length > 0 ? neuImageQueue.pop() : null;
            imgUrl = imgFile ? getNeuImageUrl(imgFile) : null;
        }

        t._assigned_image_file = imgFile || 'NONE';
        t._assigned_image_url = (imgUrl && imgUrl !== 'MISSING') ? imgUrl : null;
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
                    // Prevent any further clicks from scheduling another advance
                    widget.classList.remove('interactive');

                    // Deselect all options
                    var opts = widget.querySelectorAll('.lottery-option');
                    for (var i = 0; i < opts.length; i++) {
                        opts[i].classList.remove('selected');
                    }
                    // Select the clicked option
                    target.classList.add('selected');
                    selectedChoice = target.dataset.choice;

                    // Automatically advance to the next trial after autoAdvanceDelayMs
                    setTimeout(function () {
                        var rt = Date.now() - choiceStartTime;
                        var t = orderedTrials[currentTrial];
                        var trialNum = currentTrial + 1; // 1-based presentation order

                        var decisionCoded = (selectedChoice === 'lottery') ? 1 : 0;
                        var prefix = t.is_control ? 'C' : (t.lottery.type === 'risk' ? 'G' : 'A');
                        var dynamicGambleId = prefix + t.lottery.amount + '-' + t.lottery.level;

                        if (currentTrial === paymentTrialIndex) {
                            paymentTrialChoice = selectedChoice;
                        }

                        var blockNum = (!window.isPractice && currentTrial >= block1Length) ? 2 : 1;
                        var blockType = '';
                        if (!window.isPractice) {
                            if (blockNum === 1) {
                                blockType = riskFirst ? 'risk' : 'ambiguity';
                            } else {
                                blockType = riskFirst ? 'ambiguity' : 'risk';
                            }
                        }

                        var trialData = {
                            trial_num: trialNum,
                            group: groupNum,
                            block_number: blockNum,
                            block_type: blockType,
                            picture_valence: t.picture_valence,
                            gamble_id: dynamicGambleId,
                            is_control: t.is_control,
                            is_payment_trial: (currentTrial === paymentTrialIndex) ? 1 : 0,
                            picture_name: t._assigned_image_file,
                            trial_type: t.lottery.type,
                            level_percent: t.lottery.level,
                            prize_amount: t.lottery.amount,
                            top_color: colorGain,
                            lottery_side: fixedOnLeftAssignment[currentTrial] ? 'left' : 'right',
                            decision_coded: decisionCoded,
                            rt_ms: rt,
                            trial_timestamp: trialStartTimestamp
                        };

                        if (qualtricsContext) {
                            Qualtrics.SurveyEngine.setJSEmbeddedData('t' + trialNum, JSON.stringify(trialData));
                        } else {
                            console.log('t' + trialNum, trialData);
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
    var trialStartTimestamp = 0;
    var selectedChoice = null;
    var paymentTrialChoice = null;
    var phase1Timer, phase2Timer, phase3Timer;
    var breakShown = false;

    function showBreakScreen(completedBlockType, nextBlockType) {
        if (phase3Timer) clearTimeout(phase3Timer);
        fixation.style.display = 'none';
        imageRow.style.display = 'none';
        nextBtn.style.display = 'none';

        var breakContainer = document.createElement('div');
        breakContainer.id = 'break-screen';
        breakContainer.style.color = 'white';
        breakContainer.style.textAlign = 'center';
        breakContainer.style.fontSize = '24px';
        breakContainer.style.marginTop = '150px';
        breakContainer.style.fontFamily = 'Arial, sans-serif';

        var msg1 = document.createElement('div');
        msg1.style.marginBottom = '20px';
        msg1.style.fontWeight = 'bold';

        var msg2 = document.createElement('div');
        msg2.style.marginBottom = '40px';

        if (completedBlockType) {
            var completedLabel = completedBlockType.charAt(0).toUpperCase() + completedBlockType.slice(1);
            var nextLabel = nextBlockType ? (nextBlockType.charAt(0).toUpperCase() + nextBlockType.slice(1)) : '';
            msg1.innerText = 'You have completed the ' + completedLabel + ' block. Break time!';
            msg2.innerText = nextLabel
                ? 'The next block is the ' + nextLabel + ' block. When you are ready to continue, please press the continue button.'
                : 'When you are ready to continue, please press the continue button.';
        } else {
            msg1.innerText = 'Break time!';
            msg2.innerText = 'When you are ready to continue, please press the continue button.';
        }

        var btn = document.createElement('button');
        btn.innerHTML = 'Continue &nbsp;&nbsp;&gt;';
        btn.style.backgroundColor = '#2c7bc0';
        btn.style.color = '#ffffff';
        btn.style.border = '2px solid #000000';
        btn.style.borderRadius = '6px';
        btn.style.padding = '15px 40px';
        btn.style.fontSize = '22px';
        btn.style.cursor = 'pointer';
        btn.style.outline = 'none';
        btn.style.boxShadow = 'inset 0 0 0 1px #64a6df';
        btn.style.transition = 'background-color 0.2s';

        btn.onmouseover = function () { btn.style.backgroundColor = '#22639a'; };
        btn.onmouseout = function () { btn.style.backgroundColor = '#2c7bc0'; };

        btn.onclick = function () {
            breakShown = true;
            breakContainer.remove();
            runTrial();
        };

        breakContainer.appendChild(msg1);
        breakContainer.appendChild(msg2);
        breakContainer.appendChild(btn);

        overlay.appendChild(breakContainer);
    }

    function runTrial() {
        if (!window.isPractice && block1Length > 0 && currentTrial === block1Length && !breakShown) {
            var completedType = riskFirst ? 'risk' : 'ambiguity';
            var nextType = riskFirst ? 'ambiguity' : 'risk';
            showBreakScreen(completedType, nextType);
            return;
        }

        if (currentTrial >= orderedTrials.length) {
            /* All trials done — clean up and advance */
            if (overlay) overlay.remove();
            var bgStyle = document.getElementById('trial-bg');
            if (bgStyle) bgStyle.remove();
            document.body.style.backgroundColor = '';

            /* --- RUN PAYMENT LOTTERY --- */
            if (!window.isPractice && paymentTrialIndex !== -1 && paymentTrialChoice) {
                var pTrial = orderedTrials[paymentTrialIndex];
                var winAmount = 0;

                if (paymentTrialChoice === 'fixed') {
                    winAmount = fixedAmount;
                } else {
                    var chance = 0;
                    if (pTrial.lottery.type === 'risk') {
                        chance = pTrial.lottery.level;
                    } else if (pTrial.lottery.type === 'ambiguity') {
                        var minChance = (100 - pTrial.lottery.level) / 2;
                        var maxChance = minChance + pTrial.lottery.level;
                        chance = minChance + Math.random() * (maxChance - minChance);
                    }

                    if (Math.random() * 100 <= chance) {
                        winAmount = pTrial.lottery.amount;
                    } else {
                        winAmount = 0;
                    }
                }

                if (qualtricsContext) {
                    Qualtrics.SurveyEngine.setJSEmbeddedData('win_amount', winAmount);
                } else {
                    console.log('--- EXPERIMENT OVER ---');
                    console.log('Payment Trial: #' + (paymentTrialIndex + 1) + ' (' + pTrial.lottery.type + ')');
                    console.log('Choice: ' + paymentTrialChoice);
                    console.log('Lottery Chance to hit: ' + chance + '%');
                    console.log('win_amount = ' + winAmount);
                }
            }

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
        trialStartTimestamp = Date.now();
        fixation.style.display = 'flex';
        imageRow.style.display = 'none';
        imageRow.innerHTML = '';
        nextBtn.style.display = 'none';
        selectedChoice = null;

        /* --- Build flanker images (both sides show the same image) --- */
        var leftFlanker = buildImage(t._assigned_image_url);
        var rightFlanker = buildImage(t._assigned_image_url);

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
