import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Hook that drives multi-part narration audio with sequential playback.
 *
 * `parts` is an array of { audioSrc, paragraphs, startParagraph }.
 * Parts play sequentially — when one ends, the next starts automatically.
 *
 * Returns the currently active part index, current time within that part,
 * total duration across all parts, and combined progress for the seekbar.
 */
export function useNarration(parts) {
  const audiosRef = useRef([]);
  const [activePart, setActivePart] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durations, setDurations] = useState([]);
  const rafRef = useRef(null);

  // Create audio elements for all parts
  useEffect(() => {
    if (!parts || parts.length === 0) return;

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

    return () => {
      audios.forEach((a) => a.pause());
      cancelAnimationFrame(rafRef.current);
    };
  }, [parts]);

  // Handle end of part — advance to next or stop
  useEffect(() => {
    if (!parts || parts.length === 0) return;

    const audios = audiosRef.current;
    const handlers = audios.map((audio, i) => {
      const onEnded = () => {
        if (i < parts.length - 1) {
          // Advance to next part
          setActivePart(i + 1);
          setCurrentTime(0);
          audios[i + 1].currentTime = 0;
          audios[i + 1].play();
        } else {
          // All parts done
          setPlaying(false);
          setActivePart(0);
          setCurrentTime(0);
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

  const totalDuration = durations.reduce((a, b) => a + b, 0);

  // Combined progress across all parts (for seekbar)
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

      // Find which part this global time falls in
      let cumulative = 0;
      for (let i = 0; i < durations.length; i++) {
        if (globalT < cumulative + durations[i] || i === durations.length - 1) {
          const localTime = Math.max(0, globalT - cumulative);

          // If switching parts, pause old, set new
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

  return {
    playing,
    activePart,
    currentTime,
    globalTime,
    totalDuration,
    toggle,
    seek,
  };
}
