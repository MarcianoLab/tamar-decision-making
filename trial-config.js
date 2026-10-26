/* ============================================================
   TRIAL CONFIGURATION  —  Gain and loss scenarios
   ----------------------------------------------------------
   Edit this file to change timings, image URLs, or trials.
   Load BEFORE trial.js.

   FRAME: Set frame to "gain" or "loss" (default: "gain").
     Sure option:  gain or lose fixedAmount dollars.
     Lottery:      gain or lose `amount` dollars with probability
                   `level`% (top color), or $0 otherwise.
     Amounts stay positive in this file; frame determines their sign.

   BETWEEN-SUBJECTS GROUPS (4 levels, set via "group" embedded data):
     1 = Blue colorGain, risk block first
     2 = Blue colorGain, ambiguity block first
     3 = Red  colorGain, risk block first
     4 = Red  colorGain, ambiguity block first

   BLOCKS:
     All trials are split by lottery.type into a risk block and
     an ambiguity block.
     Block order is determined by the group variable.
     A break screen is shown between the two blocks.

   Each trial has:
     trial_num        – unique trial ID (1–98)
     picture_valence  – "neg" | "neu" | "high_threat"
     gamble_id        – unique gamble identifier ("G01", "G02", …)
     is_control       – true | false
     lottery          – the monetary decision task:
       frame      – optional "gain" | "loss" override for this trial
       type       – "risk" or "ambiguity"
       level      – risk:      25 / 50 / 75    (% chance of non-zero outcome)
                    ambiguity: 24 / 50 / 74 / 100 (% of bar occluded)
       amount     – lottery magnitude: 5 (control), 8, 12, or 25
       color_gain – which bar color carries the non-zero outcome: "red" | "blue"

   TRIAL COUNT:
     Risk block:      18 non-control trials
     Ambiguity block: 18 non-control trials
                               Total = 36
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
      frame        - "gain" or "loss", applies to main and practice trials.
                     A lottery.frame value overrides this for that trial.
                     Example: lottery: { frame: "loss", type: "risk", level: 50, amount: 12 }
                     shows a sure -5 versus a 50% chance of -12 or 0.
      fixedAmount  - positive magnitude of the sure option.
                     Loss trials display both this and lottery.amount negatively.
      ========================================================== */
   frame: "gain",
   fixedAmount: 5,

   /* ==========================================================
      NEGATIVE IMAGE LIST (49 images — one per negative trial)
      At runtime these keys are shuffled and popped for each neg trial.
      ========================================================== */
   negative_images: {
      "2455_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_AxOdin0StBHoMEw",
      "2456_neg.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bfI4FDPHGcbgbbP",
      "2900_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Dq6cekuxlq6ejEW",
      "9220_neg.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ucf6pbanRHrHLcl",
      "2455_neg1.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_AxOdin0StBHoMEw",
      "2456_neg1.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bfI4FDPHGcbgbbP",
      "2900_neg1.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Dq6cekuxlq6ejEW",
      "9220_neg1.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ucf6pbanRHrHLcl",
      "2455_neg2.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_AxOdin0StBHoMEw",
      "2456_neg2.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bfI4FDPHGcbgbbP",
      "2900_neg2.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Dq6cekuxlq6ejEW",
      "9220_neg2.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ucf6pbanRHrHLcl",

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
      "2518_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_U7yRxFnILbtWttt",
      "2235_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IEa3NjaAn4Q3wVv",
      "2211_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_De9xgJKU5r5QTWs",
      "2372_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_grggxJx2RFzxach",
      "2597_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_dw7VnwEga8MZcQz",
      "2514_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_H7RlkrIEbqpDsh2",
      "2026_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_7UiEXEozpIXJlON",
   },

   /* ==========================================================
      NEUTRAL IMAGE LIST (49 images — one per neutral trial)
      At runtime these keys are shuffled and popped for each neu trial.
      ========================================================== */
   neutral_images: {
      "2513_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bcCk5s7BFJZhfLe",
      "2032_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_rTIkbWol137WBU8",
      "2394_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5lxgbEa3yaEPMIs",
      "2359_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IlAF9vg4iD1pTPW",
      "4605_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Iu4ReFTKEAjN8zh",
      "2305_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5ULiEyToDlcDKJP",
      "7493_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_qREp8l9C9zQwX3S",
      "2273_neut.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_t3fLwedy3hFjegH",
      "2749_neut.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_URFHRBm9Ln640as",
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
      HIGH THREAT IMAGE POOL (12 images; regular trials only)
      Random placeholders from the existing image lists.
      These images have not been categorized by threat level.
      Replace filenames and URLs with the intended stimuli.
      ========================================================== */
   high_threat_images: {
      "8475.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_H70uJriPArPNYcu",
      "5973.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IgAikHhRBRCblak",
      "9622.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_uBCQzhoPmoinlq5",
      "8485.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0x5pH37ljPL3roh",
      "84751.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_H70uJriPArPNYcu",
      "59731.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IgAikHhRBRCblak",
      "96221.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_uBCQzhoPmoinlq5",
      "84851.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0x5pH37ljPL3roh",
      "84752.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_H70uJriPArPNYcu",
      "59732.jpg": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_IgAikHhRBRCblak",
      "96222.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_uBCQzhoPmoinlq5",
      "84852.JPG": "https://hebrewuni.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0x5pH37ljPL3roh",

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
      36 MAIN TRIALS
      ----------------------------------------------------------
      3 picture valences x 2 frames x 2 types x 3 amounts = 36.
      Risk: 50% chance of the non-zero outcome.
      Ambiguity: 50% of the probability bar is occluded.
      Each category has amounts 8, 12, and 25, with no controls.
      ========================================================== */
   trials: [
      // 1. Neutral loss, risk
      { picture_valence: "neu", is_control: false, lottery: { frame: "loss", type: "risk", level: 50, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { frame: "loss", type: "risk", level: 50, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { frame: "loss", type: "risk", level: 50, amount: 25 } },

      // 2. Neutral loss, ambiguity
      { picture_valence: "neu", is_control: false, lottery: { frame: "loss", type: "ambiguity", level: 50, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { frame: "loss", type: "ambiguity", level: 50, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { frame: "loss", type: "ambiguity", level: 50, amount: 25 } },

      // 3. Neutral gain, risk
      { picture_valence: "neu", is_control: false, lottery: { frame: "gain", type: "risk", level: 50, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { frame: "gain", type: "risk", level: 50, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { frame: "gain", type: "risk", level: 50, amount: 25 } },

      // 4. Neutral gain, ambiguity
      { picture_valence: "neu", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 50, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 50, amount: 12 } },
      { picture_valence: "neu", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 50, amount: 25 } },

      // 5. Negative loss, risk
      { picture_valence: "neg", is_control: false, lottery: { frame: "loss", type: "risk", level: 50, amount: 8 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "loss", type: "risk", level: 50, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "loss", type: "risk", level: 50, amount: 25 } },

      // 6. Negative loss, ambiguity
      { picture_valence: "neg", is_control: false, lottery: { frame: "loss", type: "ambiguity", level: 50, amount: 8 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "loss", type: "ambiguity", level: 50, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "loss", type: "ambiguity", level: 50, amount: 25 } },

      // 7. Negative gain, risk
      { picture_valence: "neg", is_control: false, lottery: { frame: "gain", type: "risk", level: 50, amount: 8 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "gain", type: "risk", level: 50, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "gain", type: "risk", level: 50, amount: 25 } },

      // 8. Negative gain, ambiguity
      { picture_valence: "neg", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 50, amount: 8 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 50, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 50, amount: 25 } },

      // 9. High threat loss, risk
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "loss", type: "risk", level: 50, amount: 8 } },
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "loss", type: "risk", level: 50, amount: 12 } },
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "loss", type: "risk", level: 50, amount: 25 } },

      // 10. High threat loss, ambiguity
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "loss", type: "ambiguity", level: 50, amount: 8 } },
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "loss", type: "ambiguity", level: 50, amount: 12 } },
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "loss", type: "ambiguity", level: 50, amount: 25 } },

      // 11. High threat gain, risk
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "gain", type: "risk", level: 50, amount: 8 } },
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "gain", type: "risk", level: 50, amount: 12 } },
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "gain", type: "risk", level: 50, amount: 25 } },

      // 12. High threat gain, ambiguity
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 50, amount: 8 } },
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 50, amount: 12 } },
      { picture_valence: "high_threat", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 50, amount: 25 } },

   ],

   /* ==========================================================
      PRACTICE TRIALS (8)
      Mix of risk / ambiguity, amounts, and picture valences.
      ========================================================== */
   practiceTrials: [
      { picture_valence: "neu", is_control: true, lottery: { frame: "gain", type: "risk", level: 50, amount: 5 } },
      { picture_valence: "neu", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 50, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "gain", type: "risk", level: 75, amount: 25 } },
      { picture_valence: "neu", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 24, amount: 8 } },
      { picture_valence: "neu", is_control: false, lottery: { frame: "gain", type: "risk", level: 25, amount: 12 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 74, amount: 25 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "gain", type: "risk", level: 75, amount: 25 } },
      { picture_valence: "neg", is_control: false, lottery: { frame: "gain", type: "ambiguity", level: 74, amount: 25 } }
   ]

};

// Dynamically create lists of unique image URLs for prefetch in Qualtrics
(function () {
   var config = window.TRIAL_CONFIG;
   if (!config) return;

   // Helper to collect URLs from an image map
   function collectUrls(imageMap) {
      var urls = [];
      var keys = Object.keys(imageMap);
      for (var i = 0; i < keys.length; i++) {
         var url = imageMap[keys[i]];
         if (url && urls.indexOf(url) === -1) {
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
   if (config.high_threat_images) {
      config.TRIALS_IMAGES_URLS = config.TRIALS_IMAGES_URLS.concat(collectUrls(config.high_threat_images));
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
