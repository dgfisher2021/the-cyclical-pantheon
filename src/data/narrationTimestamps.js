/**
 * Narration timestamps for audio read-along, derived from audio analysis.
 *
 * Each paragraph has `segments` — sub-segments corresponding to sentence/clause
 * boundaries detected via silence analysis. Words are distributed proportionally
 * across segments for accurate karaoke-style highlighting.
 */
export const narrationData = {
  "1.0": {
    audioSrc: "./audio/prologue.mp3",
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
};
