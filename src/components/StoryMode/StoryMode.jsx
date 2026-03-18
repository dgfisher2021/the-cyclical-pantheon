import { useState, useCallback } from "react";
import { chapterOrder } from "../../data/storyMeta";
import { useReadingProgress } from "../../hooks/useReadingProgress";
import StoryProgress from "./StoryProgress";
import StoryNav from "./StoryNav";
import StoryChapter from "./StoryChapter";

export default function StoryMode({ initialChapterId, onOpenWheel, isMobile }) {
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

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingLeft: isMobile ? 0 : "240px",
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
      />
    </div>
  );
}
