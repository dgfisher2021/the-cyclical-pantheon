import { gods, godByName } from "../../data/gods";
import {
  fundamentalLaw,
  wheelNarrative,
  wheelOrder,
} from "../../data/codexLore";
import { fonts, godColor, goldAlpha, whiteAlpha } from "../../styles/theme";

export default function WheelTab({ god, isMobile }) {
  const idx = wheelOrder.indexOf(god.name);
  const prevName = wheelOrder[(idx - 1 + 12) % 12];
  const nextName = wheelOrder[(idx + 1) % 12];
  const prevGod = godByName[prevName];
  const nextGod = godByName[nextName];
  const transition = wheelNarrative.transitions[god.name];

  const isAscending = idx <= 5;

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Fundamental Law */}
      <div
        style={{
          padding: "18px",
          background: goldAlpha(0.08),
          border: `1px solid ${goldAlpha(0.15)}`,
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: goldAlpha(0.5),
            marginBottom: "10px",
          }}
        >
          The Fundamental Law
        </p>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: isMobile ? "17px" : "16px",
            lineHeight: "1.8",
            color: whiteAlpha(0.65),
            fontStyle: "italic",
          }}
        >
          {fundamentalLaw}
        </p>
      </div>

      {/* Position in the Wheel */}
      <div
        style={{
          padding: "18px",
          background: "rgba(255,255,255,0.06)",
          border: `1px solid rgba(255,255,255,0.1)`,
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: goldAlpha(0.4),
            marginBottom: "14px",
            textAlign: "center",
          }}
        >
          Position in the Wheel
        </p>

        {/* Flow: prev -> this -> next */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? "8px" : "14px",
            marginBottom: "14px",
            flexWrap: "wrap",
          }}
        >
          <GodOrb god={prevGod} small />
          <span
            style={{
              color: goldAlpha(0.3),
              fontFamily: fonts.display,
              fontSize: "14px",
            }}
          >
            &rarr;
          </span>
          <GodOrb god={gods[gods.findIndex((g) => g.name === god.name)]} />
          <span
            style={{
              color: goldAlpha(0.3),
              fontFamily: fonts.display,
              fontSize: "14px",
            }}
          >
            &rarr;
          </span>
          <GodOrb god={nextGod} small />
        </div>

        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: "11px",
            textAlign: "center",
            color: whiteAlpha(0.35),
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          {isAscending ? "Ascending Arc" : "Descending Arc"} &middot; Position{" "}
          {idx + 1} of 12
        </p>

        {transition && (
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: isMobile ? "17px" : "16px",
              lineHeight: "1.8",
              color: godColor(god, 0.7),
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            {transition}
          </p>
        )}
      </div>

      {/* Full Cycle Narrative */}
      <div
        style={{
          padding: "18px",
          background: "rgba(255,255,255,0.05)",
          borderLeft: `3px solid ${goldAlpha(0.2)}`,
          borderRadius: "0 4px 4px 0",
        }}
      >
        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: goldAlpha(0.4),
            marginBottom: "12px",
          }}
        >
          The Cycle
        </p>
        {[
          wheelNarrative.ascending,
          wheelNarrative.turn,
          wheelNarrative.descending,
          wheelNarrative.return,
        ].map((text, i) => (
          <p
            key={i}
            style={{
              fontFamily: fonts.body,
              fontSize: isMobile ? "17px" : "16px",
              lineHeight: "1.8",
              color: i === 1 || i === 3 ? goldAlpha(0.55) : whiteAlpha(0.6),
              fontStyle: i === 1 || i === 3 ? "italic" : "normal",
              textAlign: i === 1 || i === 3 ? "center" : "left",
              marginBottom: "10px",
            }}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

function GodOrb({ god, small }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: small ? "10px" : "14px",
          height: small ? "10px" : "14px",
          borderRadius: "50%",
          background: god.glow,
          boxShadow: `0 0 ${small ? "8px" : "14px"} ${god.glow}50`,
          margin: "0 auto 6px",
        }}
      />
      <p
        style={{
          fontFamily: fonts.heading,
          fontSize: small ? "10px" : "12px",
          color: godColor(god, small ? 0.5 : 0.8),
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: small ? 400 : 700,
        }}
      >
        {god.name}
      </p>
    </div>
  );
}
