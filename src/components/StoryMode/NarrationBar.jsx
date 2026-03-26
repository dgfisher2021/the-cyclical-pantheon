import { chapters } from "../../data/storyMeta";
import { fonts, goldAlpha, whiteAlpha } from "../../styles/theme";

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/**
 * Persistent narration bar fixed at the bottom of the viewport.
 * Shows play/pause, progress, chapter name, and time.
 */
export default function NarrationBar({
  playing,
  globalTime,
  totalDuration,
  chapterId,
  onToggle,
  onSeek,
  onStop,
  isMobile,
}) {
  const pct = totalDuration > 0 ? (globalTime / totalDuration) * 100 : 0;
  const chapter = chapters[chapterId];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: isMobile ? 0 : "240px",
        right: 0,
        zIndex: 50,
        background: "rgba(8,8,15,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: `1px solid ${goldAlpha(0.12)}`,
      }}
    >
      {/* Progress bar — full width at top of bar */}
      <div
        style={{
          height: "3px",
          background: goldAlpha(0.08),
          cursor: "pointer",
        }}
        onClick={(e) => {
          if (!totalDuration) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          onSeek(ratio * totalDuration);
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: goldAlpha(0.5),
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* Controls row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "8px" : "14px",
          padding: isMobile ? "8px 12px" : "8px 20px",
        }}
      >
        {/* Play/Pause */}
        <button
          onClick={onToggle}
          style={{
            background: "none",
            border: "none",
            color: goldAlpha(playing ? 0.8 : 0.5),
            fontSize: "18px",
            cursor: "pointer",
            padding: "4px 8px",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {playing ? "\u275A\u275A" : "\u25B6"}
        </button>

        {/* Chapter info */}
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          <p
            style={{
              fontFamily: fonts.heading,
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: goldAlpha(0.55),
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {chapter?.title || chapterId}
          </p>
        </div>

        {/* Time */}
        <span
          style={{
            fontFamily: fonts.heading,
            fontSize: "10px",
            color: goldAlpha(0.35),
            letterSpacing: "1px",
            flexShrink: 0,
          }}
        >
          {formatTime(globalTime)} / {formatTime(totalDuration)}
        </span>

        {/* Stop button */}
        <button
          onClick={onStop}
          title="Stop narration"
          style={{
            background: "none",
            border: "none",
            color: whiteAlpha(0.25),
            fontSize: "14px",
            cursor: "pointer",
            padding: "4px 6px",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          &#9632;
        </button>
      </div>
    </div>
  );
}
