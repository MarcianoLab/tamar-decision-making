/* ============================================================
   TRIAL CONFIGURATION  —  Dan et al. (2025) loss-only design
   ----------------------------------------------------------
   Edit this file to change timings, image URLs,  icon filenames, or trials.
   Load BEFORE trial.js.

   FRAME: Loss
     Sure option:  fixed loss of –$5 (see fixedAmount below).
     Lottery:      lose `amount` dollars with probability `level`%
                   (color_gain side), or $0 otherwise.

   Each trial has:
     trial_num  – unique trial ID
     f1, f2     – left/right flanker filenames (key into `images`)
     ft         – flanker type: "neu" | "neg" | "none"
     lottery    – the monetary decision task:
       type       – "risk" or "ambiguity"
       level      – risk:      25 / 50 / 75    (% chance of the loss)
                    ambiguity: 24 / 50 / 74 / 100 (% of bar occluded)
       amount     – lottery loss magnitude: 5 (control), 8, 20, or 50
       color_gain – which bar color carries the non-zero loss: "red" | "blue"

   TRIAL COUNT  (Dan-exact structure):
     Control  ($5 ref):  7 uncertainty levels × 1 rep          =  7
     Risk     ($8/$20/$50): 3 levels × 3 amounts × 2 reps      = 18
     Ambiguity($8/$20/$50): 4 levels × 3 amounts × 2 reps      = 24
                                                         Total  = 49 / context × 2 = 98

   Flanker types cycle: none → neu → neg → none → …
   SET 2 is derived in trial.js by adding 49 to trial_num.
   ============================================================ */

