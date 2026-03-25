import { gods } from "../../data/gods";
import {
  getRelationshipsForGod,
  relationshipTypeConfig,
} from "../../data/relationships";
import { oppositeDynamics } from "../../data/codexLore";
import { fonts, godColor, goldAlpha, whiteAlpha } from "../../styles/theme";
import GodNameHighlight from "../shared/GodNameHighlight";

export default function BondsTab({ god, godIndex, isMobile }) {
  const oppositeGod = gods[(godIndex + 6) % 12];
  const godRels = getRelationshipsForGod(god.name);

  const pairNames = [god.name, oppositeGod.name].sort();
  const oppKey = `${pairNames[0]}-${pairNames[1]}`;
  const oppDesc = oppositeDynamics[oppKey];

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Sacred Opposition */}
      <div
        style={{
          marginBottom: "20px",
          padding: "18px",
          background: "rgba(212,175,55,0.10)",
          border: "1px solid rgba(212,175,55,0.18)",
          borderRadius: "4px",
        }}
      >
        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: goldAlpha(0.5),
            marginBottom: "12px",
          }}
        >
          Sacred Opposition
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: god.glow,
                boxShadow: `0 0 12px ${god.glow}50`,
              }}
            />
            <span
              style={{
                fontFamily: fonts.display,
                fontSize: "16px",
                color: godColor(god),
                letterSpacing: "3px",
              }}
            >
              {god.name.toUpperCase()}
            </span>
          </div>
          <div
            style={{
              width: "40px",
              height: "2px",
              background: `linear-gradient(to right, ${god.glow}60, ${goldAlpha(0.3)}, ${oppositeGod.glow}60)`,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: fonts.display,
                fontSize: "16px",
                color: godColor(oppositeGod),
                letterSpacing: "3px",
              }}
            >
              {oppositeGod.name.toUpperCase()}
            </span>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: oppositeGod.glow,
                boxShadow: `0 0 12px ${oppositeGod.glow}50`,
              }}
            />
          </div>
        </div>
        {oppDesc && (
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: isMobile ? "16px" : "15px",
              lineHeight: "1.8",
              color: whiteAlpha(0.55),
              fontStyle: "italic",
              marginTop: "12px",
            }}
          >
            <GodNameHighlight text={oppDesc} />
          </p>
        )}
      </div>

      {/* Relationship cards */}
      {godRels.map((rel, i) => {
        const cfg = relationshipTypeConfig[rel.type];
        const otherGods = rel.gods.filter((n) => n !== god.name);
        return (
          <div
            key={i}
            style={{
              marginBottom: "14px",
              padding: "14px 16px",
              borderLeft: `3px solid ${cfg.color}60`,
              background: `${cfg.color}18`,
              borderRadius: "0 4px 4px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <span style={{ fontSize: "12px" }}>{cfg.icon}</span>
              <span
                style={{
                  fontFamily: fonts.heading,
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: cfg.color,
                  opacity: 0.8,
                }}
              >
                {cfg.label}
              </span>
            </div>
            <p
              style={{
                fontFamily: fonts.heading,
                fontSize: "14px",
                color: "rgba(255,255,255,0.85)",
                marginBottom: "4px",
                letterSpacing: "1px",
                fontWeight: 700,
              }}
            >
              {god.name} &amp; {otherGods.join(" & ")}
            </p>
            <p
              style={{
                fontFamily: fonts.heading,
                fontSize: "11px",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "8px",
                letterSpacing: "1px",
                fontStyle: "italic",
              }}
            >
              {rel.title}
            </p>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: "15px",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {rel.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
