import { useRef, useEffect } from "react";
import { chapters, getAdjacentChapter, acts } from "../../data/storyMeta";
import { storyChapters } from "../../data/storyChapters";
import { godByName } from "../../data/gods";
import { fonts, godColor, goldAlpha, whiteAlpha } from "../../styles/theme";
import SectionDivider from "../shared/SectionDivider";
import GodMention from "./GodMention";

const GOD_PATTERN =
  /\b(Destruction|Creation|Oblivion|Darkness|Division|Eternity|Growth|Chaos|Light|Order|Unity|Decay)\b/g;

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

export default function StoryChapter({
  chapterId,
  onSelectChapter,
  onOpenWheel,
  onMarkComplete,
  isMobile,
}) {
  const chapter = chapters[chapterId];
  const content = storyChapters[chapterId];
  const prev = getAdjacentChapter(chapterId, -1);
  const next = getAdjacentChapter(chapterId, 1);
  const scrollRef = useRef(null);
  const act = acts.find((a) => a.id === chapter.act);
  const isEpilogue = chapterId.startsWith("E");

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
        maxWidth: "680px",
        margin: "0 auto",
        padding: isMobile ? "60px 20px 40px" : "60px 24px 40px",
      }}
    >
      {/* Chapter header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: "9px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: goldAlpha(0.35),
            marginBottom: "8px",
          }}
        >
          Act {chapter.act} &middot; {act?.title}
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

        {/* Featured gods */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
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
                    fontFamily: fonts.heading,
                    fontSize: "8px",
                    letterSpacing: "1px",
                    color: godColor(g, 0.5),
                    textTransform: "uppercase",
                  }}
                >
                  {name}
                </span>
              )
            );
          })}
          {chapter.gods.length > 6 && (
            <span
              style={{
                fontFamily: fonts.heading,
                fontSize: "8px",
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
          fontSize: isMobile ? "17px" : "18px",
          lineHeight: isMobile ? "2.0" : "1.95",
          color: whiteAlpha(0.72),
        }}
      >
        {content.map((block, i) => {
          if (block.type === "break") {
            return <SectionDivider key={i} />;
          }
          if (block.type === "italic") {
            return (
              <p
                key={i}
                style={{
                  fontStyle: "italic",
                  textAlign: "center",
                  color: goldAlpha(0.45),
                  margin: "24px 0",
                  fontSize: isMobile ? "15px" : "16px",
                }}
              >
                {renderTextWithGodMentions(block.text, onOpenWheel)}
              </p>
            );
          }
          // paragraph - first paragraph gets drop cap
          const isFirst = i === 0 || (i === 1 && content[0].type === "break");
          return (
            <p key={i} style={{ marginBottom: "18px" }}>
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
                  {renderTextWithGodMentions(block.text.slice(1), onOpenWheel)}
                </>
              ) : (
                renderTextWithGodMentions(block.text, onOpenWheel)
              )}
            </p>
          );
        })}
      </div>

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
              background: "none",
              border: `1px solid ${goldAlpha(0.12)}`,
              color: goldAlpha(0.45),
              fontFamily: fonts.heading,
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              padding: "10px 18px",
              cursor: "pointer",
              borderRadius: "2px",
              textAlign: "left",
              flex: 1,
              maxWidth: "200px",
            }}
          >
            &larr; {prev.title}
          </button>
        ) : (
          <div />
        )}
        {next ? (
          <button
            onClick={() => onSelectChapter(next.id)}
            style={{
              background: `${goldAlpha(0.06)}`,
              border: `1px solid ${goldAlpha(0.15)}`,
              color: goldAlpha(0.6),
              fontFamily: fonts.heading,
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              padding: "10px 18px",
              cursor: "pointer",
              borderRadius: "2px",
              textAlign: "right",
              flex: 1,
              maxWidth: "200px",
            }}
          >
            {next.title} &rarr;
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
