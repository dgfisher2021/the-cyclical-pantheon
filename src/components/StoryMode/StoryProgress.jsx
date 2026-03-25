import { fonts, goldAlpha } from "../../styles/theme";

export default function StoryProgress({ completionPct, onBackToWheel }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
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
      {/* Back button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "8px 16px",
        }}
      >
        <button
          onClick={onBackToWheel}
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${goldAlpha(0.25)}`,
            color: goldAlpha(0.6),
            fontFamily: fonts.heading,
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            padding: "6px 14px",
            cursor: "pointer",
            borderRadius: "2px",
          }}
        >
          &larr; Wheel
        </button>
      </div>
    </div>
  );
}
