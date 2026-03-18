import { godByName } from "../../data/gods";
import { godColor } from "../../styles/theme";

const GOD_PATTERN =
  /\b(Destruction|Creation|Oblivion|Darkness|Division|Eternity|Growth|Chaos|Light|Order|Unity|Decay)\b/g;

export default function GodNameHighlight({
  text,
  onGodClick,
  interactive = false,
}) {
  if (!text) return null;

  const parts = [];
  let lastIndex = 0;
  let match;

  GOD_PATTERN.lastIndex = 0;
  while ((match = GOD_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const name = match[1];
    const god = godByName[name];
    parts.push(
      <span
        key={`${match.index}-${name}`}
        onClick={
          interactive && onGodClick
            ? (e) => {
                e.stopPropagation();
                onGodClick(name);
              }
            : undefined
        }
        style={{
          color: godColor(god, 0.85),
          fontWeight: 600,
          cursor: interactive && onGodClick ? "pointer" : "inherit",
          textShadow: `0 0 12px ${god.glow}30`,
          transition: "color 0.2s",
        }}
      >
        {name}
      </span>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}