window.TRIAL_CONFIG = {

   /* ==========================================================
      TIMING CONFIGURATION (ms)
      ----------------------------------------------------------
      fixationMs               - how long the fixation cross is shown before the trial.
      flankerOnlyMs            - how long the flankers are shown ALONE (no lottery)
                                 after the fixation cross.
      displayNonInteractiveMs  - how long the full display (flankers + lottery widget)
                                 is shown before the lottery becomes interactive.
      flankerInteractiveMs     - kept for compatibility; set to 0 to never hide flankers
                                 (flankers now remain visible for the entire trial).
      autoAdvanceDelayMs       - delay after a choice is made before auto-advancing
                                 to the next trial.
      ========================================================== */
   fixationMs: 1000,
   flankerOnlyMs: 1500,
   displayNonInteractiveMs: 2000,
   flankerInteractiveMs: 0,
   autoAdvanceDelayMs: 500,

   /* ==========================================================
      TRIAL SETTINGS
      ----------------------------------------------------------
      fixedAmount  - the sure-loss magnitude shown to the participant.
                     Displayed as –$fixedAmount in the widget.
      ========================================================== */
   fixedAmount: 5,

   /* ==========================================================
      FLANKER IMAGE URL LOOKUP
      ========================================================== */
   images: {
      "None.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4u30N2tqJoyGQHo",
      "2394_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5lxgbEa3yaEPMIs",
      "2359_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IlAF9vg4iD1pTPW",
      "4605_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Iu4ReFTKEAjN8zh",
      "2305_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5ULiEyToDlcDKJP",
      "2026_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_7UiEXEozpIXJlON",
      "7493_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_qREp8l9C9zQwX3S",
      "2273_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_t3fLwedy3hFjegH",
      "2749_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_URFHRBm9Ln640as",
      "2700_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_uBcToCowu1VT2iL",
      "2276_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_chGjHXVvAwWrCN2",
      "6831_neg.bmp": "MISSING",
      "3550_neg.bmp": "MISSING",
      "6571_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_L0pRWLQA0s4i306",
      "9332_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_NVE4R3ecPnMhCPF",
      "9419_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cU2Ps8SRJkKqbZe",
      "9425_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_P4BwqDy4lpG2D49",
      "2345.1_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_zvghA0Y3nWtxjxg",
      "2514_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_H7RlkrIEbqpDsh2",
      "9220_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ucf6pbanRHrHLcl",
      "2107_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_JhKecVuww9vrL09",
      "6838_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_xE8AnnpTjLa9Xi4",
      "2850_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_n4vAdlCqBJc3pY0",
      "9041_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_uqPaifhQO2t5Qwu",
      "2485_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_tQ5JXa2GBF6v4tJ",
      "2191_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0eoOno96II4s5kr",
      "2595_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_JJFv49IsIGg12DC",
      "2102_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_CmHmTD0Vt5TScV0",
      "2870_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_S944YwNBSmRvMwY",
      "9421_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_H5JgMb0oPPozy8m",
      "3220_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IxybO4KT9M4vH2t",
      "2308_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Mb6iTQ0lmP1Q2XJ",
      "2710_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_lAozAliPHdBq1uQ",
      "2456_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bfI4FDPHGcbgbbP",
      "2579_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_nMbGzOwWbOdg1Aj",
      "2513_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bcCk5s7BFJZhfLe",
      "2799_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_OT7Rwqti7CqqQMb",
      "2745.1_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8jgR4d7kH8mEzVt",
      "2397_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_JngF9hpdhze7Dwy",
      "2393_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_uZdUsRLWl7qTROT",
      "2580_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_mghwXOX5NcN4PGl",
      "2900_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Dq6cekuxlq6ejEW",
      "3216_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_TOZuLfkIo0m7Ga3",
      "2214_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_AeeejmV2an6wQi2",
      "2691_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cwuATmusAtZSKfa",
      "2375.1_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9pjnNP4ewPNV34l",
      "6561_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_WU1Rfy3eloYj1EB",
      "2411_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_iHqYJTzs5RiD9JH",
      "2518_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_U7yRxFnILbtWttt",
      "3230_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_E4m0giUerheu5Lt",
      "2488_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_nsHteBGWpPnQ9KZ",
      "2141_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_fEasRlOi3z5n2iJ",
      "2455_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_AxOdin0StBHoMEw",
      "2396_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_weI25Rl6nVbImhc",
      "2377_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IXDDmAUX9YbfUUA",
      "2301_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_qgHipkjCWTxktnm",
      "2593_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Q0q0IjpEsBy3AWR",
      "2036_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_x8gKrRccKr2MeV3",
      "2489_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5jiXcZy9ZOR4cfl",
      "2717_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_91lbNPG9RdCyh40",
      "2570_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_nTBs1GeduWKkDDD",
      "3300_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_dYzPIg8lTssbmbI",
      "8230_neg.bmp": "MISSING",
      "2055.1_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_YT3AmaF52knyCqH",
      "2435_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_sm6zePuB3VtBORR",
      "6311_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_vSIAIJgfzvgEC74",
      "2382_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_BaHbPK2ZmFVawBf",
      "4571_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ggwjdTptRAizaTj",
      "9426_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_WxDiWqAjOu0sLlZ",
      "9415_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ILFGmS4Njtg1kUg",
      "6825_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_hg5ylNoR5IqVCSb",
      "2390_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_FqFxfOqP0XbMUgx",
      "2495_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0QzdylqeJ5zasoS",
      "2053_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_HBUtxHaxicL16zx",

      /* ==========================================================
      Not in excel - ask Tamar
      ========================================================== */
      '8311_neut.JPG': 'https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_uO3k6Bv0Qj5Tbwf',
      '8312_neut.jpg': 'https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_84VgqilIWvAA8p7',
      '9427_neg.jpg': 'https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ib0bQK65D7hsE4l',
      '9428_neg.jpg': 'https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_2z3nDPI3p6C5Bfq',
      '9429_neg.jpg': 'https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_G4coNCnzIvAcivC',
      '9435_neg.JPG': 'https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_1P55YiBXlOYQ0U3',
      "9400_neg.bmp": "MISSING",
   },

   /* ==========================================================
      49 LOSS TRIALS  (Dan et al. 2025 structure)
      ----------------------------------------------------------
      SET 2 is derived in trial.js by adding 49 to trial_num.
      ========================================================== */
   trials: [
      { trial_num: 1, f1: "2382_neut.jpg", f2: "2382_neut.jpg", ft: "neu", lottery: { type: "risk", level: 75, amount: 50 } },
      { trial_num: 2, f1: "8230_neg.bmp", f2: "8230_neg.bmp", ft: "neg", lottery: { type: "ambiguity", level: 100, amount: 20 } },
      { trial_num: 3, f1: "2489_neut.jpg", f2: "2489_neut.jpg", ft: "neu", lottery: { type: "ambiguity", level: 74, amount: 8 } },
      { trial_num: 4, f1: "2345.1_neg.jpg", f2: "2345.1_neg.jpg", ft: "neg", lottery: { type: "risk", level: 50, amount: 8 } },
      { trial_num: 5, f1: "2305_neut.jpg", f2: "2305_neut.jpg", ft: "neu", lottery: { type: "risk", level: 50, amount: 50 } },
      { trial_num: 6, f1: "2485_neut.JPG", f2: "2485_neut.JPG", ft: "neu", lottery: { type: "ambiguity", level: 50, amount: 50 } },
      { trial_num: 7, f1: "3550_neg.bmp", f2: "3550_neg.bmp", ft: "neg", lottery: { type: "ambiguity", level: 50, amount: 50 } },
      { trial_num: 8, f1: "2495_neut.JPG", f2: "2495_neut.JPG", ft: "neu", lottery: { type: "ambiguity", level: 74, amount: 20 } },
      { trial_num: 9, f1: "2102_neut.jpg", f2: "2102_neut.jpg", ft: "neu", lottery: { type: "risk", level: 25, amount: 20 } },
      { trial_num: 10, f1: "2700_neg.JPG", f2: "2700_neg.JPG", ft: "neg", lottery: { type: "risk", level: 75, amount: 20 } },
      { trial_num: 11, f1: "2435_neut.JPG", f2: "2435_neut.JPG", ft: "neu", lottery: { type: "ambiguity", level: 50, amount: 20 } },
      { trial_num: 12, f1: "3216_neg.jpg", f2: "3216_neg.jpg", ft: "neg", lottery: { type: "ambiguity", level: 24, amount: 50 } },
      { trial_num: 13, f1: "2394_neut.JPG", f2: "2394_neut.JPG", ft: "neu", lottery: { type: "ambiguity", level: 24, amount: 20 } },
      { trial_num: 14, f1: "2276_neg.JPG", f2: "2276_neg.JPG", ft: "neg", lottery: { type: "risk", level: 25, amount: 50 } },
      { trial_num: 15, f1: "2900_neg.JPG", f2: "2900_neg.JPG", ft: "neg", lottery: { type: "ambiguity", level: 24, amount: 20 } },
      { trial_num: 16, f1: "2393_neut.JPG", f2: "2393_neut.JPG", ft: "neu", lottery: { type: "ambiguity", level: 24, amount: 8 } },
      { trial_num: 17, f1: "2710_neg.JPG", f2: "2710_neg.JPG", ft: "neg", lottery: { type: "risk", level: 75, amount: 50 } },
      { trial_num: 18, f1: "2377_neut.jpg", f2: "2377_neut.jpg", ft: "neu", lottery: { type: "risk", level: 75, amount: 20 } },
      { trial_num: 19, f1: "2489_neut.jpg", f2: "2489_neut.jpg", ft: "neu", lottery: { type: "ambiguity", level: 74, amount: 8 } },
      { trial_num: 20, f1: "3220_neg.JPG", f2: "3220_neg.JPG", ft: "neg", lottery: { type: "control", level: 50, amount: 5 } },
      { trial_num: 21, f1: "2382_neut.jpg", f2: "2382_neut.jpg", ft: "neu", lottery: { type: "risk", level: 75, amount: 50 } },
      { trial_num: 22, f1: "2455_neg.JPG", f2: "2455_neg.JPG", ft: "neg", lottery: { type: "risk", level: 50, amount: 50 } },
      { trial_num: 23, f1: "2717_neg.jpg", f2: "2717_neg.jpg", ft: "neg", lottery: { type: "control", level: 50, amount: 5 } },
      { trial_num: 24, f1: "2570_neut.JPG", f2: "2570_neut.JPG", ft: "neu", lottery: { type: "ambiguity", level: 100, amount: 20 } },
      { trial_num: 25, f1: "2375.1_neg.jpg", f2: "2375.1_neg.jpg", ft: "neg", lottery: { type: "risk", level: 50, amount: 20 } },
      { trial_num: 26, f1: "2055.1_neg.jpg", f2: "2055.1_neg.jpg", ft: "neg", lottery: { type: "risk", level: 25, amount: 8 } },
      { trial_num: 27, f1: "2359_neut.jpg", f2: "2359_neut.jpg", ft: "neu", lottery: { type: "risk", level: 75, amount: 8 } },
      { trial_num: 28, f1: "6571_neg.JPG", f2: "6571_neg.JPG", ft: "neg", lottery: { type: "ambiguity", level: 74, amount: 20 } },
      { trial_num: 29, f1: "2107_neut.jpg", f2: "2107_neut.jpg", ft: "neu", lottery: { type: "risk", level: 25, amount: 50 } },
      { trial_num: 30, f1: "2495_neut.JPG", f2: "2495_neut.JPG", ft: "neu", lottery: { type: "ambiguity", level: 74, amount: 20 } },
      { trial_num: 31, f1: "2700_neg.JPG", f2: "2700_neg.JPG", ft: "neg", lottery: { type: "risk", level: 75, amount: 20 } },
      { trial_num: 32, f1: "2396_neut.jpg", f2: "2396_neut.jpg", ft: "neu", lottery: { type: "ambiguity", level: 24, amount: 50 } },
      { trial_num: 33, f1: "3300_neg.JPG", f2: "3300_neg.JPG", ft: "neg", lottery: { type: "ambiguity", level: 50, amount: 20 } },
      { trial_num: 34, f1: "2214_neut.jpg", f2: "2214_neut.jpg", ft: "neu", lottery: { type: "risk", level: 50, amount: 8 } },
      { trial_num: 35, f1: "2053_neg.jpg", f2: "2053_neg.jpg", ft: "neg", lottery: { type: "control", level: 50, amount: 5 } },
      { trial_num: 36, f1: "2036_neut.jpg", f2: "2036_neut.jpg", ft: "neu", lottery: { type: "risk", level: 25, amount: 8 } },
      { trial_num: 37, f1: "2305_neut.jpg", f2: "2305_neut.jpg", ft: "neu", lottery: { type: "risk", level: 50, amount: 50 } },
      { trial_num: 38, f1: "2799_neg.jpg", f2: "2799_neg.jpg", ft: "neg", lottery: { type: "ambiguity", level: 24, amount: 8 } },
      { trial_num: 39, f1: "2485_neut.JPG", f2: "2485_neut.JPG", ft: "neu", lottery: { type: "ambiguity", level: 50, amount: 50 } },
      { trial_num: 40, f1: "2359_neut.jpg", f2: "2359_neut.jpg", ft: "neu", lottery: { type: "risk", level: 75, amount: 8 } },
      { trial_num: 41, f1: "6831_neg.bmp", f2: "6831_neg.bmp", ft: "neg", lottery: { type: "control", level: 50, amount: 5 } },
      { trial_num: 42, f1: "2488_neut.jpg", f2: "2488_neut.jpg", ft: "neu", lottery: { type: "control", level: 50, amount: 5 } },
      { trial_num: 43, f1: "2900_neg.JPG", f2: "2900_neg.JPG", ft: "neg", lottery: { type: "ambiguity", level: 24, amount: 20 } },
      { trial_num: 44, f1: "2435_neut.JPG", f2: "2435_neut.JPG", ft: "neu", lottery: { type: "ambiguity", level: 50, amount: 20 } },
      { trial_num: 45, f1: "3216_neg.jpg", f2: "3216_neg.jpg", ft: "neg", lottery: { type: "ambiguity", level: 24, amount: 50 } },
      { trial_num: 46, f1: "9041_neg.JPG", f2: "9041_neg.JPG", ft: "neg", lottery: { type: "ambiguity", level: 100, amount: 50 } },
      { trial_num: 47, f1: "2308_neut.jpg", f2: "2308_neut.jpg", ft: "neu", lottery: { type: "control", level: 50, amount: 5 } },
      { trial_num: 48, f1: "2456_neg.jpg", f2: "2456_neg.jpg", ft: "neg", lottery: { type: "control", level: 50, amount: 5 } },
      { trial_num: 49, f1: "6561_neg.JPG", f2: "6561_neg.JPG", ft: "neg", lottery: { type: "ambiguity", level: 74, amount: 8 } }
   ],

   /* ==========================================================
      PRACTICE TRIALS (6)
      Mix of control / risk / ambiguity, amounts, and flanker types.
      ========================================================== */
   practiceTrials: [
      { trial_num: "p1", f1: "None.jpg", f2: "None.jpg", ft: "none", lottery: { type: "control", level: 50, amount: 5 } },
      { trial_num: "p2", f1: "2394_neut.JPG", f2: "2394_neut.JPG", ft: "neu", lottery: { type: "ambiguity", level: 50, amount: 20 } },
      { trial_num: "p3", f1: "2700_neg.JPG", f2: "2700_neg.JPG", ft: "neg", lottery: { type: "risk", level: 75, amount: 50 } },
      { trial_num: "p4", f1: "None.jpg", f2: "None.jpg", ft: "none", lottery: { type: "ambiguity", level: 24, amount: 8 } },
      { trial_num: "p5", f1: "2359_neut.jpg", f2: "2359_neut.jpg", ft: "neu", lottery: { type: "risk", level: 25, amount: 20 } },
      { trial_num: "p6", f1: "2276_neg.JPG", f2: "2276_neg.JPG", ft: "neg", lottery: { type: "ambiguity", level: 74, amount: 50 } }
   ]

};

