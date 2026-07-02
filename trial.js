/* ============================================================
   TRIAL ENGINE — Flanker images + Monetary lottery decision
   ----------------------------------------------------------
   Each trial shows:
     Phase 1  Fixation cross (1 000 ms)
     Phase 2  Left flanker | Lottery widget | Right flanker
              (3 000 ms — visible but NOT interactive)
     Phase 3  Flankers hidden, lottery becomes clickable.
              Participant chooses Fixed $500 or the Lottery,
              then clicks "next" to advance.

   Data saved per trial (Qualtrics embedded data):
     choice_t{N}  — "fixed" or "lottery"
     rt_t{N}      — ms from lottery becoming interactive to
                     "next" button click

   Expects trial-config.js and trial.html loaded first.
   ============================================================ */

function initTrial(qualtricsContext) {

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

    /* ==========================================================
       LOAD CONFIG
       ========================================================== */
    if (!window.TRIAL_CONFIG) {
        console.error('[trial.js] window.TRIAL_CONFIG not defined. ' +
            'Load trial-config.js before trial.js.');
        return;
    }

    var IMG = window.TRIAL_CONFIG.images;
    var SET1 = window.TRIAL_CONFIG.trials;
    var SET_PRACTICE_TRIALS = window.TRIAL_CONFIG.practiceTrials;
    var moneyIcons = window.TRIAL_CONFIG.moneyIcons;

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
    var overlay  = document.getElementById('trial-overlay');
    var fixation = document.getElementById('fixation');
    var imageRow = document.getElementById('image-row');
    var nextBtn  = document.getElementById('next-btn');

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

       Red is always the top color, blue the bottom.
       - Risk:      red% and blue% are computed from level + color_gain.
       - Ambiguity: grey bar occludes the middle; visible areas are equal.

       Click handling uses event delegation on the widget container.
       ========================================================== */
    function buildLotteryWidget(lottery) {
        var widget = document.createElement('div');
        widget.className = 'lottery-widget';

        /* --- Fixed option (left) --- */
        var fixedOpt = document.createElement('div');
        fixedOpt.className = 'lottery-option lottery-fixed';
        fixedOpt.dataset.choice = 'fixed';

        var fixedIcon = document.createElement('img');
        fixedIcon.src = moneyIcons[500];
        fixedIcon.className = 'lottery-money-icon';
        fixedOpt.appendChild(fixedIcon);

        var fixedLabel = document.createElement('div');
        fixedLabel.className = 'lottery-amount-label';
        fixedLabel.textContent = '$500';
        fixedOpt.appendChild(fixedLabel);

        /* --- OR divider --- */
        var orDiv = document.createElement('div');
        orDiv.className = 'lottery-or-divider';
        orDiv.textContent = 'OR';

        /* --- Lottery / gamble option (right) --- */
        var gambleOpt = document.createElement('div');
        gambleOpt.className = 'lottery-option lottery-gamble';
        gambleOpt.dataset.choice = 'lottery';

        // Determine which amount goes with which color
        var topAmount, bottomAmount;
        if (lottery.color_gain === 'red') {
            topAmount  = lottery.amount;   // red = gain
            bottomAmount = 0;              // blue = $0
        } else {
            topAmount  = 0;                // red = $0
            bottomAmount = lottery.amount; // blue = gain
        }

        // Top outcome row
        var topRow = document.createElement('div');
        topRow.className = 'lottery-outcome-row';
        var topIcon = document.createElement('img');
        topIcon.src = moneyIcons[topAmount];
        topIcon.className = 'lottery-money-icon small';
        var topLabel = document.createElement('span');
        topLabel.className = 'lottery-amount-label small';
        topLabel.textContent = '$' + topAmount;
        topRow.appendChild(topIcon);
        topRow.appendChild(topLabel);
        gambleOpt.appendChild(topRow);

        // Probability rectangle
        var rect = document.createElement('div');
        rect.className = 'lottery-rect';

        if (lottery.type === 'risk') {
            // Risky: known probability split
            var redPct, bluePct;
            if (lottery.color_gain === 'red') {
                redPct  = lottery.level;
                bluePct = 100 - lottery.level;
            } else {
                redPct  = 100 - lottery.level;
                bluePct = lottery.level;
            }

            var redSeg = document.createElement('div');
            redSeg.className = 'lottery-segment segment-red';
            redSeg.style.height = redPct + '%';
            if (redPct > 0) {
                var rl = document.createElement('span');
                rl.className = 'lottery-pct';
                rl.textContent = redPct;
                redSeg.appendChild(rl);
            }
            rect.appendChild(redSeg);

            var blueSeg = document.createElement('div');
            blueSeg.className = 'lottery-segment segment-blue';
            blueSeg.style.height = bluePct + '%';
            if (bluePct > 0) {
                var bl = document.createElement('span');
                bl.className = 'lottery-pct';
                bl.textContent = bluePct;
                blueSeg.appendChild(bl);
            }
            rect.appendChild(blueSeg);

        } else {
            // Ambiguous: grey bar occludes the middle
            var visEach = (100 - lottery.level) / 2;

            if (visEach > 0) {
                var rSeg = document.createElement('div');
                rSeg.className = 'lottery-segment segment-red';
                rSeg.style.height = visEach + '%';
                var rLbl = document.createElement('span');
                rLbl.className = 'lottery-pct';
                rLbl.textContent = Math.round(visEach);
                rSeg.appendChild(rLbl);
                rect.appendChild(rSeg);
            }

            var greySeg = document.createElement('div');
            greySeg.className = 'lottery-segment segment-grey';
            greySeg.style.height = lottery.level + '%';
            rect.appendChild(greySeg);

            if (visEach > 0) {
                var bSeg = document.createElement('div');
                bSeg.className = 'lottery-segment segment-blue';
                bSeg.style.height = visEach + '%';
                var bLbl = document.createElement('span');
                bLbl.className = 'lottery-pct';
                bLbl.textContent = Math.round(visEach);
                bSeg.appendChild(bLbl);
                rect.appendChild(bSeg);
            }
        }

        gambleOpt.appendChild(rect);

        // Bottom outcome row
        var botRow = document.createElement('div');
        botRow.className = 'lottery-outcome-row';
        var botIcon = document.createElement('img');
        botIcon.src = moneyIcons[bottomAmount];
        botIcon.className = 'lottery-money-icon small';
        var botLabel = document.createElement('span');
        botLabel.className = 'lottery-amount-label small';
        botLabel.textContent = '$' + bottomAmount;
        botRow.appendChild(botIcon);
        botRow.appendChild(botLabel);
        gambleOpt.appendChild(botRow);

        /* --- Assemble widget --- */
        widget.appendChild(fixedOpt);
        widget.appendChild(orDiv);
        widget.appendChild(gambleOpt);

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
                    nextBtn.style.display = 'block';
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
    var currentTrial    = 0;
    var choiceStartTime = 0;
    var selectedChoice  = null;
    var phase1Timer, phase2Timer;

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
        fixation.style.display  = 'flex';
        imageRow.style.display  = 'none';
        imageRow.innerHTML      = '';
        nextBtn.style.display   = 'none';
        selectedChoice          = null;

        /* --- Build flanker images --- */
        var leftFlanker  = buildImage(IMG[t.f1]);
        var rightFlanker = buildImage(IMG[t.f2]);

        /* --- Build lottery widget --- */
        var lotteryWidget = buildLotteryWidget(t.lottery);

        imageRow.appendChild(leftFlanker);
        imageRow.appendChild(lotteryWidget);
        imageRow.appendChild(rightFlanker);

        /* Phase 1: fixation (1 000 ms) */
        phase1Timer = setTimeout(function () {
            fixation.style.display = 'none';
            imageRow.style.display = 'flex';

            /* Phase 2: display (3 000 ms) — visible, NOT interactive */
            phase2Timer = setTimeout(function () {
                /* Hide flankers (keep layout space) */
                leftFlanker.style.visibility  = 'hidden';
                rightFlanker.style.visibility = 'hidden';

                /* Enable lottery interaction */
                lotteryWidget.classList.add('interactive');
                choiceStartTime = Date.now();
            }, 3000);
        }, 1000);
    }

    /* ==========================================================
       RESPONSE HANDLER
       ========================================================== */
    nextBtn.addEventListener('click', function () {
        if (!selectedChoice) return;

        var rt = Date.now() - choiceStartTime;
        var t  = orderedTrials[currentTrial];

        if (qualtricsContext) {
            Qualtrics.SurveyEngine.setJSEmbeddedData(
                'choice_t' + t.trial_num, selectedChoice);
            Qualtrics.SurveyEngine.setJSEmbeddedData(
                'rt_t' + t.trial_num, rt);
        } else {
            console.log(
                'Trial ' + t.trial_num +
                '  choice=' + selectedChoice +
                '  rt=' + rt + 'ms' +
                '  [' + t.lottery.type + ' ' + t.lottery.level +
                '% $' + t.lottery.amount +
                ' ' + t.lottery.color_gain + ']'
            );
        }

        currentTrial++;
        runTrial();
    });

    /* ==========================================================
       BLOCK ACCIDENTAL KEYBOARD ADVANCES
       ========================================================== */
    document.addEventListener('keydown', function (e) {
        if (e.which === 13 || e.which === 32) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    /* Start */
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
