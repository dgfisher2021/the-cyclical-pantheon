import { godByName } from "../../data/gods";
import {
  socialDynamics,
  crossPairInteractions,
  chaosMirror,
  chaosBPDCycle,
  oblivionPowerLeak,
} from "../../data/codexLore";
import { fonts, godColor, goldAlpha, whiteAlpha } from "../../styles/theme";
import GodNameHighlight from "../shared/GodNameHighlight";

export default function DynamicsTab({ god, isMobile }) {
  const socialEntry =
    socialDynamics.mostSocial.find((e) => e.name === god.name) ||
    socialDynamics.mostIsolated.find((e) => e.name === god.name);

  const relevantCrossPairs = crossPairInteractions.filter((cp) =>
    cp.gods.includes(god.name),
  );

  const isChaos = god.name === "Chaos";
  const isOblivion = god.name === "Oblivion";

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Social Standing */}
      {socialEntry && (
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
              color: godColor(god, 0.5),
              marginBottom: "10px",
            }}
          >
            Social Standing
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: isMobile ? "17px" : "16px",
              lineHeight: "1.8",
              color: whiteAlpha(0.65),
            }}
          >
            <GodNameHighlight text={socialEntry.desc} />
          </p>
        </div>
      )}

      {/* Chaos-specific: Mirror Presentations */}
      {isChaos && (
        <div
          style={{
            padding: "18px",
            background: `${god.glow}12`,
            borderLeft: `3px solid ${god.glow}40`,
            borderRadius: "0 4px 4px 0",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontFamily: fonts.heading,
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: godColor(god, 0.6),
              marginBottom: "12px",
            }}
          >
            The Mirror
          </p>
          {Object.entries(chaosMirror).map(([key, text]) => (
            <p
              key={key}
              style={{
                fontFamily: fonts.body,
                fontSize: isMobile ? "17px" : "16px",
                lineHeight: "1.8",
                color: whiteAlpha(0.6),
                marginBottom: "10px",
              }}
            >
              <GodNameHighlight text={text} />
            </p>
          ))}
        </div>
      )}

      {/* Chaos-specific: BPD Emotional Cycle */}
      {isChaos && (
        <div
          style={{
            padding: "18px",
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${god.glow}20`,
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
              color: godColor(god, 0.5),
              marginBottom: "14px",
            }}
          >
            Emotional Cycling
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: isMobile ? "15px" : "14px",
              color: whiteAlpha(0.45),
              marginBottom: "14px",
              fontStyle: "italic",
            }}
          >
            When triggered — especially by favorite-person rejection — Chaos
            cycles through total emotional states. Not gradual shifts — channel
            changes.
          </p>
          {chaosBPDCycle.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "12px",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: fonts.display,
                  fontSize: "16px",
                  color: godColor(god, 0.5),
                  flexShrink: 0,
                  width: "20px",
                  textAlign: "center",
                }}
              >
                {i + 1}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: "13px",
                    color: whiteAlpha(0.7),
                    fontWeight: 600,
                    marginBottom: "3px",
                  }}
                >
                  {step.phase}
                </p>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: isMobile ? "16px" : "15px",
                    lineHeight: "1.7",
                    color: whiteAlpha(0.5),
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Oblivion-specific: Power Leak */}
      {isOblivion && (
        <div
          style={{
            padding: "18px",
            background: `${god.glow}10`,
            borderLeft: `3px solid ${god.glow}35`,
            borderRadius: "0 4px 4px 0",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontFamily: fonts.heading,
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: godColor(god, 0.5),
              marginBottom: "10px",
            }}
          >
            Power Leak
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: isMobile ? "17px" : "16px",
              lineHeight: "1.8",
              color: whiteAlpha(0.6),
              marginBottom: "10px",
            }}
          >
            <GodNameHighlight text={oblivionPowerLeak.desc} />
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: isMobile ? "16px" : "15px",
              lineHeight: "1.7",
              color: whiteAlpha(0.5),
              fontStyle: "italic",
            }}
          >
            <GodNameHighlight text={oblivionPowerLeak.threat} />
          </p>
        </div>
      )}

      {/* Cross-Pair Interactions */}
      {relevantCrossPairs.length > 0 && (
        <>
          <p
            style={{
              fontFamily: fonts.heading,
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: goldAlpha(0.4),
              marginBottom: "14px",
            }}
          >
            Cross-Pair Interactions
          </p>
          {relevantCrossPairs.map((cp, i) => {
            const otherNames = cp.gods.filter((n) => n !== god.name);
            const otherGod = godByName[otherNames[0]];
            return (
              <div
                key={i}
                style={{
                  marginBottom: "14px",
                  padding: "14px 16px",
                  borderLeft: `3px solid ${otherGod ? otherGod.glow : goldAlpha(0.3)}50`,
                  background: `${otherGod ? otherGod.glow : goldAlpha(0.3)}10`,
                  borderRadius: "0 4px 4px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  {cp.gods.map((name) => {
                    const g = godByName[name];
                    return (
                      g && (
                        <span
                          key={name}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span
                            style={{
                              width: "7px",
                              height: "7px",
                              borderRadius: "50%",
                              background: g.glow,
                              display: "inline-block",
                            }}
                          />
                          <span
                            style={{
                              fontFamily: fonts.heading,
                              fontSize: "11px",
                              color: godColor(g, 0.6),
                              letterSpacing: "1px",
                              textTransform: "uppercase",
                            }}
                          >
                            {name}
                          </span>
                        </span>
                      )
                    );
                  })}
                </div>
                <p
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: "13px",
                    color: whiteAlpha(0.7),
                    fontWeight: 600,
                    marginBottom: "6px",
                    letterSpacing: "1px",
                  }}
                >
                  {cp.title}
                </p>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: isMobile ? "16px" : "15px",
                    lineHeight: "1.7",
                    color: whiteAlpha(0.55),
                  }}
                >
                  <GodNameHighlight text={cp.desc} />
                </p>
              </div>
            );
          })}
        </>
      )}

      {/* Empty state if no dynamics */}
      {!socialEntry &&
        !isChaos &&
        !isOblivion &&
        relevantCrossPairs.length === 0 && (
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: "15px",
              color: whiteAlpha(0.4),
              fontStyle: "italic",
              textAlign: "center",
              padding: "20px",
            }}
          >
            No specific dynamics entries for {god.name}.
          </p>
        )}
    </div>
  );
}
