import { useState, useCallback } from "react";
import { chapterOrder } from "../data/storyMeta";

const STORAGE_KEY = "pantheon-reading-progress";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lastChapter: null, completedChapters: [] };
    return JSON.parse(raw);
  } catch {
    return { lastChapter: null, completedChapters: [] };
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* localStorage unavailable */
  }
}

export function useReadingProgress() {
  const [progress, setProgress] = useState(loadProgress);

  const markComplete = useCallback((chapterId) => {
    setProgress((prev) => {
      const completed = prev.completedChapters.includes(chapterId)
        ? prev.completedChapters
        : [...prev.completedChapters, chapterId];
      const next = {
        ...prev,
        completedChapters: completed,
        lastChapter: chapterId,
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const setLast = useCallback((chapterId) => {
    setProgress((prev) => {
      const next = { ...prev, lastChapter: chapterId };
      saveProgress(next);
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (chapterId) => {
      return progress.completedChapters.includes(chapterId);
    },
    [progress.completedChapters],
  );

  const completionPct = progress.completedChapters.length / chapterOrder.length;

  return { progress, markComplete, setLast, isComplete, completionPct };
}
