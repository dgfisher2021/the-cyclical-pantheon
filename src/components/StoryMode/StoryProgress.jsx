import { fonts, goldAlpha, whiteAlpha } from "../../styles/theme";

export default function StoryProgress({
  completionPct,
  onBackToWheel,
  hasNarration,
  isNarrating,
  onToggleNarration,
  isMobile,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: isMobile ? 0 : "240px",
        right: 0,
        zIndex: 50,
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          height: "2px",
          background: "rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${completionPct * 100}%`,
            background: `linear-gradient(to right, ${goldAlpha(0.4)}, ${goldAlpha(0.8)})`,
            transition: "width 0.5s ease",
          }}
        />
      </div>
      {/* Top toolbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
        }}
      >
        <button
          onClick={onBackToWheel}
          style={{
            background: "rgba(0,0,0,0.4)",
            border: `1px solid ${goldAlpha(0.2)}`,
            color: goldAlpha(0.65),
            fontFamily: fonts.heading,
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "8px",
            minHeight: "36px",
            minWidth: "44px",
          }}
        >
          &larr; Wheel
        </button>

        {hasNarration && (
          <button
            onClick={onToggleNarration}
            style={{
              background: isNarrating ? goldAlpha(0.15) : "rgba(0,0,0,0.4)",
              border: `1px solid ${isNarrating ? goldAlpha(0.35) : goldAlpha(0.15)}`,
              color: isNarrating ? goldAlpha(0.85) : whiteAlpha(0.5),
              fontFamily: fonts.heading,
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              padding: "8px 14px",
              cursor: "pointer",
              borderRadius: "8px",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: "12px" }}>
              {isNarrating ? "\u275A\u275A" : "\u25B6"}
            </span>
            {isNarrating ? "Listening" : "Listen"}
          </button>
        )}
      </div>
    </div>
  );
}
