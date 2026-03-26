import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Hook that drives multi-part narration audio with sequential playback.
 *
 * `parts` is an array of { audioSrc, paragraphs, startParagraph }.
 * Parts play sequentially — when one ends, the next starts automatically.
 * When all parts finish, `onChapterComplete` is called so the parent can
 * auto-advance to the next chapter.
 */
export function useNarration(parts, onChapterComplete) {
  const audiosRef = useRef([]);
  const [activePart, setActivePart] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durations, setDurations] = useState([]);
  const [playbackRate, setPlaybackRate] = useState(1);
  const rafRef = useRef(null);
  const onCompleteRef = useRef(onChapterComplete);
  onCompleteRef.current = onChapterComplete;

  // Track parts identity to detect chapter changes
  const partsRef = useRef(parts);

  // When parts change (new chapter), reset state and create new audio elements
  useEffect(() => {
    const wasPlaying = playing && partsRef.current !== parts;
    partsRef.current = parts;

    // Stop everything from previous chapter
    audiosRef.current.forEach((a) => a.pause());
    cancelAnimationFrame(rafRef.current);

    if (!parts || parts.length === 0) {
      audiosRef.current = [];
      setDurations([]);
      setActivePart(0);
      setCurrentTime(0);
      return;
    }

    const audios = parts.map((p) => new Audio(p.audioSrc));
    audiosRef.current = audios;

    const durs = new Array(parts.length).fill(0);
    let loaded = 0;

    audios.forEach((audio, i) => {
      const onMeta = () => {
        durs[i] = audio.duration;
        loaded++;
        if (loaded === audios.length) setDurations([...durs]);
      };
      audio.addEventListener("loadedmetadata", onMeta);
    });

    setActivePart(0);
    setCurrentTime(0);

    // If we were playing and switched chapters (auto-advance), start playing new chapter
    if (wasPlaying) {
      // Small delay to let audio load
      const startTimer = setTimeout(() => {
        if (audios[0]) {
          audios[0].play().catch(() => {});
          setPlaying(true);
        }
      }, 200);
      return () => {
        clearTimeout(startTimer);
        audios.forEach((a) => a.pause());
        cancelAnimationFrame(rafRef.current);
      };
    }

    return () => {
      audios.forEach((a) => a.pause());
      cancelAnimationFrame(rafRef.current);
    };
  }, [parts]);

  // Handle end of part — advance to next part or signal chapter complete
  useEffect(() => {
    if (!parts || parts.length === 0) return;

    const audios = audiosRef.current;
    const handlers = audios.map((audio, i) => {
      const onEnded = () => {
        if (i < parts.length - 1) {
          setActivePart(i + 1);
          setCurrentTime(0);
          audios[i + 1].currentTime = 0;
          audios[i + 1].play();
        } else {
          // All parts done — signal chapter complete
          setPlaying(false);
          setActivePart(0);
          setCurrentTime(0);
          onCompleteRef.current?.();
        }
      };
      audio.addEventListener("ended", onEnded);
      return () => audio.removeEventListener("ended", onEnded);
    });

    return () => handlers.forEach((cleanup) => cleanup());
  }, [parts]);

  // RAF loop
  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = () => {
      const audio = audiosRef.current[activePart];
      if (audio) setCurrentTime(audio.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, activePart]);

  // Apply playback rate to all audio elements
  useEffect(() => {
    audiosRef.current.forEach((a) => {
      a.playbackRate = playbackRate;
    });
  }, [playbackRate]);

  const RATES = [0.75, 1, 1.25, 1.5, 1.75, 2];
  const cycleRate = useCallback(() => {
    setPlaybackRate((prev) => {
      const idx = RATES.indexOf(prev);
      const next = RATES[(idx + 1) % RATES.length];
      audiosRef.current.forEach((a) => {
        a.playbackRate = next;
      });
      return next;
    });
  }, []);

  const setRate = useCallback((rate) => {
    const clamped = Math.round(Math.max(0.5, Math.min(2.5, rate)) * 100) / 100;
    setPlaybackRate(clamped);
    audiosRef.current.forEach((a) => {
      a.playbackRate = clamped;
    });
  }, []);

  const totalDuration = durations.reduce((a, b) => a + b, 0);

  const elapsedBefore = durations
    .slice(0, activePart)
    .reduce((a, b) => a + b, 0);
  const globalTime = elapsedBefore + currentTime;

  const toggle = useCallback(() => {
    const audio = audiosRef.current[activePart];
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }, [playing, activePart]);

  const seek = useCallback(
    (globalT) => {
      if (durations.length === 0) return;

      let cumulative = 0;
      for (let i = 0; i < durations.length; i++) {
        if (globalT < cumulative + durations[i] || i === durations.length - 1) {
          const localTime = Math.max(0, globalT - cumulative);

          if (i !== activePart) {
            audiosRef.current[activePart].pause();
            setActivePart(i);
            audiosRef.current[i].currentTime = localTime;
            if (playing) audiosRef.current[i].play();
          } else {
            audiosRef.current[i].currentTime = localTime;
          }

          setCurrentTime(localTime);
          return;
        }
        cumulative += durations[i];
      }
    },
    [durations, activePart, playing],
  );

  const stop = useCallback(() => {
    audiosRef.current[activePart]?.pause();
    setPlaying(false);
    setActivePart(0);
    setCurrentTime(0);
  }, [activePart]);

  return {
    playing,
    activePart,
    currentTime,
    globalTime,
    totalDuration,
    playbackRate,
    toggle,
    seek,
    stop,
    cycleRate,
    setRate,
  };
}
