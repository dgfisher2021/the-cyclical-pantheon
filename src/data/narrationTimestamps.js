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
  "1.2": {
    parts: [
      {
        audioSrc: "./audio/chapter 1.2 female (part 1).mp3",
        startParagraph: 0,
        paragraphs: [
          { start: 0, end: 1.75, segments: [{ start: 0, end: 1.75 }] },
          { start: 2.55, end: 14.3, segments: [{ start: 2.55, end: 4.05 }, { start: 4.45, end: 6.3 }, { start: 7.15, end: 14.3 }] },
          { start: 14.9, end: 56.5, segments: [{ start: 14.9, end: 16.95 }, { start: 18.3, end: 21.9 }, { start: 22.35, end: 23.7 }, { start: 24.3, end: 28.65 }, { start: 29.35, end: 30.5 }, { start: 31.4, end: 34.3 }, { start: 34.8, end: 36.75 }, { start: 37.25, end: 39.75 }, { start: 40.2, end: 42.75 }, { start: 43.9, end: 49.35 }, { start: 49.75, end: 56.5 }] },
          { start: 57.0, end: 97.5, segments: [{ start: 57.0, end: 59.4 }, { start: 60.3, end: 62.85 }, { start: 63.3, end: 66.1 }, { start: 66.5, end: 69.3 }, { start: 69.8, end: 74.5 }, { start: 75.25, end: 79.35 }, { start: 80.2, end: 82.45 }, { start: 82.9, end: 83.85 }, { start: 84.25, end: 92.3 }, { start: 92.85, end: 95.9 }, { start: 96.5, end: 97.5 }] },
          { start: 98.3, end: 98.55, segments: [{ start: 98.3, end: 98.55 }] },
          { start: 98.3, end: 160.15, segments: [{ start: 98.3, end: 100.8 }, { start: 101.4, end: 102.05 }, { start: 102.55, end: 103.2 }, { start: 103.7, end: 104.6 }, { start: 105.2, end: 110.5 }, { start: 111.5, end: 112.75 }, { start: 113.45, end: 114.8 }, { start: 115.25, end: 119.05 }, { start: 119.45, end: 124.2 }, { start: 125.1, end: 127.95 }, { start: 128.35, end: 132.55 }, { start: 132.95, end: 133.6 }, { start: 134.0, end: 138.2 }, { start: 138.65, end: 142.3 }, { start: 142.9, end: 145.5 }, { start: 146.4, end: 146.85 }, { start: 147.75, end: 148.75 }, { start: 149.7, end: 150.9 }, { start: 151.7, end: 156.05 }, { start: 156.65, end: 160.15 }] },
          { start: 160.65, end: 167.75, segments: [{ start: 160.65, end: 162.2 }, { start: 162.65, end: 167.75 }] },
          { start: 168.55, end: 216.35, segments: [{ start: 168.55, end: 169.3 }, { start: 169.75, end: 173.15 }, { start: 173.6, end: 175.1 }, { start: 175.5, end: 176.3 }, { start: 176.8, end: 179.0 }, { start: 180.05, end: 180.9 }, { start: 181.4, end: 183.05 }, { start: 183.65, end: 184.95 }, { start: 185.6, end: 186.6 }, { start: 187.0, end: 189.65 }, { start: 190.2, end: 194.05 }, { start: 194.45, end: 196.0 }, { start: 196.4, end: 198.1 }, { start: 198.65, end: 200.15 }, { start: 200.6, end: 204.5 }, { start: 204.9, end: 206.1 }, { start: 206.7, end: 210.4 }, { start: 210.8, end: 216.35 }] },
          { start: 216.9, end: 263.3, segments: [{ start: 216.9, end: 220.6 }, { start: 221.6, end: 223.4 }, { start: 223.85, end: 227.05 }, { start: 227.45, end: 229.8 }, { start: 230.25, end: 231.65 }, { start: 232.15, end: 240.9 }, { start: 241.65, end: 242.4 }, { start: 242.9, end: 246.15 }, { start: 246.6, end: 252.05 }, { start: 252.6, end: 255.2 }, { start: 255.7, end: 258.8 }, { start: 259.6, end: 261.1 }, { start: 261.75, end: 263.3 }] },
          { start: 263.8, end: 290.25, segments: [{ start: 263.8, end: 264.65 }, { start: 265.05, end: 268.95 }, { start: 269.9, end: 270.75 }, { start: 271.25, end: 273.0 }, { start: 273.6, end: 279.1 }, { start: 279.55, end: 281.7 }, { start: 282.2, end: 290.25 }] },
          { start: 290.75, end: 343.5, segments: [{ start: 290.75, end: 292.7 }, { start: 293.3, end: 297.5 }, { start: 297.95, end: 299.25 }, { start: 300.35, end: 303.8 }, { start: 304.45, end: 305.95 }, { start: 306.5, end: 310.65 }, { start: 311.25, end: 312.45 }, { start: 312.95, end: 315.5 }, { start: 315.9, end: 317.95 }, { start: 318.35, end: 320.3 }, { start: 320.75, end: 323.25 }, { start: 323.8, end: 324.9 }, { start: 325.45, end: 329.6 }, { start: 330.05, end: 334.3 }, { start: 334.75, end: 337.9 }, { start: 338.5, end: 340.2 }, { start: 340.7, end: 343.5 }] },
          { start: 344.45, end: 355.16, segments: [{ start: 344.45, end: 345.6 }, { start: 346.45, end: 348.2 }, { start: 348.65, end: 353.5 }, { start: 354.1, end: 355.16 }] },
        ],
      },
      {
        audioSrc: "./audio/chapter 1.2 male (part 2).mp3",
        startParagraph: 12,
        paragraphs: [
          { start: 0, end: 1.75, segments: [{ start: 0, end: 1.75 }] },
          { start: 2.4, end: 47.35, segments: [{ start: 2.4, end: 4.95 }, { start: 5.55, end: 6.65 }, { start: 7.4, end: 11.05 }, { start: 11.65, end: 13.0 }, { start: 13.6, end: 23.0 }, { start: 23.9, end: 29.5 }, { start: 30.1, end: 31.55 }, { start: 32.0, end: 44.85 }, { start: 45.3, end: 47.35 }] },
          { start: 47.75, end: 67.05, segments: [{ start: 47.75, end: 50.3 }, { start: 50.9, end: 56.4 }, { start: 56.8, end: 61.9 }, { start: 62.4, end: 67.05 }] },
          { start: 67.9, end: 83.2, segments: [{ start: 67.9, end: 70.05 }, { start: 70.8, end: 76.05 }, { start: 76.5, end: 79.05 }, { start: 79.8, end: 83.2 }] },
          { start: 83.7, end: 117.35, segments: [{ start: 83.7, end: 92.15 }, { start: 93.0, end: 94.4 }, { start: 95.05, end: 99.1 }, { start: 99.5, end: 103.85 }, { start: 104.6, end: 106.7 }, { start: 107.3, end: 110.2 }, { start: 110.8, end: 117.35 }] },
          { start: 117.95, end: 157.55, segments: [{ start: 117.95, end: 120.6 }, { start: 121.05, end: 123.45 }, { start: 123.95, end: 125.65 }, { start: 126.5, end: 133.35 }, { start: 133.75, end: 137.8 }, { start: 138.6, end: 142.95 }, { start: 143.5, end: 145.15 }, { start: 145.7, end: 157.55 }] },
          { start: 158.3, end: 181.6, segments: [{ start: 158.3, end: 160.1 }, { start: 160.65, end: 162.9 }, { start: 163.5, end: 165.55 }, { start: 166.2, end: 169.05 }, { start: 169.85, end: 175.1 }, { start: 175.7, end: 181.6 }] },
          { start: 182.0, end: 185.75, segments: [{ start: 182.0, end: 183.7 }, { start: 184.25, end: 185.75 }] },
          { start: 186.4, end: 192.75, segments: [{ start: 186.4, end: 190.05 }, { start: 190.45, end: 192.75 }] },
          { start: 193.35, end: 195.4, segments: [{ start: 193.35, end: 195.4 }] },
          { start: 195.9, end: 200.05, segments: [{ start: 195.9, end: 200.05 }] },
          { start: 200.95, end: 228.05, segments: [{ start: 200.95, end: 207.85 }, { start: 208.65, end: 213.3 }, { start: 213.9, end: 215.55 }, { start: 216.3, end: 225.35 }, { start: 226.1, end: 228.05 }] },
          { start: 228.6, end: 275.4, segments: [{ start: 228.6, end: 233.3 }, { start: 234.2, end: 237.75 }, { start: 238.15, end: 239.65 }, { start: 240.25, end: 241.6 }, { start: 242.05, end: 243.55 }, { start: 244.45, end: 249.8 }, { start: 250.7, end: 254.55 }, { start: 255.0, end: 260.1 }, { start: 260.55, end: 266.35 }, { start: 267.15, end: 275.4 }] },
          { start: 276.3, end: 323.97, segments: [{ start: 276.3, end: 277.75 }, { start: 278.35, end: 279.45 }, { start: 279.85, end: 282.65 }, { start: 283.15, end: 288.6 }, { start: 289.45, end: 294.55 }, { start: 295.2, end: 301.6 }, { start: 302.1, end: 309.9 }, { start: 310.3, end: 313.15 }, { start: 314.0, end: 315.55 }, { start: 316.15, end: 318.25 }, { start: 318.8, end: 323.97 }] },
        ],
      },
      {
        audioSrc: "./audio/chapter 1.2 female (part 3).mp3",
        startParagraph: 26,
        paragraphs: [
          { start: 0, end: 34.75, segments: [{ start: 0, end: 3.0 }, { start: 3.95, end: 7.85 }, { start: 8.45, end: 13.4 }, { start: 14.3, end: 16.1 }, { start: 16.55, end: 25.3 }, { start: 26.2, end: 27.2 }, { start: 27.6, end: 34.75 }] },
          { start: 35.45, end: 109.15, segments: [{ start: 35.45, end: 48.7 }, { start: 49.1, end: 55.5 }, { start: 56.5, end: 60.05 }, { start: 60.8, end: 62.0 }, { start: 62.65, end: 66.4 }, { start: 66.8, end: 69.85 }, { start: 70.5, end: 72.2 }, { start: 72.65, end: 73.95 }, { start: 74.6, end: 76.3 }, { start: 76.8, end: 80.2 }, { start: 80.6, end: 84.25 }, { start: 84.75, end: 90.95 }, { start: 91.85, end: 92.95 }, { start: 93.6, end: 103.45 }, { start: 104.15, end: 105.75 }, { start: 106.5, end: 109.15 }] },
          { start: 109.55, end: 175.65, segments: [{ start: 109.55, end: 117.3 }, { start: 118.15, end: 120.75 }, { start: 121.25, end: 122.15 }, { start: 122.85, end: 129.2 }, { start: 130.05, end: 134.25 }, { start: 134.85, end: 143.25 }, { start: 144.1, end: 146.9 }, { start: 147.55, end: 152.15 }, { start: 152.65, end: 154.15 }, { start: 154.7, end: 159.35 }, { start: 159.8, end: 172.4 }, { start: 173.4, end: 175.65 }] },
          { start: 176.4, end: 241.9, segments: [{ start: 176.4, end: 183.1 }, { start: 183.95, end: 186.2 }, { start: 186.7, end: 188.3 }, { start: 188.85, end: 192.6 }, { start: 193.15, end: 197.45 }, { start: 198.35, end: 202.85 }, { start: 203.3, end: 208.7 }, { start: 209.4, end: 210.3 }, { start: 211.0, end: 211.75 }, { start: 212.55, end: 215.95 }, { start: 216.4, end: 219.4 }, { start: 220.25, end: 231.1 }, { start: 231.9, end: 233.35 }, { start: 234.05, end: 236.7 }, { start: 237.25, end: 241.9 }] },
          { start: 242.35, end: 298.85, segments: [{ start: 242.35, end: 248.95 }, { start: 249.8, end: 252.95 }, { start: 253.45, end: 259.0 }, { start: 259.45, end: 263.8 }, { start: 264.65, end: 268.65 }, { start: 269.2, end: 275.4 }, { start: 276.3, end: 283.75 }, { start: 284.15, end: 289.8 }, { start: 290.3, end: 295.05 }, { start: 295.6, end: 298.85 }] },
          { start: 299.75, end: 308.7, segments: [{ start: 299.75, end: 306.5 }, { start: 306.95, end: 308.7 }] },
        ],
      },
      {
        audioSrc: "./audio/chapter 1.2 female (part 4).mp3",
        startParagraph: 32,
        paragraphs: [
          { start: 0, end: 51.6, segments: [{ start: 0, end: 3.95 }, { start: 4.85, end: 10.6 }, { start: 11.2, end: 13.4 }, { start: 13.9, end: 19.2 }, { start: 19.7, end: 20.55 }, { start: 21.7, end: 29.65 }, { start: 30.45, end: 37.9 }, { start: 38.7, end: 43.95 }, { start: 44.7, end: 47.75 }, { start: 48.4, end: 51.6 }] },
          { start: 52.9, end: 55.72, segments: [{ start: 52.9, end: 53.8 }, { start: 54.3, end: 55.72 }] },
        ],
      },
    ],
  },
  "1.3": {
    parts: [
      {
        audioSrc: "./audio/chapter 1.3 female (part 1).mp3",
        startParagraph: 0,
        paragraphs: [
          { start: 0, end: 51.25, segments: [{ start: 0, end: 3.1 }, { start: 3.5, end: 5.0 }, { start: 5.45, end: 10.9 }, { start: 11.55, end: 15.4 }, { start: 15.9, end: 17.35 }, { start: 17.8, end: 18.95 }, { start: 19.5, end: 26.45 }, { start: 27.2, end: 36.95 }, { start: 37.65, end: 51.25 }] },
          { start: 51.9, end: 54.9, segments: [{ start: 51.9, end: 53.25 }, { start: 53.8, end: 54.9 }] },
          { start: 55.55, end: 65.85, segments: [{ start: 55.55, end: 64.0 }, { start: 64.5, end: 65.85 }] },
          { start: 66.25, end: 74.65, segments: [{ start: 66.25, end: 68.9 }, { start: 70.15, end: 71.0 }, { start: 72.25, end: 72.8 }, { start: 73.7, end: 74.65 }] },
          { start: 75.2, end: 81.45, segments: [{ start: 75.2, end: 79.05 }, { start: 79.65, end: 81.45 }] },
          { start: 81.9, end: 117.8, segments: [{ start: 81.9, end: 91.7 }, { start: 92.15, end: 101.45 }, { start: 102.1, end: 117.8 }] },
          { start: 118.25, end: 150.05, segments: [{ start: 118.25, end: 121.35 }, { start: 121.85, end: 122.95 }, { start: 123.4, end: 128.4 }, { start: 129.15, end: 130.5 }, { start: 131.15, end: 135.4 }, { start: 135.9, end: 137.45 }, { start: 138.0, end: 144.65 }, { start: 145.2, end: 147.65 }, { start: 148.55, end: 150.05 }] },
          { start: 150.5, end: 198.2, segments: [{ start: 150.5, end: 162.2 }, { start: 162.75, end: 166.3 }, { start: 166.8, end: 170.6 }, { start: 171.0, end: 175.9 }, { start: 176.4, end: 177.1 }, { start: 177.9, end: 178.55 }, { start: 179.3, end: 180.65 }, { start: 181.35, end: 182.85 }, { start: 183.45, end: 188.5 }, { start: 189.05, end: 191.05 }, { start: 191.8, end: 193.45 }, { start: 194.05, end: 194.85 }, { start: 195.6, end: 198.2 }] },
          { start: 198.7, end: 206.85, segments: [{ start: 198.7, end: 202.55 }, { start: 202.95, end: 206.85 }] },
          { start: 207.5, end: 245.55, segments: [{ start: 207.5, end: 209.95 }, { start: 210.45, end: 223.1 }, { start: 224.05, end: 226.1 }, { start: 226.65, end: 228.15 }, { start: 228.8, end: 230.5 }, { start: 231.1, end: 232.6 }, { start: 233.1, end: 234.65 }, { start: 235.15, end: 237.05 }, { start: 237.7, end: 239.6 }, { start: 240.1, end: 243.55 }, { start: 244.65, end: 245.55 }] },
          { start: 246.0, end: 253.65, segments: [{ start: 246.0, end: 253.65 }] },
          { start: 254.3, end: 258.0, segments: [{ start: 254.3, end: 258.0 }] },
          { start: 258.5, end: 272.7, segments: [{ start: 258.5, end: 272.7 }] },
          { start: 273.2, end: 274.32, segments: [{ start: 273.2, end: 274.32 }] },
          { start: 273.2, end: 313.45, segments: [{ start: 273.2, end: 284.45 }, { start: 285.3, end: 287.55 }, { start: 288.0, end: 291.6 }, { start: 292.1, end: 313.45 }] },
          { start: 314.5, end: 338.21, segments: [{ start: 314.5, end: 316.15 }, { start: 316.65, end: 319.55 }, { start: 320.15, end: 324.9 }, { start: 325.5, end: 326.15 }, { start: 326.85, end: 327.8 }, { start: 328.45, end: 332.2 }, { start: 332.75, end: 333.7 }, { start: 334.55, end: 335.8 }, { start: 336.4, end: 338.21 }] },
        ],
      },
      {
        audioSrc: "./audio/chapter 1.3 female (part 2).mp3",
        startParagraph: 16,
        paragraphs: [
          { start: 0, end: 40.15, segments: [{ start: 0, end: 1.8 }, { start: 2.4, end: 4.25 }, { start: 4.85, end: 8.35 }, { start: 8.8, end: 14.65 }, { start: 15.2, end: 17.5 }, { start: 17.95, end: 23.7 }, { start: 24.75, end: 30.55 }, { start: 31.05, end: 31.8 }, { start: 32.4, end: 35.95 }, { start: 36.6, end: 40.15 }] },
          { start: 40.7, end: 96.05, segments: [{ start: 40.7, end: 47.15 }, { start: 47.6, end: 49.9 }, { start: 50.3, end: 56.95 }, { start: 57.55, end: 58.85 }, { start: 59.25, end: 60.55 }, { start: 61.15, end: 65.6 }, { start: 66.15, end: 68.0 }, { start: 68.65, end: 74.7 }, { start: 75.2, end: 81.45 }, { start: 82.0, end: 86.55 }, { start: 87.3, end: 87.95 }, { start: 88.75, end: 89.65 }, { start: 91.0, end: 96.05 }] },
          { start: 96.55, end: 97.35, segments: [{ start: 96.55, end: 97.35 }] },
          { start: 96.55, end: 97.35, segments: [{ start: 96.55, end: 97.35 }] },
          { start: 96.55, end: 145.95, segments: [{ start: 96.55, end: 104.55 }, { start: 105.3, end: 107.35 }, { start: 107.9, end: 111.9 }, { start: 112.5, end: 117.05 }, { start: 117.5, end: 119.45 }, { start: 119.9, end: 123.7 }, { start: 124.3, end: 131.65 }, { start: 132.15, end: 143.0 }, { start: 143.8, end: 145.95 }] },
          { start: 146.45, end: 179.1, segments: [{ start: 146.45, end: 152.65 }, { start: 153.25, end: 156.4 }, { start: 156.8, end: 162.55 }, { start: 163.05, end: 164.1 }, { start: 164.6, end: 165.5 }, { start: 166.15, end: 168.35 }, { start: 168.9, end: 172.25 }, { start: 172.65, end: 176.8 }, { start: 177.25, end: 179.1 }] },
          { start: 179.55, end: 214.13, segments: [{ start: 179.55, end: 183.05 }, { start: 183.55, end: 187.85 }, { start: 188.45, end: 192.45 }, { start: 193.0, end: 196.45 }, { start: 196.85, end: 199.4 }, { start: 200.1, end: 200.75 }, { start: 201.5, end: 202.3 }, { start: 202.95, end: 209.85 }, { start: 210.6, end: 214.13 }] },
          { start: 214.13, end: 214.63, segments: [{ start: 214.13, end: 214.63 }] },
        ],
      },
    ],
  },
};
