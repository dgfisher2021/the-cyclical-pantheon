import { useState, useCallback, useMemo, useEffect } from "react";
import { chapterOrder } from "../../data/storyMeta";
import { narrationData } from "../../data/narrationTimestamps";
import { useReadingProgress } from "../../hooks/useReadingProgress";
import { useNarration } from "../../hooks/useNarration";
import StoryProgress from "./StoryProgress";
import StoryNav from "./StoryNav";
import StoryChapter from "./StoryChapter";
import NarrationBar from "./NarrationBar";

/**
 * Find the next chapter (after `chapterId`) that has narration data.
 * Returns null if none found.
 */
function getNextNarratedChapter(chapterId) {
  const idx = chapterOrder.indexOf(chapterId);
  for (let i = idx + 1; i < chapterOrder.length; i++) {
    if (narrationData[chapterOrder[i]]) return chapterOrder[i];
  }
  return null;
}

export default function StoryMode({ initialChapterId, autoplay, onOpenWheel, isMobile }) {
  const { progress, markComplete, setLast, isComplete, completionPct } =
    useReadingProgress();

  const [currentChapterId, setCurrentChapterId] = useState(() => {
    if (initialChapterId) return initialChapterId;
    if (progress.lastChapter) return progress.lastChapter;
    return chapterOrder[0];
  });

  const handleSelectChapter = useCallback(
    (id) => {
      setCurrentChapterId(id);
      setLast(id);
    },
    [setLast],
  );

  const handleMarkComplete = useCallback(
    (id) => {
      markComplete(id);
      setLast(id);
    },
    [markComplete, setLast],
  );

  // --- Narration (persistent across chapters) ---
  const narration = narrationData[currentChapterId];
  const narrationParts = narration?.parts || null;

  // When all parts of a chapter finish, auto-advance to next narrated chapter
  const handleChapterNarrationComplete = useCallback(() => {
    const next = getNextNarratedChapter(currentChapterId);
    if (next) {
      setCurrentChapterId(next);
      setLast(next);
    }
  }, [currentChapterId, setLast]);

  const {
    playing, activePart, currentTime, globalTime, totalDuration,
    toggle, seek, stop,
  } = useNarration(narrationParts, handleChapterNarrationComplete);

  const isNarrating = playing || globalTime > 0;

  // Autoplay on mount if requested (e.g. "Listen to the Story" from wheel)
  const [didAutoplay, setDidAutoplay] = useState(false);
  useEffect(() => {
    if (autoplay && !didAutoplay && narrationParts && totalDuration > 0) {
      toggle();
      setDidAutoplay(true);
    }
  }, [autoplay, didAutoplay, narrationParts, totalDuration, toggle]);

  // Build timing map for current chapter
  const paraTimingMap = useMemo(() => {
    if (!narrationParts) return null;
    const map = new Map();
    for (let pi = 0; pi < narrationParts.length; pi++) {
      const part = narrationParts[pi];
      part.paragraphs.forEach((paraTime, j) => {
        map.set(part.startParagraph + j, { partIdx: pi, paraTime });
      });
    }
    return map;
  }, [narrationParts]);

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingLeft: isMobile ? 0 : "240px",
        paddingBottom: narration ? "64px" : 0,
      }}
    >
      <StoryProgress
        completionPct={completionPct}
        onBackToWheel={() => onOpenWheel()}
      />

      <StoryNav
        currentChapterId={currentChapterId}
        onSelectChapter={handleSelectChapter}
        isComplete={isComplete}
        isMobile={isMobile}
      />

      <StoryChapter
        chapterId={currentChapterId}
        onSelectChapter={handleSelectChapter}
        onOpenWheel={onOpenWheel}
        onMarkComplete={handleMarkComplete}
        isMobile={isMobile}
        narrationState={
          narration
            ? { isNarrating, activePart, currentTime, paraTimingMap }
            : null
        }
      />

      {/* Persistent narration bar — fixed at bottom */}
      {narration && (
        <NarrationBar
          playing={playing}
          globalTime={globalTime}
          totalDuration={totalDuration}
          chapterId={currentChapterId}
          onToggle={toggle}
          onSeek={seek}
          onStop={stop}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}
