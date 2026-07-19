/* ============================================================
   TRIAL CONFIGURATION  —  Dan et al. (2025) loss-only design
   ----------------------------------------------------------
   Edit this file to change timings, image URLs, or trials.
   Load BEFORE trial.js.

   FRAME: Loss
     Sure option:  fixed loss of –$5 (see fixedAmount below).
     Lottery:      lose `amount` dollars with probability `level`%
                   (color_gain side), or $0 otherwise.

   Each trial has:
     trial_num        – unique trial ID (1–98)
     picture_valence  – "neg" | "neu"
     gamble_id        – unique gamble identifier ("G01", "G02", …)
     is_control       – true | false
     lottery          – the monetary decision task:
       type       – "risk" or "ambiguity"
       level      – risk:      25 / 50 / 75    (% chance of the loss)
                    ambiguity: 24 / 50 / 74 / 100 (% of bar occluded)
       amount     – lottery loss magnitude: 5 (control), 8, 12, or 25
       color_gain – which bar color carries the non-zero loss: "red" | "blue"

   TRIAL COUNT:
     Risk  (non-control):  3 levels × 3 amounts × 2 valences × 2 reps = 36
     Ambiguity (non-ctrl): 4 levels × 3 amounts × 2 valences × 2 reps = 48
     Control  ($5):        7 neg (3 ambig + 4 risk) + 7 neu (4 ambig + 3 risk) = 14
                                                                    Total = 98
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
      NEGATIVE IMAGE LIST (49 images — one per negative trial)
      At runtime these keys are shuffled and popped for each neg trial.
      ========================================================== */
   negative_images: {
      "2700_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_uBcToCowu1VT2iL",
      "2276_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_chGjHXVvAwWrCN2",
      "6571_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_L0pRWLQA0s4i306",
      "9332_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_NVE4R3ecPnMhCPF",
      "9419_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cU2Ps8SRJkKqbZe",
      "9425_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_P4BwqDy4lpG2D49",
      "2345.1_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_zvghA0Y3nWtxjxg",
      "9220_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ucf6pbanRHrHLcl",
      "6838_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_xE8AnnpTjLa9Xi4",
      "9041_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_uqPaifhQO2t5Qwu",
      "9421_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_H5JgMb0oPPozy8m",
      "3220_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IxybO4KT9M4vH2t",
      "2710_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_lAozAliPHdBq1uQ",
      "2456_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bfI4FDPHGcbgbbP",
      "2799_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_OT7Rwqti7CqqQMb",
      "2900_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Dq6cekuxlq6ejEW",
      "3216_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_TOZuLfkIo0m7Ga3",
      "2691_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cwuATmusAtZSKfa",
      "2375.1_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9pjnNP4ewPNV34l",
      "6561_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_WU1Rfy3eloYj1EB",
      "3230_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_E4m0giUerheu5Lt",
      "2141_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_fEasRlOi3z5n2iJ",
      "2301_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_qgHipkjCWTxktnm",
      "2717_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_91lbNPG9RdCyh40",
      "3300_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_dYzPIg8lTssbmbI",
      "9426_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_WxDiWqAjOu0sLlZ",
      "9415_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ILFGmS4Njtg1kUg",
      "6825_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_hg5ylNoR5IqVCSb",
      "2053_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_HBUtxHaxicL16zx",
      "6831_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_RMuH7phf3VQn3Mm",
      "3550_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_EuBgid4qaCfWySf",
      "8230_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8xaGCnMjx225TtC",
      "9400_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_HTycbIMvXCMRgjh",
      "9427_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ib0bQK65D7hsE4l",
      "9428_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_2z3nDPI3p6C5Bfq",
      "9429_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_G4coNCnzIvAcivC",
      "9424_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_RPavNawyxMJ2C7I",
      "6244_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_fjRnxZaiwOpzgEG",
      "9530_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ZSQdq5U2trZrKJ0",
      "9491_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_w5kW9d5S4PNvtOn",
      "9900_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_STHfUJaiLbkll2z",
      "4621_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_pRO6b7iedL34UFz",
   },

   control_negative_images: {
      "2055.1_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_YT3AmaF52knyCqH",
      "2455_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_AxOdin0StBHoMEw",
      "6311_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_vSIAIJgfzvgEC74",
      "9435_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_1P55YiBXlOYQ0U3",
      "9160_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_YkINP1KH6V08iAS",
      "6562_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_N95azkiLCJd73gj",
      "6242_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Sn2xcSaRkA5l9Gl",
   },

   control_neutral_images: {
      "2513_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bcCk5s7BFJZhfLe",
      "2518_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_U7yRxFnILbtWttt",
      "2032_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_rTIkbWol137WBU8",
      "2235_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IEa3NjaAn4Q3wVv",
      "2211_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_De9xgJKU5r5QTWs",
      "2372_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_grggxJx2RFzxach",
      "2597_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_dw7VnwEga8MZcQz",
   },

   /* ==========================================================
      NEUTRAL IMAGE LIST (49 images — one per neutral trial)
      At runtime these keys are shuffled and popped for each neu trial.
      ========================================================== */
   neutral_images: {
      "2394_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5lxgbEa3yaEPMIs",
      "2359_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IlAF9vg4iD1pTPW",
      "4605_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Iu4ReFTKEAjN8zh",
      "2305_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5ULiEyToDlcDKJP",
      "2026_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_7UiEXEozpIXJlON",
      "7493_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_qREp8l9C9zQwX3S",
      "2273_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_t3fLwedy3hFjegH",
      "2749_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_URFHRBm9Ln640as",
      "2514_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_H7RlkrIEbqpDsh2",
      "2107_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_JhKecVuww9vrL09",
      "2850_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_n4vAdlCqBJc3pY0",
      "2485_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_tQ5JXa2GBF6v4tJ",
      "2191_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0eoOno96II4s5kr",
      "2595_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_JJFv49IsIGg12DC",
      "2102_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_CmHmTD0Vt5TScV0",
      "2870_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_S944YwNBSmRvMwY",
      "2308_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Mb6iTQ0lmP1Q2XJ",
      "2579_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_nMbGzOwWbOdg1Aj",
      "2745.1_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8jgR4d7kH8mEzVt",
      "2397_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_JngF9hpdhze7Dwy",
      "2393_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_uZdUsRLWl7qTROT",
      "2580_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_mghwXOX5NcN4PGl",
      "2214_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_AeeejmV2an6wQi2",
      "2411_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_iHqYJTzs5RiD9JH",
      "2488_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_nsHteBGWpPnQ9KZ",
      "2396_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_weI25Rl6nVbImhc",
      "2377_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IXDDmAUX9YbfUUA",
      "2593_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Q0q0IjpEsBy3AWR",
      "2036_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_x8gKrRccKr2MeV3",
      "2489_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5jiXcZy9ZOR4cfl",
      "2570_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_nTBs1GeduWKkDDD",
      "2435_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_sm6zePuB3VtBORR",
      "2382_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_BaHbPK2ZmFVawBf",
      "4571_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ggwjdTptRAizaTj",
      "2390_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_FqFxfOqP0XbMUgx",
      "2495_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0QzdylqeJ5zasoS",
      "8311_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_uO3k6Bv0Qj5Tbwf",
      "8312_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_84VgqilIWvAA8p7",
      "2506_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_wZ2rJSW997jAkcH",
      "2384_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_VwoS7bDWQG5I1H6",
      "2484_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_jK1axx0jDlDlv4D",
      "9070_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_fNlTymlN6735fz5",
   },

   /* ==========================================================
      PRACTICE IMAGE LIST (8 images — one per practice trial)
      ========================================================== */
   practice_images: {
      "5410.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8gCIzZgMKT5hOP2",
      "9404.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_y5AA9kGEo8R8Jm1",
      "2795.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Krjj2a24KU0Pl4I",
      "2320.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_2amwc45GKmy0zS5",
      "2205.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_QLn8U9PdJEMDcsJ",
      "2594.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Ff5QEfLRNkyfQ4G",
      "6213.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_UshFsxIkeIPg71j",
      "2560.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_7NEKi0cDA6gDajV"
   },

   /* ==========================================================
      98 TRIALS
      ----------------------------------------------------------
      Risk  (non-control):  3 levels (25,50,75) × 3 amounts (8,12,25) × 2 valences × 2 reps = 36
      Ambiguity (non-ctrl): 4 levels (24,50,74,100) × 3 amounts (8,12,25) × 2 valences × 2 reps = 48
      Control  ($5):        7 neg (3 ambig + 4 risk) + 7 neu (4 ambig + 3 risk) = 14
                                                                         Total = 98
      ========================================================== */
   trials: [
      /* ----------------------------------------------------------
         RISK (non-control): 36 trials
         3 levels × 3 amounts × 2 valences × 2 reps
         ---------------------------------------------------------- */
      // --- level 25, amount 8  [G825] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 25, amount: 8 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 25, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 25, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 25, amount: 8 } },
      // --- level 25, amount 12  [G1225] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 25, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 25, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 25, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 25, amount: 12 } },
      // --- level 25, amount 25  [G2525] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 25, amount: 25 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 25, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 25, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 25, amount: 25 } },
      // --- level 50, amount 8  [G850] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 50, amount: 8 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 50, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 50, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 50, amount: 8 } },
      // --- level 50, amount 12  [G1250] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 50, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 50, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 50, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 50, amount: 12 } },
      // --- level 50, amount 25  [G2550] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 50, amount: 25 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 50, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 50, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 50, amount: 25 } },
      // --- level 75, amount 8  [G875] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 75, amount: 8 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 75, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 75, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 75, amount: 8 } },
      // --- level 75, amount 12  [G1275] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 75, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 75, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 75, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 75, amount: 12 } },
      // --- level 75, amount 25  [G2575] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 75, amount: 25 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 75, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 75, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 75, amount: 25 } },

      /* ----------------------------------------------------------
         AMBIGUITY (non-control): 48 trials
         4 levels × 3 amounts × 2 valences × 2 reps
         ---------------------------------------------------------- */
      // --- level 24, amount 8  [A824] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 8 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 8 } },
      // --- level 24, amount 12  [A1224] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 12 } },
      // --- level 24, amount 25  [A2524] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 25 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 25 } },
      // --- level 50, amount 8  [A850] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 8 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 8 } },
      // --- level 50, amount 12  [A1250] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 12 } },
      // --- level 50, amount 25  [A2550] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 25 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 25 } },
      // --- level 74, amount 8  [A874] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 8 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 8 } },
      // --- level 74, amount 12  [A1274] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 12 } },
      // --- level 74, amount 25  [A2574] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 25 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 25 } },
      // --- level 100, amount 8  [A8100] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 8 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 8 } },
      // --- level 100, amount 12  [A12100] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 12 } },
      // --- level 100, amount 25  [A25100] ---
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 25 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 100, amount: 25 } },

      /* ----------------------------------------------------------
         CONTROL: 14 trials  ($5 amount, is_control: true)
         Negative (7): 3 ambiguity + 4 risk
         Neutral  (7): 4 ambiguity + 3 risk
         Levels randomized for now.
         ---------------------------------------------------------- */
      // --- negative controls ---
      { picture_valence: "neg", is_control: true, lottery: { type: "ambiguity", level: 24, amount: 5 } },
      { picture_valence: "neg", is_control: true, lottery: { type: "ambiguity", level: 50, amount: 5 } },
      { picture_valence: "neg", is_control: true, lottery: { type: "ambiguity", level: 74, amount: 5 } },
      { picture_valence: "neg", is_control: true, lottery: { type: "ambiguity", level: 100, amount: 5 } },
      { picture_valence: "neg", is_control: true, lottery: { type: "risk", level: 25, amount: 5 } },
      { picture_valence: "neg", is_control: true, lottery: { type: "risk", level: 50, amount: 5 } },
      { picture_valence: "neg", is_control: true, lottery: { type: "risk", level: 75, amount: 5 } },
      // --- neutral controls ---
      { picture_valence: "neu", is_control: true, lottery: { type: "ambiguity", level: 24, amount: 5 } },
      { picture_valence: "neu", is_control: true, lottery: { type: "ambiguity", level: 50, amount: 5 } },
      { picture_valence: "neu", is_control: true, lottery: { type: "ambiguity", level: 74, amount: 5 } },
      { picture_valence: "neu", is_control: true, lottery: { type: "ambiguity", level: 100, amount: 5 } },
      { picture_valence: "neu", is_control: true, lottery: { type: "risk", level: 25, amount: 5 } },
      { picture_valence: "neu", is_control: true, lottery: { type: "risk", level: 50, amount: 5 } },
      { picture_valence: "neu", is_control: true, lottery: { type: "risk", level: 75, amount: 5 } },
   ],

   /* ==========================================================
      PRACTICE TRIALS (8)
      Mix of risk / ambiguity, amounts, and picture valences.
      ========================================================== */
   practiceTrials: [
      { picture_valence: "neu", is_control: true, lottery: { type: "risk", level: 50, amount: 5 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 50, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 75, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "ambiguity", level: 24, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { type: "risk", level: 25, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 25 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "risk", level: 75, amount: 25 } },
      { picture_valence: "neg", is_control: false, lottery: { type: "ambiguity", level: 74, amount: 25 } }
   ]

};

