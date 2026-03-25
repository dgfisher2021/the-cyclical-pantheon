/**
 * Narration timestamps for audio read-along.
 *
 * Each entry maps a chapter ID to its audio file and paragraph timing.
 * `paragraphs` indices correspond to the paragraph blocks in storyChapters
 * (skipping "break" blocks). `start` and `end` are in seconds.
 *
 * Words within each paragraph are evenly interpolated between start/end,
 * giving a karaoke-style word highlight. Adjust times to match the actual
 * narration pacing.
 */
export const narrationData = {
  "1.0": {
    audioSrc: "./audio/prologue.mp3",
    // Each entry corresponds to a paragraph block (breaks are skipped).
    // Tweak start/end to sync with the actual recording.
    paragraphs: [
      { start: 0, end: 14 },     // "Before there were stars..."
      { start: 14, end: 38 },    // "Light rose, and the cosmos opened its eyes..."
      { start: 38, end: 72 },    // "No dawn. No dusk. Just the switch..."
      { start: 72, end: 104 },   // "In the light, things could be seen..."
      { start: 104, end: 120 },  // "It was in the light..."
    ],
  },
};