// Dynamically create lists of unique image URLs used in practice and regular trials, for prefetch in Qualtrics
(function () {
   var config = window.TRIAL_CONFIG;
   if (!config) return;

   var practiceUrls = [];
   var trialsUrls = [];

   // Helper to add unique URLs to an array
   function addUniqueUrl(filename, targetArray) {
      if (!filename) return;
      var url = config.images[filename];
      if (url && url !== "MISSING") {
         if (targetArray.indexOf(url) === -1) {
            targetArray.push(url);
         }
      }
   }

   // Process practice trials
   if (config.practiceTrials) {
      for (var i = 0; i < config.practiceTrials.length; i++) {
         var trial = config.practiceTrials[i];
         addUniqueUrl(trial.f1, practiceUrls);
         addUniqueUrl(trial.f2, practiceUrls);
      }
   }

   // Process regular trials
   if (config.trials) {
      for (var j = 0; j < config.trials.length; j++) {
         var trial = config.trials[j];
         addUniqueUrl(trial.f1, trialsUrls);
         addUniqueUrl(trial.f2, trialsUrls);
      }
   }

   // Filter regular trials URLs to exclude those already in practiceUrls
   var uniqueTrialsUrls = [];
   for (var k = 0; k < trialsUrls.length; k++) {
      var url = trialsUrls[k];
      if (practiceUrls.indexOf(url) === -1) {
         uniqueTrialsUrls.push(url);
      }
   }

   config.PRACTICE_TRIAL_IMAGE_URLS = practiceUrls;
   config.TRIALS_IMAGES_URLS = uniqueTrialsUrls;
})();
