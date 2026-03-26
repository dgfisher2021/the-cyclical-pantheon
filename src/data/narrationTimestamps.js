/**
 * Narration timestamps for audio read-along, derived from audio analysis.
 *
 * Each paragraph has `segments` — sub-segments corresponding to sentence/clause
 * boundaries detected via silence analysis. Words are distributed proportionally
 * across segments for accurate karaoke-style highlighting.
 *
 * Multi-part chapters use `parts` array — each part is a separate audio file
 * that plays sequentially. Paragraph indices are relative to the chapter text
 * (skipping break blocks).
 */
export const narrationData = {
  "1.0": {
    parts: [
      {
        audioSrc: "./audio/prologue.mp3",
        // Paragraph indices 0-4 (the 5 paragraphs of chapter 1.0)
        startParagraph: 0,
        paragraphs: [
          {
            start: 0, end: 9.20,
            segments: [{ start: 0, end: 9.20 }],
          },
          {
            start: 9.85, end: 45.55,
            segments: [
              { start: 9.85, end: 13.15 },
              { start: 13.60, end: 22.45 },
              { start: 23.10, end: 32.00 },
              { start: 32.45, end: 40.20 },
              { start: 40.85, end: 43.15 },
              { start: 43.65, end: 45.55 },
            ],
          },
          {
            start: 46.35, end: 79.60,
            segments: [
              { start: 46.35, end: 51.30 },
              { start: 51.90, end: 52.60 },
              { start: 53.05, end: 53.75 },
              { start: 54.35, end: 62.65 },
              { start: 63.25, end: 64.90 },
              { start: 65.35, end: 68.00 },
              { start: 68.55, end: 69.60 },
              { start: 70.15, end: 71.90 },
              { start: 72.45, end: 75.00 },
              { start: 75.55, end: 77.15 },
              { start: 77.80, end: 79.60 },
            ],
          },
          {
            start: 80.40, end: 111.75,
            segments: [
              { start: 80.40, end: 82.70 },
              { start: 83.35, end: 85.80 },
              { start: 86.45, end: 90.25 },
              { start: 90.80, end: 94.10 },
              { start: 94.60, end: 99.95 },
              { start: 100.35, end: 102.65 },
              { start: 103.20, end: 107.25 },
              { start: 107.80, end: 111.75 },
            ],
          },
          {
            start: 112.50, end: 120.84,
            segments: [
              { start: 112.50, end: 113.65 },
              { start: 114.20, end: 115.75 },
              { start: 116.25, end: 118.90 },
              { start: 119.50, end: 120.84 },
            ],
          },
        ],
      },
    ],
  },
  "1.1": {
    parts: [
      // Part 1: Female narrator — Chaos & Creation (paragraphs 0-9)
      {
        audioSrc: "./audio/chapter 1.1 female (part 1).mp3",
        startParagraph: 0,
        paragraphs: [
          { start: 0, end: 4.20, segments: [{ start: 0, end: 4.20 }] },
          {
            start: 5.05, end: 45.80,
            segments: [
              { start: 5.05, end: 7.25 }, { start: 7.65, end: 12.45 },
              { start: 13.40, end: 17.60 }, { start: 18.55, end: 22.75 },
              { start: 23.60, end: 25.15 }, { start: 25.55, end: 29.30 },
              { start: 30.10, end: 39.65 }, { start: 40.50, end: 41.60 },
              { start: 42.25, end: 45.80 },
            ],
          },
          {
            start: 46.55, end: 52.85,
            segments: [{ start: 46.55, end: 50.55 }, { start: 51.55, end: 52.85 }],
          },
          { start: 53.40, end: 55.45, segments: [{ start: 53.40, end: 55.45 }] },
          {
            start: 56.85, end: 80.70,
            segments: [
              { start: 56.85, end: 59.10 }, { start: 59.80, end: 66.50 },
              { start: 67.35, end: 69.50 }, { start: 70.00, end: 73.40 },
              { start: 73.80, end: 75.45 }, { start: 75.95, end: 80.70 },
            ],
          },
          { start: 81.70, end: 83.75, segments: [{ start: 81.70, end: 83.75 }] },
          {
            start: 84.40, end: 151.90,
            segments: [
              { start: 84.40, end: 87.85 }, { start: 88.25, end: 92.45 },
              { start: 93.30, end: 97.50 }, { start: 98.00, end: 107.65 },
              { start: 108.50, end: 111.55 }, { start: 112.10, end: 114.60 },
              { start: 115.05, end: 117.90 }, { start: 118.75, end: 122.05 },
              { start: 122.45, end: 124.10 }, { start: 124.55, end: 138.15 },
              { start: 139.60, end: 151.90 },
            ],
          },
          {
            start: 152.90, end: 185.95,
            segments: [
              { start: 152.90, end: 155.45 }, { start: 156.05, end: 158.20 },
              { start: 158.80, end: 163.40 }, { start: 164.10, end: 167.15 },
              { start: 167.55, end: 170.35 }, { start: 171.40, end: 176.80 },
              { start: 177.50, end: 178.95 }, { start: 179.60, end: 185.95 },
            ],
          },
          {
            start: 186.55, end: 208.05,
            segments: [
              { start: 186.55, end: 187.95 }, { start: 188.45, end: 189.60 },
              { start: 190.20, end: 191.95 }, { start: 192.55, end: 208.05 },
            ],
          },
          {
            start: 209.05, end: 263.08,
            segments: [
              { start: 209.05, end: 212.10 }, { start: 212.70, end: 215.15 },
              { start: 215.70, end: 219.05 }, { start: 219.80, end: 223.85 },
              { start: 224.60, end: 234.95 }, { start: 235.40, end: 240.80 },
              { start: 241.85, end: 244.05 }, { start: 244.60, end: 247.00 },
              { start: 247.65, end: 252.10 }, { start: 252.60, end: 257.95 },
              { start: 258.45, end: 263.08 },
            ],
          },
        ],
      },
      // Part 2: Male narrator — Chaos & Destruction, jealousy (paragraphs 10-21)
      {
        audioSrc: "./audio/chapter 1.1 male (part 2).mp3",
        startParagraph: 10,
        paragraphs: [
          { start: 0, end: 2.35, segments: [{ start: 0, end: 2.35 }] },
          {
            start: 2.80, end: 42.25,
            segments: [
              { start: 2.80, end: 9.70 }, { start: 10.45, end: 13.10 },
              { start: 13.70, end: 16.90 }, { start: 17.35, end: 18.30 },
              { start: 19.10, end: 42.25 },
            ],
          },
          {
            start: 43.15, end: 83.90,
            segments: [
              { start: 43.15, end: 49.45 }, { start: 50.05, end: 51.95 },
              { start: 52.85, end: 72.75 }, { start: 73.15, end: 75.10 },
              { start: 75.90, end: 76.70 }, { start: 77.55, end: 83.90 },
            ],
          },
          {
            start: 84.40, end: 120.50,
            segments: [
              { start: 84.40, end: 89.85 }, { start: 90.75, end: 92.80 },
              { start: 93.20, end: 102.05 }, { start: 102.90, end: 104.55 },
              { start: 105.40, end: 109.25 }, { start: 109.90, end: 112.95 },
              { start: 113.35, end: 120.50 },
            ],
          },
          {
            start: 121.20, end: 135.40,
            segments: [
              { start: 121.20, end: 124.55 }, { start: 124.95, end: 131.95 },
              { start: 132.80, end: 135.40 },
            ],
          },
          {
            start: 135.90, end: 177.05,
            segments: [
              { start: 135.90, end: 139.35 }, { start: 140.00, end: 151.70 },
              { start: 152.60, end: 165.95 }, { start: 166.85, end: 173.45 },
              { start: 174.10, end: 175.75 }, { start: 176.25, end: 177.05 },
            ],
          },
          {
            start: 177.45, end: 189.20,
            segments: [{ start: 177.45, end: 182.80 }, { start: 183.40, end: 189.20 }],
          },
          {
            start: 189.85, end: 242.30,
            segments: [
              { start: 189.85, end: 193.20 }, { start: 193.65, end: 202.10 },
              { start: 202.90, end: 205.35 }, { start: 205.75, end: 206.90 },
              { start: 207.40, end: 215.00 }, { start: 215.80, end: 220.95 },
              { start: 221.60, end: 225.75 }, { start: 226.55, end: 233.15 },
              { start: 233.80, end: 238.35 }, { start: 238.95, end: 239.80 },
              { start: 240.40, end: 241.10 }, { start: 241.50, end: 242.30 },
            ],
          },
          {
            start: 242.70, end: 282.90,
            segments: [
              { start: 242.70, end: 253.10 }, { start: 253.70, end: 257.05 },
              { start: 257.50, end: 267.30 }, { start: 268.20, end: 270.80 },
              { start: 271.45, end: 273.10 }, { start: 273.70, end: 274.70 },
              { start: 275.20, end: 282.90 },
            ],
          },
          {
            start: 283.80, end: 310.35,
            segments: [
              { start: 283.80, end: 286.20 }, { start: 286.70, end: 295.75 },
              { start: 296.65, end: 298.85 }, { start: 299.30, end: 310.35 },
            ],
          },
          {
            start: 310.75, end: 336.35,
            segments: [
              { start: 310.75, end: 315.75 }, { start: 316.35, end: 318.70 },
              { start: 319.20, end: 319.90 }, { start: 320.55, end: 322.25 },
              { start: 322.85, end: 331.45 }, { start: 332.25, end: 336.35 },
            ],
          },
          {
            start: 336.95, end: 360.28,
            segments: [
              { start: 336.95, end: 340.85 }, { start: 341.50, end: 346.10 },
              { start: 346.85, end: 350.40 }, { start: 351.30, end: 352.65 },
              { start: 353.05, end: 360.28 },
            ],
          },
        ],
      },
      // Part 3: Female narrator — Light & Order (paragraphs 22-28)
      {
        audioSrc: "./audio/chapter 1.1 female (part 3).mp3",
        startParagraph: 22,
        paragraphs: [
          { start: 0, end: 1.75, segments: [{ start: 0, end: 1.75 }] },
          {
            start: 2.55, end: 34.35,
            segments: [
              { start: 2.55, end: 8.85 }, { start: 9.65, end: 12.55 },
              { start: 13.10, end: 17.05 }, { start: 17.90, end: 19.45 },
              { start: 20.05, end: 21.60 }, { start: 22.20, end: 24.85 },
              { start: 25.30, end: 30.35 }, { start: 31.40, end: 34.35 },
            ],
          },
          {
            start: 34.75, end: 94.10,
            segments: [
              { start: 34.75, end: 37.00 }, { start: 37.60, end: 41.65 },
              { start: 42.45, end: 45.85 }, { start: 46.55, end: 49.40 },
              { start: 49.95, end: 54.60 }, { start: 55.05, end: 61.05 },
              { start: 61.80, end: 64.65 }, { start: 65.05, end: 67.20 },
              { start: 68.05, end: 72.15 }, { start: 72.80, end: 77.30 },
              { start: 78.05, end: 81.40 }, { start: 81.85, end: 88.60 },
              { start: 89.00, end: 94.10 },
            ],
          },
          {
            start: 94.85, end: 120.05,
            segments: [
              { start: 94.85, end: 96.50 }, { start: 97.05, end: 106.30 },
              { start: 106.95, end: 112.40 }, { start: 112.85, end: 120.05 },
            ],
          },
          { start: 120.90, end: 122.15, segments: [{ start: 120.90, end: 122.15 }] },
          {
            start: 122.55, end: 166.30,
            segments: [
              { start: 122.55, end: 129.60 }, { start: 130.30, end: 131.95 },
              { start: 132.50, end: 133.65 }, { start: 134.30, end: 135.55 },
              { start: 136.30, end: 138.45 }, { start: 138.85, end: 141.00 },
              { start: 141.80, end: 146.40 }, { start: 147.00, end: 151.45 },
              { start: 151.95, end: 163.45 }, { start: 164.15, end: 166.30 },
            ],
          },
          {
            start: 167.20, end: 205.30,
            segments: [
              { start: 167.20, end: 169.45 }, { start: 169.95, end: 171.85 },
              { start: 172.30, end: 186.85 }, { start: 187.50, end: 192.00 },
              { start: 192.50, end: 193.95 }, { start: 194.35, end: 195.25 },
              { start: 196.00, end: 202.65 }, { start: 203.30, end: 204.15 },
              { start: 204.60, end: 205.30 },
            ],
          },
        ],
      },
      // Part 4: Male narrator — the other gods (paragraphs 29-36)
      {
        audioSrc: "./audio/chapter 1.1 male (part 4).mp3",
        startParagraph: 29,
        paragraphs: [
          {
            start: 0, end: 12.35,
            segments: [{ start: 0, end: 8.05 }, { start: 9.75, end: 12.35 }],
          },
          {
            start: 12.90, end: 76.35,
            segments: [
              { start: 12.90, end: 17.75 }, { start: 18.50, end: 24.25 },
              { start: 25.10, end: 31.50 }, { start: 32.05, end: 37.70 },
              { start: 38.15, end: 43.80 }, { start: 44.70, end: 48.00 },
              { start: 48.75, end: 52.90 }, { start: 53.80, end: 61.30 },
              { start: 62.20, end: 63.20 }, { start: 63.70, end: 68.05 },
              { start: 68.80, end: 76.35 },
            ],
          },
          {
            start: 77.20, end: 121.60,
            segments: [
              { start: 77.20, end: 83.55 }, { start: 84.05, end: 86.00 },
              { start: 86.50, end: 89.10 }, { start: 89.95, end: 92.00 },
              { start: 92.75, end: 96.50 }, { start: 97.35, end: 99.90 },
              { start: 100.50, end: 102.35 }, { start: 102.85, end: 105.50 },
              { start: 105.95, end: 107.20 }, { start: 107.60, end: 112.85 },
              { start: 113.90, end: 121.60 },
            ],
          },
          {
            start: 122.45, end: 152.90,
            segments: [
              { start: 122.45, end: 131.60 }, { start: 132.45, end: 142.05 },
              { start: 142.90, end: 149.90 }, { start: 151.05, end: 152.90 },
            ],
          },
          {
            start: 153.45, end: 195.45,
            segments: [
              { start: 153.45, end: 155.95 }, { start: 156.50, end: 163.10 },
              { start: 163.80, end: 166.35 }, { start: 166.75, end: 170.70 },
              { start: 171.45, end: 175.75 }, { start: 176.15, end: 178.40 },
              { start: 179.20, end: 190.40 }, { start: 191.20, end: 192.95 },
              { start: 193.40, end: 195.45 },
            ],
          },
          {
            start: 196.35, end: 232.15,
            segments: [
              { start: 196.35, end: 198.45 }, { start: 198.95, end: 204.60 },
              { start: 205.45, end: 207.10 }, { start: 207.60, end: 218.80 },
              { start: 219.65, end: 221.55 }, { start: 222.05, end: 225.85 },
              { start: 226.40, end: 228.50 }, { start: 228.95, end: 232.15 },
            ],
          },
          {
            start: 233.05, end: 268.10,
            segments: [
              { start: 233.05, end: 235.95 }, { start: 236.85, end: 238.65 },
              { start: 239.10, end: 242.45 }, { start: 242.90, end: 245.60 },
              { start: 246.15, end: 249.55 }, { start: 250.35, end: 253.45 },
              { start: 253.85, end: 257.50 }, { start: 258.40, end: 260.35 },
              { start: 260.85, end: 264.20 }, { start: 265.05, end: 266.10 },
              { start: 266.95, end: 268.10 },
            ],
          },
          {
            start: 269.20, end: 292.05,
            segments: [
              { start: 269.20, end: 271.85 }, { start: 272.40, end: 273.85 },
              { start: 274.35, end: 275.75 }, { start: 276.30, end: 279.50 },
              { start: 280.10, end: 285.10 }, { start: 285.95, end: 288.45 },
              { start: 289.10, end: 292.05 },
            ],
          },
        ],
      },
    ],
  },
};
