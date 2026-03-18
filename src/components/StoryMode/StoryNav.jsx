import { useState } from "react";
import { acts, chapters, chapterOrder } from "../../data/storyMeta";
import { fonts, goldAlpha, whiteAlpha } from "../../styles/theme";

export default function StoryNav({
  currentChapterId,
  onSelectChapter,
  isComplete,
  isMobile,
}) {
  const [open, setOpen] = useState(false);

  const navContent = (
    <div style={{ padding: "16px 0" }}>
      {acts.map((act) => {
        const actChapters = chapterOrder
          .map((id) => chapters[id])
          .filter((ch) => ch.act === act.id);

        return (
          <div key={act.id} style={{ marginBottom: "20px" }}>
            <p
              style={{
                fontFamily: fonts.heading,
                fontSize: "8px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: goldAlpha(0.4),
                padding: "0 16px",
                marginBottom: "8px",
              }}
            >
              Act {act.id}: {act.title}
            </p>
            {actChapters.map((ch) => {
              const isCurrent = ch.id === currentChapterId;
              const done = isComplete(ch.id);
              const isEpilogue = ch.id.startsWith("E");
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    onSelectChapter(ch.id);
                    setOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: isCurrent ? goldAlpha(0.08) : "transparent",
                    border: "none",
                    borderLeft: isCurrent
                      ? `2px solid ${goldAlpha(0.5)}`
                      : "2px solid transparent",
                    padding: "8px 16px",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  <p
                    style={{
                      fontFamily: fonts.heading,
                      fontSize: "11px",
                      color: isCurrent
                        ? goldAlpha(0.8)
                        : done
                          ? whiteAlpha(0.5)
                          : whiteAlpha(0.35),
                      fontStyle: isEpilogue ? "italic" : "normal",
                      letterSpacing: "1px",
                    }}
                  >
                    {done && !isCurrent ? "✓ " : ""}
                    {ch.title}
                  </p>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  // Desktop: fixed sidebar
  if (!isMobile) {
    return (
      <nav
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "240px",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          borderRight: `1px solid ${goldAlpha(0.08)}`,
          overflowY: "auto",
          zIndex: 40,
          paddingTop: "50px",
        }}
      >
        <div style={{ padding: "16px 16px 8px" }}>
          <p
            style={{
              fontFamily: fonts.display,
              fontSize: "12px",
              color: goldAlpha(0.5),
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            The Dance of
            <br />
            Light &amp; Dark
          </p>
        </div>
        {navContent}
      </nav>
    );
  }

  // Mobile: hamburger + bottom sheet
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: "8px",
          right: "16px",
          zIndex: 51,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          border: `1px solid ${goldAlpha(0.15)}`,
          color: goldAlpha(0.6),
          fontFamily: fonts.heading,
          fontSize: "16px",
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: "2px",
          lineHeight: 1,
        }}
      >
        &#9776;
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 45,
            }}
          />
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: "70vh",
              background: "rgba(8,8,15,0.95)",
              backdropFilter: "blur(16px)",
              borderTop: `1px solid ${goldAlpha(0.15)}`,
              overflowY: "auto",
              zIndex: 46,
              borderRadius: "12px 12px 0 0",
              animation: "slideUp 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "4px",
                  borderRadius: "2px",
                  background: goldAlpha(0.2),
                }}
              />
            </div>
            {navContent}
          </div>
        </>
      )}
    </>
  );
}
