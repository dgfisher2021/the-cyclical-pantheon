import { fonts, godColor } from "../../styles/theme";
import GodNameHighlight from "../shared/GodNameHighlight";

export default function OriginTab({ god, isMobile }) {
  const paragraphs = god.lore.split("\n\n");

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: isMobile ? "17px" : "16px",
          lineHeight: isMobile ? "2.0" : "1.9",
          color: "rgba(255,255,255,0.7)",
          fontStyle: "italic",
          borderLeft: `3px solid ${god.glow}30`,
          paddingLeft: "18px",
          marginBottom: "22px",
        }}
      >
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              marginBottom: "14px",
              ...(i === 0
                ? {
                    // Illuminated drop cap via CSS
                  }
                : {}),
            }}
          >
            {i === 0 ? (
              <>
                <span
                  style={{
                    float: "left",
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "48px",
                    lineHeight: "0.8",
                    fontWeight: 700,
                    color: godColor(god, 0.7),
                    marginRight: "8px",
                    marginTop: "4px",
                    textShadow: `0 0 20px ${god.glow}30`,
                  }}
                >
                  {p.charAt(0)}
                </span>
                <GodNameHighlight text={p.slice(1)} />
              </>
            ) : (
              <GodNameHighlight text={p} />
            )}
          </p>
        ))}
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "18px",
          borderTop: "1px solid rgba(212,175,55,0.08)",
          borderBottom: "1px solid rgba(212,175,55,0.08)",
        }}
      >
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: "18px",
            fontStyle: "italic",
            color: godColor(god, 0.75),
          }}
        >
          &ldquo;{god.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}