// Dynamically create lists of unique image URLs for prefetch in Qualtrics
(function () {
   var config = window.TRIAL_CONFIG;
   if (!config) return;

   // Helper to collect non-MISSING URLs from an image map
   function collectUrls(imageMap) {
      var urls = [];
      var keys = Object.keys(imageMap);
      for (var i = 0; i < keys.length; i++) {
         var url = imageMap[keys[i]];
         if (url && url !== "MISSING" && urls.indexOf(url) === -1) {
            urls.push(url);
         }
      }
      return urls;
   }

   config.PRACTICE_TRIAL_IMAGE_URLS = config.practice_images ? collectUrls(config.practice_images) : [];
   config.TRIALS_IMAGES_URLS = [];

   if (config.negative_images) {
      config.TRIALS_IMAGES_URLS = config.TRIALS_IMAGES_URLS.concat(collectUrls(config.negative_images));
   }
   if (config.neutral_images) {
      config.TRIALS_IMAGES_URLS = config.TRIALS_IMAGES_URLS.concat(collectUrls(config.neutral_images));
   }
   if (config.control_negative_images) {
      config.TRIALS_IMAGES_URLS = config.TRIALS_IMAGES_URLS.concat(collectUrls(config.control_negative_images));
   }
   if (config.control_neutral_images) {
      config.TRIALS_IMAGES_URLS = config.TRIALS_IMAGES_URLS.concat(collectUrls(config.control_neutral_images));
   }

   // Deduplicate (in case practice images overlap with trial images)
   var seen = {};
   var unique = [];
   for (var j = 0; j < config.TRIALS_IMAGES_URLS.length; j++) {
      var u = config.TRIALS_IMAGES_URLS[j];
      if (!seen[u]) {
         seen[u] = true;
         unique.push(u);
      }
   }
   config.TRIALS_IMAGES_URLS = unique;
})();
