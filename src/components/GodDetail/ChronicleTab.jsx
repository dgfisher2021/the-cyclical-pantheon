import { getChaptersForGod } from "../../data/storyMeta";
import { godByName } from "../../data/gods";
import { fonts, godColor, goldAlpha, whiteAlpha } from "../../styles/theme";

export default function ChronicleTab({ god, onOpenStory }) {
  const chapters = getChaptersForGod(god.name);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <p
        style={{
          fontFamily: fonts.heading,
          fontSize: "9px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: goldAlpha(0.4),
          marginBottom: "16px",
        }}
      >
        Story chapters featuring {god.name}
      </p>

      {chapters.length === 0 ? (
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
          No chronicle entries yet.
        </p>
      ) : (
        chapters.map((ch) => {
          const isEpilogue = ch.id.startsWith("E");
          return (
            <div
              key={ch.id}
              style={{
                marginBottom: "12px",
                padding: "14px 16px",
                background: goldAlpha(0.03),
                border: `1px solid ${goldAlpha(0.08)}`,
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onClick={() => onOpenStory(ch.id)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: fonts.heading,
                      fontSize: "8px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: goldAlpha(0.4),
                    }}
                  >
                    Act {ch.act} {isEpilogue ? "· Epilogue" : `· Ch ${ch.id}`}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: "8px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: godColor(god, 0.5),
                  }}
                >
                  Read &rarr;
                </span>
              </div>
              <p
                style={{
                  fontFamily: fonts.heading,
                  fontSize: "13px",
                  color: whiteAlpha(0.75),
                  fontWeight: 600,
                  letterSpacing: "1px",
                  marginBottom: "6px",
                  fontStyle: isEpilogue ? "italic" : "normal",
                }}
              >
                {ch.title}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                {ch.gods
                  .filter((n) => n !== god.name)
                  .slice(0, 5)
                  .map((name) => {
                    const g = godByName[name];
                    return (
                      g && (
                        <span
                          key={name}
                          style={{
                            fontFamily: fonts.heading,
                            fontSize: "7px",
                            letterSpacing: "1px",
                            color: godColor(g, 0.4),
                            textTransform: "uppercase",
                          }}
                        >
                          {name}
                        </span>
                      )
                    );
                  })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
