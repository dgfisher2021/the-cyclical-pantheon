/**
 * Syllable-aware word weight estimation for narration highlighting.
 *
 * Replaces simple character-length weighting with phonetic-aware estimates
 * so function words ("the", "a") advance faster than content words
 * ("extraordinary", "illuminated").
 */

const FUNCTION_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "of",
  "for",
  "by",
  "is",
  "it",
  "as",
  "if",
  "so",
  "no",
  "do",
  "be",
  "he",
  "we",
  "me",
  "my",
  "up",
  "am",
  "was",
  "had",
  "has",
  "its",
  "his",
  "her",
  "not",
  "nor",
  "yet",
  "all",
  "are",
  "did",
  "who",
  "may",
  "can",
  "our",
  "out",
  "own",
  "too",
  "with",
  "from",
  "into",
  "that",
  "this",
  "them",
  "they",
  "than",
  "then",
  "were",
  "been",
  "each",
  "will",
  "would",
  "could",
  "should",
  "which",
  "their",
  "there",
  "these",
  "those",
  "about",
  "after",
]);

/**
 * Estimate syllable count for a word using vowel-cluster heuristics.
 * Not perfect, but good enough for relative weighting.
 */
export function countSyllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 2) return 1;

  let count = 0;
  let prevVowel = false;

  for (let i = 0; i < w.length; i++) {
    const isVowel = "aeiouy".includes(w[i]);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }

  // Silent-e at end (but not "le" which is its own syllable)
  if (w.endsWith("e") && !w.endsWith("le") && count > 1) count--;

  // Common suffixes that don't add a syllable
  if (w.endsWith("ed") && !w.endsWith("ted") && !w.endsWith("ded")) {
    if (count > 1) count--;
  }

  // "-es" usually not a separate syllable except after sibilants
  if (
    w.endsWith("es") &&
    !w.endsWith("ses") &&
    !w.endsWith("zes") &&
    !w.endsWith("xes") &&
    !w.endsWith("ches") &&
    !w.endsWith("shes")
  ) {
    if (count > 1) count--;
  }

  return Math.max(1, count);
}

/**
 * Estimate relative speaking duration weight for a single word.
 * Takes the raw word token (may include trailing punctuation).
 */
export function estimateWordWeight(rawWord) {
  const bare = rawWord.replace(/[^a-zA-Z']/g, "");
  const syllables = countSyllables(bare);

  // Base weight from syllables
  let weight = syllables;

  // Function words are spoken ~40% faster
  if (FUNCTION_WORDS.has(bare.toLowerCase())) {
    weight *= 0.6;
  }

  // Punctuation pauses: trailing comma, semicolon, colon add a micro-pause
  if (/[,;:]$/.test(rawWord)) {
    weight += 0.3;
  }
  // Period, exclamation, question mark — longer pause
  if (/[.!?]$/.test(rawWord)) {
    weight += 0.5;
  }
  // Em-dash or ellipsis
  if (/[—…]/.test(rawWord) || rawWord.includes("--")) {
    weight += 0.4;
  }

  return Math.max(0.3, weight);
}

/**
 * Compute an array of speaking-duration weights for a list of words.
 * Words should be raw tokens (with punctuation attached).
 */
export function computeWordWeights(words) {
  return words.map((w) => estimateWordWeight(w));
}
