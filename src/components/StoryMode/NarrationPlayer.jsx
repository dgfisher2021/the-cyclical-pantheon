import { fonts, goldAlpha } from "../../styles/theme";

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function NarrationPlayer({
  playing,
  currentTime,
  duration,
  onToggle,
  onSeek,
}) {
  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        background: goldAlpha(0.04),
        border: `1px solid ${goldAlpha(0.12)}`,
        borderRadius: "4px",
        marginBottom: "24px",
      }}
    >
      {/* Play/Pause button */}
      <button
        onClick={onToggle}
        style={{
          background: goldAlpha(playing ? 0.15 : 0.08),
          border: `1px solid ${goldAlpha(playing ? 0.3 : 0.18)}`,
          color: goldAlpha(playing ? 0.8 : 0.55),
          fontFamily: fonts.heading,
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          padding: "8px 16px",
          cursor: "pointer",
          borderRadius: "8px",
          flexShrink: 0,
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ fontSize: "14px" }}>{playing ? "\u275A\u275A" : "\u25B6"}</span>
        {playing ? "Pause" : "Listen"}
      </button>

      {/* Progress bar */}
      <div
        style={{ flex: 1, position: "relative", cursor: "pointer", padding: "6px 0" }}
        onClick={(e) => {
          if (!duration) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          onSeek(ratio * duration);
        }}
      >
        <div
          style={{
            height: "3px",
            background: goldAlpha(0.1),
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: goldAlpha(0.45),
              borderRadius: "2px",
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>

      {/* Time display */}
      <span
        style={{
          fontFamily: fonts.heading,
          fontSize: "10px",
          color: goldAlpha(0.35),
          letterSpacing: "1px",
          flexShrink: 0,
          minWidth: "70px",
          textAlign: "right",
        }}
      >
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </div>
  );
}
