import { goldAlpha } from "../../styles/theme";

export default function SectionDivider({ color = goldAlpha(0.15) }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "16px 0",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(to right, transparent, ${color}, transparent)`,
        }}
      />
      <span style={{ color, fontSize: "10px" }}>&#10022;</span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(to right, transparent, ${color}, transparent)`,
        }}
      />
    </div>
  );
}
