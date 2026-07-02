/* ============================================================
   TRIAL CONFIGURATION
   ----------------------------------------------------------
   Edit this file to change image URLs, money icons, or trials.
   Load BEFORE trial.js.

   Each trial has:
     trial_num  – unique trial ID
     f1, f2     – left/right flanker filenames (key into `images`)
     ft         – flanker type: "neu" | "neg" | "none"
     lottery    – the monetary decision task:
       type       – "risk" or "ambiguity"
       level      – risk: 25/50/75 (% chance of winning)
                    ambiguity: 24/50/74/100 (% of bar occluded)
       amount     – lottery gain: 500, 800, 1200, or 2500
       color_gain – which color represents the gain: "red" or "blue"
   ============================================================ */

window.TRIAL_CONFIG = {

    /* ==========================================================
       MONEY ICON PATHS (resolved dynamically relative to this script)
       ========================================================== */
    moneyIcons: (function() {
        var basePath = "";
        if (document.currentScript && document.currentScript.src) {
            basePath = document.currentScript.src;
        } else {
            var scripts = document.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src && scripts[i].src.indexOf('trial-config.js') !== -1) {
                    basePath = scripts[i].src;
                    break;
                }
            }
        }
        
        var dirPath = "";
        if (basePath) {
            dirPath = basePath.substring(0, basePath.lastIndexOf('/') + 1);
        }
        
        return {
            0:    dirPath + "graphics/0.jpg",
            500:  dirPath + "graphics/500.jpg",
            800:  dirPath + "graphics/800.jpg",
            1200: dirPath + "graphics/1200.jpg",
            2500: dirPath + "graphics/2500.jpg"
        };
    })(),

    /* ==========================================================
       FLANKER IMAGE URL LOOKUP
       ========================================================== */
    images: {
        "None.jpg":        "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_4u30N2tqJoyGQHo",
        "2394_neut.JPG":   "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_5lxgbEa3yaEPMIs",
        "2359_neut.jpg":   "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_IlAF9vg4iD1pTPW",
        "4605_neut.JPG":   "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_Iu4ReFTKEAjN8zh",
        "2305_neut.jpg":   "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_5ULiEyToDlcDKJP",
        "2026_neut.jpg":   "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_7UiEXEozpIXJlON",
        "7493_neut.JPG":   "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_qREp8l9C9zQwX3S",
        "2273_neut.jpg":   "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_t3fLwedy3hFjegH",
        "2749_neut.JPG":   "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_URFHRBm9Ln640as",
        "2700_neg.JPG":    "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_uBcToCowu1VT2iL",
        "2276_neg.JPG":    "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_chGjHXVvAwWrCN2",
        "6831_neg.bmp":    "MISSING",
        "3550_neg.bmp":    "MISSING",
        "6571_neg.JPG":    "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_L0pRWLQA0s4i306",
        "9400_neg.bmp":    "MISSING",
        "9332_neg.jpg":    "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_NVE4R3ecPnMhCPF",
        "9419_neg.jpg":    "https://hebrewuni.qualtrics.com/CP/Graphic.php?IM=IM_cU2Ps8SRJkKqbZe"
    },

    /* ==========================================================
       49 MONETARY TRIALS
       ----------------------------------------------------------
       Trials 1-7:   $500  (7 uncertainty levels × 1 color)
       Trials 8-21:  $800  (7 uncertainty levels × 2 colors)
       Trials 22-35: $1200 (7 uncertainty levels × 2 colors)
       Trials 36-49: $2500 (7 uncertainty levels × 2 colors)

       Flanker types cycle: none → neu → neg → none → …
       SET 2 is derived in trial.js by adding 49 to trial_num.
       ========================================================== */
    trials: [
        /* --- $500 control trials (1 per uncertainty level) --- */
        { trial_num: 1,  f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "risk",      level: 25,  amount: 500,  color_gain: "red"  } },
        { trial_num: 2,  f1: "2394_neut.JPG",   f2: "2394_neut.JPG",   ft: "neu",  lottery: { type: "risk",      level: 50,  amount: 500,  color_gain: "red"  } },
        { trial_num: 3,  f1: "2700_neg.JPG",    f2: "2700_neg.JPG",    ft: "neg",  lottery: { type: "risk",      level: 75,  amount: 500,  color_gain: "red"  } },
        { trial_num: 4,  f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "ambiguity", level: 24,  amount: 500,  color_gain: "red"  } },
        { trial_num: 5,  f1: "2359_neut.jpg",   f2: "2359_neut.jpg",   ft: "neu",  lottery: { type: "ambiguity", level: 50,  amount: 500,  color_gain: "red"  } },
        { trial_num: 6,  f1: "2276_neg.JPG",    f2: "2276_neg.JPG",    ft: "neg",  lottery: { type: "ambiguity", level: 74,  amount: 500,  color_gain: "red"  } },
        { trial_num: 7,  f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "ambiguity", level: 100, amount: 500,  color_gain: "red"  } },

        /* --- $800 trials (each uncertainty level × 2 colors) --- */
        { trial_num: 8,  f1: "4605_neut.JPG",   f2: "4605_neut.JPG",   ft: "neu",  lottery: { type: "risk",      level: 25,  amount: 800,  color_gain: "red"  } },
        { trial_num: 9,  f1: "6831_neg.bmp",    f2: "6831_neg.bmp",    ft: "neg",  lottery: { type: "risk",      level: 25,  amount: 800,  color_gain: "blue" } },
        { trial_num: 10, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "risk",      level: 50,  amount: 800,  color_gain: "red"  } },
        { trial_num: 11, f1: "2305_neut.jpg",   f2: "2305_neut.jpg",   ft: "neu",  lottery: { type: "risk",      level: 50,  amount: 800,  color_gain: "blue" } },
        { trial_num: 12, f1: "3550_neg.bmp",    f2: "3550_neg.bmp",    ft: "neg",  lottery: { type: "risk",      level: 75,  amount: 800,  color_gain: "red"  } },
        { trial_num: 13, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "risk",      level: 75,  amount: 800,  color_gain: "blue" } },
        { trial_num: 14, f1: "2026_neut.jpg",   f2: "2026_neut.jpg",   ft: "neu",  lottery: { type: "ambiguity", level: 24,  amount: 800,  color_gain: "red"  } },
        { trial_num: 15, f1: "6571_neg.JPG",    f2: "6571_neg.JPG",    ft: "neg",  lottery: { type: "ambiguity", level: 24,  amount: 800,  color_gain: "blue" } },
        { trial_num: 16, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "ambiguity", level: 50,  amount: 800,  color_gain: "red"  } },
        { trial_num: 17, f1: "7493_neut.JPG",   f2: "7493_neut.JPG",   ft: "neu",  lottery: { type: "ambiguity", level: 50,  amount: 800,  color_gain: "blue" } },
        { trial_num: 18, f1: "9400_neg.bmp",    f2: "9400_neg.bmp",    ft: "neg",  lottery: { type: "ambiguity", level: 74,  amount: 800,  color_gain: "red"  } },
        { trial_num: 19, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "ambiguity", level: 74,  amount: 800,  color_gain: "blue" } },
        { trial_num: 20, f1: "2273_neut.jpg",   f2: "2273_neut.jpg",   ft: "neu",  lottery: { type: "ambiguity", level: 100, amount: 800,  color_gain: "red"  } },
        { trial_num: 21, f1: "9332_neg.jpg",    f2: "9332_neg.jpg",    ft: "neg",  lottery: { type: "ambiguity", level: 100, amount: 800,  color_gain: "blue" } },

        /* --- $1200 trials (each uncertainty level × 2 colors) --- */
        { trial_num: 22, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "risk",      level: 25,  amount: 1200, color_gain: "red"  } },
        { trial_num: 23, f1: "2749_neut.JPG",   f2: "2749_neut.JPG",   ft: "neu",  lottery: { type: "risk",      level: 25,  amount: 1200, color_gain: "blue" } },
        { trial_num: 24, f1: "9419_neg.jpg",    f2: "9419_neg.jpg",    ft: "neg",  lottery: { type: "risk",      level: 50,  amount: 1200, color_gain: "red"  } },
        { trial_num: 25, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "risk",      level: 50,  amount: 1200, color_gain: "blue" } },
        { trial_num: 26, f1: "2394_neut.JPG",   f2: "2394_neut.JPG",   ft: "neu",  lottery: { type: "risk",      level: 75,  amount: 1200, color_gain: "red"  } },
        { trial_num: 27, f1: "2700_neg.JPG",    f2: "2700_neg.JPG",    ft: "neg",  lottery: { type: "risk",      level: 75,  amount: 1200, color_gain: "blue" } },
        { trial_num: 28, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "ambiguity", level: 24,  amount: 1200, color_gain: "red"  } },
        { trial_num: 29, f1: "2359_neut.jpg",   f2: "2359_neut.jpg",   ft: "neu",  lottery: { type: "ambiguity", level: 24,  amount: 1200, color_gain: "blue" } },
        { trial_num: 30, f1: "2276_neg.JPG",    f2: "2276_neg.JPG",    ft: "neg",  lottery: { type: "ambiguity", level: 50,  amount: 1200, color_gain: "red"  } },
        { trial_num: 31, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "ambiguity", level: 50,  amount: 1200, color_gain: "blue" } },
        { trial_num: 32, f1: "4605_neut.JPG",   f2: "4605_neut.JPG",   ft: "neu",  lottery: { type: "ambiguity", level: 74,  amount: 1200, color_gain: "red"  } },
        { trial_num: 33, f1: "6831_neg.bmp",    f2: "6831_neg.bmp",    ft: "neg",  lottery: { type: "ambiguity", level: 74,  amount: 1200, color_gain: "blue" } },
        { trial_num: 34, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "ambiguity", level: 100, amount: 1200, color_gain: "red"  } },
        { trial_num: 35, f1: "2305_neut.jpg",   f2: "2305_neut.jpg",   ft: "neu",  lottery: { type: "ambiguity", level: 100, amount: 1200, color_gain: "blue" } },

        /* --- $2500 trials (each uncertainty level × 2 colors) --- */
        { trial_num: 36, f1: "3550_neg.bmp",    f2: "3550_neg.bmp",    ft: "neg",  lottery: { type: "risk",      level: 25,  amount: 2500, color_gain: "red"  } },
        { trial_num: 37, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "risk",      level: 25,  amount: 2500, color_gain: "blue" } },
        { trial_num: 38, f1: "2026_neut.jpg",   f2: "2026_neut.jpg",   ft: "neu",  lottery: { type: "risk",      level: 50,  amount: 2500, color_gain: "red"  } },
        { trial_num: 39, f1: "6571_neg.JPG",    f2: "6571_neg.JPG",    ft: "neg",  lottery: { type: "risk",      level: 50,  amount: 2500, color_gain: "blue" } },
        { trial_num: 40, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "risk",      level: 75,  amount: 2500, color_gain: "red"  } },
        { trial_num: 41, f1: "7493_neut.JPG",   f2: "7493_neut.JPG",   ft: "neu",  lottery: { type: "risk",      level: 75,  amount: 2500, color_gain: "blue" } },
        { trial_num: 42, f1: "9400_neg.bmp",    f2: "9400_neg.bmp",    ft: "neg",  lottery: { type: "ambiguity", level: 24,  amount: 2500, color_gain: "red"  } },
        { trial_num: 43, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "ambiguity", level: 24,  amount: 2500, color_gain: "blue" } },
        { trial_num: 44, f1: "2273_neut.jpg",   f2: "2273_neut.jpg",   ft: "neu",  lottery: { type: "ambiguity", level: 50,  amount: 2500, color_gain: "red"  } },
        { trial_num: 45, f1: "9332_neg.jpg",    f2: "9332_neg.jpg",    ft: "neg",  lottery: { type: "ambiguity", level: 50,  amount: 2500, color_gain: "blue" } },
        { trial_num: 46, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "ambiguity", level: 74,  amount: 2500, color_gain: "red"  } },
        { trial_num: 47, f1: "2749_neut.JPG",   f2: "2749_neut.JPG",   ft: "neu",  lottery: { type: "ambiguity", level: 74,  amount: 2500, color_gain: "blue" } },
        { trial_num: 48, f1: "9419_neg.jpg",    f2: "9419_neg.jpg",    ft: "neg",  lottery: { type: "ambiguity", level: 100, amount: 2500, color_gain: "red"  } },
        { trial_num: 49, f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "ambiguity", level: 100, amount: 2500, color_gain: "blue" } }
    ],

    /* ==========================================================
       PRACTICE TRIALS (6)
       Mix of risk/ambiguity, amounts, and flanker types.
       ========================================================== */
    practiceTrials: [
        { trial_num: "p1", f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "risk",      level: 50,  amount: 800,  color_gain: "red"  } },
        { trial_num: "p2", f1: "2394_neut.JPG",   f2: "2394_neut.JPG",   ft: "neu",  lottery: { type: "ambiguity", level: 50,  amount: 1200, color_gain: "blue" } },
        { trial_num: "p3", f1: "2700_neg.JPG",    f2: "2700_neg.JPG",    ft: "neg",  lottery: { type: "risk",      level: 75,  amount: 2500, color_gain: "red"  } },
        { trial_num: "p4", f1: "None.jpg",        f2: "None.jpg",        ft: "none", lottery: { type: "ambiguity", level: 24,  amount: 800,  color_gain: "blue" } },
        { trial_num: "p5", f1: "2359_neut.jpg",   f2: "2359_neut.jpg",   ft: "neu",  lottery: { type: "risk",      level: 25,  amount: 1200, color_gain: "red"  } },
        { trial_num: "p6", f1: "2276_neg.JPG",    f2: "2276_neg.JPG",    ft: "neg",  lottery: { type: "ambiguity", level: 74,  amount: 2500, color_gain: "blue" } }
    ]

};
