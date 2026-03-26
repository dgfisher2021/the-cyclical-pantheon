import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import {
  chapters,
  getAdjacentChapter,
  getReadTime,
  acts,
} from "../../data/storyMeta";
import { storyChapters } from "../../data/storyChapters";
import { godByName } from "../../data/gods";
import { fonts, godColor, goldAlpha, whiteAlpha } from "../../styles/theme";
import SectionDivider from "../shared/SectionDivider";
import GodMention from "./GodMention";
import { narrationData } from "../../data/narrationTimestamps";

const GOD_PATTERN =
  /\b(Destruction|Creation|Oblivion|Darkness|Division|Eternity|Growth|Chaos|Light|Order|Unity|Decay)\b/g;
const GOD_SET = new Set([
  "Destruction","Creation","Oblivion","Darkness","Division",
  "Eternity","Growth","Chaos","Light","Order","Unity","Decay",
]);

function renderTextWithGodMentions(text, onOpenWheel) {
  const parts = [];
  let lastIndex = 0;
  let match;
  GOD_PATTERN.lastIndex = 0;
  while ((match = GOD_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <GodMention
        key={`${match.index}-${match[1]}`}
        name={match[1]}
        onOpenWheel={onOpenWheel}
      />,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

/**
 * Split paragraph text into word tokens, preserving whitespace and marking
 * god-name words so they still render as interactive GodMention components.
 */
function tokenizeText(text) {
  // Split into words keeping whitespace attached to the preceding word
  const raw = text.match(/\S+\s*/g) || [];
  return raw.map((tok) => {
    const word = tok.trimEnd();
    // Strip punctuation for god-name matching
    const bare = word.replace(/[^a-zA-Z]/g, "");
    return { raw: tok, word, isGod: GOD_SET.has(bare), godName: GOD_SET.has(bare) ? bare : null };
  });
}

/**
 * Render a paragraph with word-level narration highlighting.
 * `activeWordIndex` = how many words into this paragraph the narration has reached.
 * -1 means paragraph hasn't started, Infinity means fully read.
 */
function NarrationParagraph({ text, activeWordIndex, onOpenWheel, isNarrating }) {
  const tokens = useMemo(() => tokenizeText(text), [text]);

  return tokens.map((tok, i) => {
    const spoken = isNarrating && i <= activeWordIndex;
    const isCurrent = isNarrating && i === activeWordIndex;

    if (tok.isGod) {
      return (
        <span
          key={i}
          style={{
            opacity: isNarrating ? (spoken ? 1 : 0.3) : 1,
            transition: "opacity 0.15s",
          }}
        >
          <GodMention name={tok.godName} onOpenWheel={onOpenWheel} />
          {tok.raw.slice(tok.word.length)}
        </span>
      );
    }

    return (
      <span
        key={i}
        style={{
          color: isCurrent
            ? "rgba(255,255,255,1)"
            : spoken
              ? "rgba(255,255,255,0.85)"
              : isNarrating
                ? "rgba(255,255,255,0.25)"
                : undefined,
          textShadow: isCurrent ? `0 0 8px ${goldAlpha(0.4)}` : undefined,
          transition: "color 0.15s, text-shadow 0.15s",
        }}
      >
        {tok.raw}
      </span>
    );
  });
}

/**
 * Given narration timing (with sub-segments) for a paragraph and the current
 * audio time, compute which word index is active (-1 = not started).
 *
 * Words are distributed across sub-segments proportionally to each segment's
 * duration, so highlighting stays tight to the actual narration pacing.
 */
function getActiveWordIndex(paraTime, currentTime, wordCount) {
  if (!paraTime || currentTime < paraTime.start) return -1;
  if (currentTime >= paraTime.end) return wordCount;

  const segs = paraTime.segments;
  if (!segs || segs.length === 0) {
    // Fallback: simple linear interpolation across entire paragraph
    const progress = (currentTime - paraTime.start) / (paraTime.end - paraTime.start);
    return Math.floor(progress * wordCount);
  }

  // Distribute words across segments proportional to duration
  const totalTime = segs.reduce((sum, s) => sum + (s.end - s.start), 0);
  const segWordCounts = segs.map((s, i) => {
    const frac = (s.end - s.start) / totalTime;
    return Math.round(frac * wordCount);
  });
  // Fix rounding errors on last segment
  const assigned = segWordCounts.reduce((a, b) => a + b, 0);
  segWordCounts[segWordCounts.length - 1] += wordCount - assigned;

  let wordOffset = 0;
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i];
    const wc = segWordCounts[i];

    if (currentTime < seg.start) {
      // In a gap between segments — hold at the last word of previous segment
      return wordOffset - 1;
    }
    if (currentTime >= seg.start && currentTime < seg.end) {
      const progress = (currentTime - seg.start) / (seg.end - seg.start);
      return wordOffset + Math.floor(progress * wc);
    }
    wordOffset += wc;
  }

  return wordCount;
}

export default function StoryChapter({
  chapterId,
  onSelectChapter,
  onOpenWheel,
  onMarkComplete,
  isMobile,
  narrationState,
}) {
  const chapter = chapters[chapterId];
  const content = storyChapters[chapterId];
  const prev = getAdjacentChapter(chapterId, -1);
  const next = getAdjacentChapter(chapterId, 1);
  const scrollRef = useRef(null);
  const act = acts.find((a) => a.id === chapter.act);
  const isEpilogue = chapterId.startsWith("E");

  // Narration state from parent (StoryMode)
  const isNarrating = narrationState?.isNarrating || false;
  const activePart = narrationState?.activePart ?? 0;
  const currentTime = narrationState?.currentTime ?? 0;
  const paraTimingMap = narrationState?.paraTimingMap || null;
  const narration = narrationData[chapterId];

  // Build paragraph index mapping (skip breaks)
  const paraIndexMap = useMemo(() => {
    if (!narration) return null;
    const map = new Map();
    let pi = 0;
    content?.forEach((block, i) => {
      if (block.type === "paragraph" || block.type === "italic") {
        map.set(i, pi);
        pi++;
      }
    });
    return map;
  }, [narration, content]);

  // Build set of content block indices where a new narrator part begins
  const partTransitions = useMemo(() => {
    if (!narration || !paraIndexMap) return new Map();
    const transitions = new Map(); // contentBlockIdx → part info
    const parts = narration.parts;
    for (let p = 1; p < parts.length; p++) {
      const startPi = parts[p].startParagraph;
      // Find the content block index for this paragraph index
      for (const [blockIdx, pi] of paraIndexMap) {
        if (pi === startPi) {
          const src = parts[p].audioSrc || "";
          const prevSrc = parts[p - 1].audioSrc || "";
          const isFemale = src.includes("female");
          const isMale = src.includes("male");
          const wasFemale = prevSrc.includes("female");
          const wasMale = prevSrc.includes("male");
          // Only show indicator when narrator gender changes
          if ((isFemale && wasMale) || (isMale && wasFemale)) {
            transitions.set(blockIdx, {
              narrator: isFemale ? "Her voice" : "His voice",
            });
          }
          break;
        }
      }
    }
    return transitions;
  }, [narration, paraIndexMap]);

  // Auto-scroll to active paragraph, with user-scroll-ahead detection
  const paraRefs = useRef({});
  const [userScrolledAway, setUserScrolledAway] = useState(false);
  const isAutoScrolling = useRef(false);
  const activeParaRef = useRef(null);

  // Track user scroll — if they scroll away from the active paragraph, pause auto-scroll
  useEffect(() => {
    if (!isNarrating) {
      setUserScrolledAway(false);
      return;
    }
    const onScroll = () => {
      if (isAutoScrolling.current) return; // ignore programmatic scrolls
      if (!activeParaRef.current) return;
      const rect = activeParaRef.current.getBoundingClientRect();
      const inView = rect.top > -100 && rect.bottom < window.innerHeight + 100;
      if (!inView) setUserScrolledAway(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isNarrating]);

  const scrollToNarration = useCallback(() => {
    setUserScrolledAway(false);
    if (activeParaRef.current) {
      isAutoScrolling.current = true;
      activeParaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => { isAutoScrolling.current = false; }, 1000);
    }
  }, []);

  useEffect(() => {
    if (!isNarrating || !paraTimingMap || userScrolledAway) return;
    for (const [paraIdx, { partIdx, paraTime }] of paraTimingMap) {
      if (partIdx === activePart && currentTime >= paraTime.start && currentTime < paraTime.end) {
        const el = paraRefs.current[paraIdx];
        if (el) {
          activeParaRef.current = el;
          isAutoScrolling.current = true;
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => { isAutoScrolling.current = false; }, 1000);
        }
        break;
      }
    }
  }, [isNarrating, paraTimingMap, activePart, userScrolledAway, Math.floor(currentTime / 2)]);

  useEffect(() => {
    window.scrollTo(0, 0);
    onMarkComplete?.(chapterId);
  }, [chapterId, onMarkComplete]);

  // Swipe support for mobile
  const touchStart = useRef(null);
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(diff) > 80) {
      if (diff > 0 && prev) onSelectChapter(prev.id);
      else if (diff < 0 && next) onSelectChapter(next.id);
    }
  };

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft" && prev) onSelectChapter(prev.id);
      if (e.key === "ArrowRight" && next) onSelectChapter(next.id);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onSelectChapter]);

  if (!chapter || !content) return null;

  return (
    <div
      ref={scrollRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: isMobile ? "60px 24px 40px" : "60px 40px 40px",
      }}
    >
      {/* Chapter header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: "11px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: goldAlpha(0.35),
            marginBottom: "8px",
          }}
        >
          Act {chapter.act} &middot; {act?.title}
        </p>
        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: "10px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: whiteAlpha(0.25),
            marginBottom: "8px",
          }}
        >
          {getReadTime(chapterId, storyChapters)} min read
        </p>

        {isEpilogue && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {[
              godByName["Darkness"],
              godByName["Decay"],
              godByName["Oblivion"],
            ].map(
              (g) =>
                g && (
                  <div
                    key={g.name}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: g.glow,
                      boxShadow: `0 0 10px ${g.glow}40`,
                    }}
                  />
                ),
            )}
          </div>
        )}

        <h2
          style={{
            fontFamily: fonts.display,
            fontSize: isMobile ? "20px" : "24px",
            fontWeight: 700,
            color: goldAlpha(0.7),
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "12px",
            lineHeight: "1.4",
          }}
        >
          {chapter.title}
        </h2>
        <p
          style={{
            color: goldAlpha(0.2),
            fontSize: "16px",
            letterSpacing: "8px",
            marginBottom: "14px",
          }}
        >
          &#10022;
        </p>

        {/* Featured gods with color orbs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "8px",
          }}
        >
          {chapter.gods.slice(0, 6).map((name) => {
            const g = godByName[name];
            return (
              g && (
                <span
                  key={name}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontFamily: fonts.heading,
                    fontSize: "10px",
                    letterSpacing: "1px",
                    color: godColor(g, 0.5),
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: g.glow,
                      boxShadow: `0 0 6px ${g.glow}40`,
                    }}
                  />
                  {name}
                </span>
              )
            );
          })}
          {chapter.gods.length > 6 && (
            <span
              style={{
                fontFamily: fonts.heading,
                fontSize: "10px",
                color: whiteAlpha(0.3),
              }}
            >
              +{chapter.gods.length - 6}
            </span>
          )}
        </div>
      </div>

      <SectionDivider />

      {/* Chapter content */}
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: isMobile ? "18px" : "19px",
          lineHeight: isMobile ? "2.0" : "1.95",
          color: whiteAlpha(0.85),
        }}
      >
        {content.map((block, i) => {
          if (block.type === "break") {
            return <SectionDivider key={i} />;
          }

          // Narrator transition indicator
          const transition = partTransitions.get(i);

          // Check if this paragraph has narration timing (multi-part)
          const pi = paraIndexMap?.get(i);
          const timing = pi != null ? paraTimingMap?.get(pi) : null;
          const paraTime = timing?.paraTime || null;
          const isActivePart = timing?.partIdx === activePart;
          const wordCount = block.text ? (block.text.match(/\S+/g) || []).length : 0;
          const activeWord = isNarrating && isActivePart
            ? getActiveWordIndex(paraTime, currentTime, wordCount)
            : isNarrating && timing && timing.partIdx < activePart
              ? wordCount // fully spoken in an earlier part
              : -1;
          const useNarrationRender = isNarrating && paraTime;

          const transitionEl = transition ? (
            <div
              key={`transition-${i}`}
              style={{
                textAlign: "center",
                margin: "20px 0 12px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <div style={{ flex: 1, maxWidth: "60px", height: "1px", background: goldAlpha(0.12) }} />
              <span
                style={{
                  fontFamily: fonts.heading,
                  fontSize: "9px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: goldAlpha(0.3),
                  fontStyle: "italic",
                }}
              >
                {transition.narrator}
              </span>
              <div style={{ flex: 1, maxWidth: "60px", height: "1px", background: goldAlpha(0.12) }} />
            </div>
          ) : null;

          if (block.type === "italic") {
            return (
              <>{transitionEl}<p
                key={i}
                ref={(el) => { if (pi != null) paraRefs.current[pi] = el; }}
                style={{
                  fontStyle: "italic",
                  textAlign: "center",
                  color: goldAlpha(0.45),
                  margin: "24px 0",
                  fontSize: isMobile ? "15px" : "16px",
                }}
              >
                {useNarrationRender ? (
                  <NarrationParagraph
                    text={block.text}
                    activeWordIndex={activeWord}
                    onOpenWheel={onOpenWheel}
                    isNarrating={true}
                  />
                ) : (
                  renderTextWithGodMentions(block.text, onOpenWheel)
                )}
              </p></>
            );
          }
          // paragraph - first paragraph gets drop cap
          const isFirst = i === 0 || (i === 1 && content[0].type === "break");
          return (
            <>{transitionEl}<p
              key={i}
              ref={(el) => { if (pi != null) paraRefs.current[pi] = el; }}
              style={{ marginBottom: "18px" }}
            >
              {isFirst && block.text.length > 0 ? (
                <>
                  <span
                    style={{
                      float: "left",
                      fontFamily: fonts.display,
                      fontSize: "52px",
                      lineHeight: "0.8",
                      fontWeight: 700,
                      color: goldAlpha(0.5),
                      marginRight: "10px",
                      marginTop: "6px",
                    }}
                  >
                    {block.text.charAt(0)}
                  </span>
                  {useNarrationRender ? (
                    <NarrationParagraph
                      text={block.text.slice(1)}
                      activeWordIndex={Math.max(-1, activeWord - 1)}
                      onOpenWheel={onOpenWheel}
                      isNarrating={true}
                    />
                  ) : (
                    renderTextWithGodMentions(block.text.slice(1), onOpenWheel)
                  )}
                </>
              ) : useNarrationRender ? (
                <NarrationParagraph
                  text={block.text}
                  activeWordIndex={activeWord}
                  onOpenWheel={onOpenWheel}
                  isNarrating={true}
                />
              ) : (
                renderTextWithGodMentions(block.text, onOpenWheel)
              )}
            </p></>
          );
        })}
      </div>

      {/* End-of-chapter ornament */}
      <p
        style={{
          textAlign: "center",
          color: goldAlpha(0.18),
          fontSize: "14px",
          letterSpacing: "12px",
          padding: "24px 0 8px",
        }}
      >
        &#9733; &#9733; &#9733;
      </p>

      <SectionDivider />

      {/* Prev / Next navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0 40px",
          gap: "16px",
        }}
      >
        {prev ? (
          <button
            onClick={() => onSelectChapter(prev.id)}
            style={{
              background: goldAlpha(0.06),
              border: `1px solid ${goldAlpha(0.18)}`,
              color: goldAlpha(0.5),
              fontFamily: fonts.heading,
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              padding: "14px 20px",
              cursor: "pointer",
              borderRadius: "8px",
              textAlign: "left",
              flex: 1,
              maxWidth: "240px",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "10px",
                color: goldAlpha(0.35),
                marginBottom: "4px",
              }}
            >
              Previous
            </span>
            &larr; {prev.title}
          </button>
        ) : (
          <div />
        )}
        {next ? (
          <button
            onClick={() => onSelectChapter(next.id)}
            style={{
              background: goldAlpha(0.1),
              border: `1px solid ${goldAlpha(0.22)}`,
              color: goldAlpha(0.65),
              fontFamily: fonts.heading,
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              padding: "14px 20px",
              cursor: "pointer",
              borderRadius: "8px",
              textAlign: "right",
              flex: 1,
              maxWidth: "240px",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "10px",
                color: goldAlpha(0.4),
                marginBottom: "4px",
              }}
            >
              Next Chapter
            </span>
            {next.title} &rarr;
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* "Back to narration" floating button when user scrolls away */}
      {isNarrating && userScrolledAway && (
        <button
          onClick={scrollToNarration}
          style={{
            position: "fixed",
            bottom: isMobile ? "80px" : "76px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(8,8,15,0.92)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${goldAlpha(0.3)}`,
            color: goldAlpha(0.75),
            fontFamily: fonts.heading,
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "20px",
            zIndex: 45,
            boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 15px ${goldAlpha(0.1)}`,
            animation: "fadeIn 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "14px" }}>&#9654;</span> Back to narration
        </button>
      )}
    </div>
  );
}
