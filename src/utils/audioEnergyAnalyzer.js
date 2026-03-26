/**
 * Runtime audio energy analysis using the Web Audio API.
 *
 * Decodes audio files in the browser to detect fine-grained silence boundaries
 * within existing coarse narration segments. This splits long segments into
 * shorter sub-segments for more accurate word-level highlighting.
 */

const WINDOW_MS = 30; // RMS energy window size
const MIN_SILENCE_MS = 120; // minimum silence gap to split on
const MIN_SEGMENT_MS = 400; // don't create sub-segments shorter than this
const SILENCE_THRESHOLD_RATIO = 0.08; // fraction of peak RMS to consider silence

// Cache decoded energy profiles so we don't re-fetch/decode on every paragraph
const energyCache = new Map();

/**
 * Fetch and decode an audio file, returning the raw PCM samples (mono).
 */
async function decodeAudio(url, signal) {
  if (energyCache.has(url)) return energyCache.get(url);

  const response = await fetch(url, { signal });
  const arrayBuffer = await response.arrayBuffer();

  const audioCtx = new OfflineAudioContext(1, 1, 44100);
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  const samples = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;

  const result = { samples, sampleRate };
  energyCache.set(url, result);
  return result;
}

/**
 * Compute RMS energy profile in fixed-size windows.
 * Returns an array of { time, rms } entries.
 */
function computeEnergyProfile(samples, sampleRate) {
  const windowSamples = Math.floor((WINDOW_MS / 1000) * sampleRate);
  const profile = [];

  for (let i = 0; i < samples.length; i += windowSamples) {
    const end = Math.min(i + windowSamples, samples.length);
    let sumSq = 0;
    for (let j = i; j < end; j++) {
      sumSq += samples[j] * samples[j];
    }
    const rms = Math.sqrt(sumSq / (end - i));
    profile.push({
      time: i / sampleRate,
      rms,
    });
  }

  return profile;
}

/**
 * Find silence regions within a time range using the energy profile.
 * Returns array of { start, end } silence intervals.
 */
function findSilences(profile, startTime, endTime, threshold) {
  const windowDuration = WINDOW_MS / 1000;
  const silences = [];
  let silenceStart = null;

  for (const entry of profile) {
    if (entry.time < startTime - windowDuration) continue;
    if (entry.time > endTime) break;

    if (entry.rms < threshold) {
      if (silenceStart === null) silenceStart = entry.time;
    } else {
      if (silenceStart !== null) {
        const silenceEnd = entry.time;
        const duration = (silenceEnd - silenceStart) * 1000;
        if (duration >= MIN_SILENCE_MS) {
          silences.push({ start: silenceStart, end: silenceEnd });
        }
        silenceStart = null;
      }
    }
  }

  // Close trailing silence
  if (silenceStart !== null) {
    const duration = (endTime - silenceStart) * 1000;
    if (duration >= MIN_SILENCE_MS) {
      silences.push({ start: silenceStart, end: endTime });
    }
  }

  return silences;
}

/**
 * Split a single coarse segment into finer sub-segments at detected silences.
 */
function splitSegment(segment, profile, threshold) {
  const silences = findSilences(profile, segment.start, segment.end, threshold);

  if (silences.length === 0) return [segment];

  const subSegments = [];
  let currentStart = segment.start;

  for (const silence of silences) {
    const before = { start: currentStart, end: silence.start };
    const beforeMs = (before.end - before.start) * 1000;

    if (beforeMs >= MIN_SEGMENT_MS) {
      subSegments.push(before);
    } else if (subSegments.length > 0) {
      // Merge short segment into previous
      subSegments[subSegments.length - 1].end = silence.start;
    } else {
      subSegments.push(before);
    }

    currentStart = silence.end;
  }

  // Trailing segment after last silence
  if (currentStart < segment.end) {
    const trailing = { start: currentStart, end: segment.end };
    const trailingMs = (trailing.end - trailing.start) * 1000;

    if (trailingMs >= MIN_SEGMENT_MS) {
      subSegments.push(trailing);
    } else if (subSegments.length > 0) {
      subSegments[subSegments.length - 1].end = segment.end;
    } else {
      subSegments.push(trailing);
    }
  }

  return subSegments.length > 0 ? subSegments : [segment];
}

/**
 * Analyze narration parts and return enhanced segment timings.
 *
 * @param {Array} parts - narrationData parts array, each with
 *   { audioSrc, paragraphs: [{ start, end, segments }], startParagraph }
 * @param {AbortSignal} signal - optional AbortSignal for cancellation
 * @returns {Map} paragraphIndex → enhanced segments array
 */
export async function analyzeAudioParts(parts, signal) {
  const enhanced = new Map();

  for (const part of parts) {
    if (signal?.aborted) return enhanced;

    let decoded;
    try {
      decoded = await decodeAudio(part.audioSrc, signal);
    } catch (e) {
      if (e.name === "AbortError") return enhanced;
      console.warn("[audioEnergy] Failed to decode", part.audioSrc, e);
      continue;
    }

    const profile = computeEnergyProfile(decoded.samples, decoded.sampleRate);

    // Compute adaptive threshold from peak energy in this audio
    const peakRms = Math.max(...profile.map((p) => p.rms), 0.001);
    const threshold = peakRms * SILENCE_THRESHOLD_RATIO;

    let totalOriginal = 0;
    let totalEnhanced = 0;

    part.paragraphs.forEach((para, j) => {
      if (signal?.aborted) return;

      const paraIdx = part.startParagraph + j;
      const segments = para.segments;

      if (!segments || segments.length === 0) {
        enhanced.set(paraIdx, [{ start: para.start, end: para.end }]);
        return;
      }

      const subSegments = [];
      for (const seg of segments) {
        const split = splitSegment(seg, profile, threshold);
        subSegments.push(...split);
      }

      totalOriginal += segments.length;
      totalEnhanced += subSegments.length;

      // Only use enhanced segments if we actually found more detail
      if (subSegments.length > segments.length) {
        enhanced.set(paraIdx, subSegments);
      }
    });

    console.log(
      `[audioEnergy] ${part.audioSrc}: ${totalOriginal} → ${totalEnhanced} segments`,
    );
  }

  return enhanced;
}
