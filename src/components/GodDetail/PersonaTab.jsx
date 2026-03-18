import { fonts, godColor } from "../../styles/theme";
import GodNameHighlight from "../shared/GodNameHighlight";

export default function PersonaTab({ god, isMobile }) {
  const stats = [
    { label: "Form", value: god.form },
    { label: "Energy", value: god.temperament },
    { label: "Side", value: god.side === "light" ? "Light Side" : "Dark Side" },
    { label: "Archetype", value: god.trait || "Neurotypical" },
  ];

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              padding: "14px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "3px",
            }}
          >
            <p
              style={{
                fontFamily: fonts.heading,
                fontSize: "8px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "4px",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: "15px",
                color: godColor(god, 0.85),
                fontWeight: 600,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pull quote */}
      <div
        style={{
          textAlign: "center",
          padding: "18px 24px",
          marginBottom: "20px",
          borderTop: `1px solid ${god.glow}12`,
          borderBottom: `1px solid ${god.glow}12`,
        }}
      >
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: "20px",
            fontStyle: "italic",
            color: godColor(god, 0.7),
            lineHeight: "1.6",
          }}
        >
          <span
            style={{
              color: godColor(god, 0.4),
              fontSize: "28px",
              fontFamily: fonts.display,
            }}
          >
            &#8220;
          </span>
          {god.quote}
          <span
            style={{
              color: godColor(god, 0.4),
              fontSize: "28px",
              fontFamily: fonts.display,
            }}
          >
            &#8221;
          </span>
        </p>
      </div>

      <div
        style={{
          padding: "18px",
          background: "rgba(255,255,255,0.02)",
          borderLeft: `3px solid ${god.glow}30`,
          borderRadius: "0 4px 4px 0",
        }}
      >
        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: "9px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: `${god.glow}80`,
            marginBottom: "10px",
          }}
        >
          Personality
        </p>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: isMobile ? "17px" : "16px",
            lineHeight: isMobile ? "2.0" : "1.85",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <GodNameHighlight text={god.personality} />
        </p>
      </div>
    </div>
  );
}
