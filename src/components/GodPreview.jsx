import { fonts, godColor } from "../styles/theme";

export default function GodPreview({ god, oppositeGod, onExpand, isMobile }) {
  return (
    <div
      style={{
        animation: "fadeIn 0.3s ease",
        textAlign: "center",
        padding: "10px 24px 30px",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? "14px" : "20px",
          marginBottom: "12px",
          flexDirection: isMobile && window.innerWidth < 350 ? "column" : "row",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: fonts.display,
              fontSize: "18px",
              fontWeight: 700,
              color: godColor(god),
              letterSpacing: "4px",
              textShadow: `0 0 30px ${god.glow}40`,
            }}
          >
            {god.name.toUpperCase()}
          </p>
          <p
            style={{
              fontFamily: fonts.heading,
              fontSize: "9px",
              color: `${god.glow}80`,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            {god.domain}
          </p>
        </div>
        <span
          style={{
            fontFamily: fonts.display,
            fontSize: "14px",
            color: "rgba(212,175,55,0.35)",
          }}
        >
          &loz;
        </span>
        <div>
          <p
            style={{
              fontFamily: fonts.display,
              fontSize: "18px",
              fontWeight: 700,
              color: godColor(oppositeGod),
              letterSpacing: "4px",
              textShadow: `0 0 30px ${oppositeGod.glow}40`,
            }}
          >
            {oppositeGod.name.toUpperCase()}
          </p>
          <p
            style={{
              fontFamily: fonts.heading,
              fontSize: "9px",
              color: `${oppositeGod.glow}80`,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            {oppositeGod.domain}
          </p>
        </div>
      </div>
      <p
        style={{
          fontFamily: fonts.body,
          fontSize: "14px",
          color: "rgba(255,255,255,0.4)",
          fontStyle: "italic",
          marginBottom: "16px",
        }}
      >
        Manifests as{" "}
        <strong style={{ color: "rgba(255,255,255,0.6)" }}>{god.form}</strong>{" "}
        &middot;{" "}
        <strong style={{ color: "rgba(255,255,255,0.6)" }}>
          {god.temperament}
        </strong>
        {god.trait ? (
          <>
            {" "}
            &mdash; <strong style={{ color: god.glow }}>{god.trait}</strong>
          </>
        ) : (
          ""
        )}
      </p>
      <button
        onClick={onExpand}
        style={{
          background: `${god.glow}10`,
          border: `1px solid ${god.glow}30`,
          color: godColor(god, 0.6),
          fontFamily: fonts.heading,
          fontSize: "10px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          padding: "10px 24px",
          cursor: "pointer",
          borderRadius: "2px",
        }}
      >
        &#10022; Open Codex Entry
      </button>
    </div>
  );
}
