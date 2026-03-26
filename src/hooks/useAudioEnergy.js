import { useState, useEffect, useRef } from "react";
import { analyzeAudioParts } from "../utils/audioEnergyAnalyzer";

/**
 * React hook that runs audio energy analysis on narration parts.
 * Returns enhanced segment timings once analysis is complete, or null while
 * analyzing (allowing graceful fallback to coarse segments).
 */
export function useAudioEnergy(parts) {
  const [enhancedTimings, setEnhancedTimings] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const partsRef = useRef(null);

  useEffect(() => {
    // Reset when parts change (new chapter)
    if (parts === partsRef.current) return;
    partsRef.current = parts;
    setEnhancedTimings(null);

    if (!parts || parts.length === 0) {
      setAnalyzing(false);
      return;
    }

    const controller = new AbortController();
    setAnalyzing(true);

    analyzeAudioParts(parts, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          setEnhancedTimings(result.size > 0 ? result : null);
          setAnalyzing(false);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.warn("[useAudioEnergy] Analysis failed:", err);
        }
        if (!controller.signal.aborted) {
          setAnalyzing(false);
        }
      });

    return () => controller.abort();
  }, [parts]);

  return { enhancedTimings, analyzing };
}
