import { fonts, godColor } from "../../styles/theme";

export default function StatesTab({ god, isMobile }) {
  const states = [
    {
      label: "In Balance",
      text: god.balanced,
      icon: "\u2726",
      color: godColor(god),
    },
    {
      label: "Overexpressed",
      text: god.over,
      icon: "\u25B2",
      color: "#EF4444",
    },
    {
      label: "Underexpressed",
      text: god.under,
      icon: "\u25BC",
      color: "#6B7280",
    },
  ];

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {states.map((state, i) => (
        <div
          key={i}
          style={{
            marginBottom: "16px",
            padding: "18px 20px",
            background: `linear-gradient(135deg, ${state.color}1A 0%, ${state.color}0C 100%)`,
            borderLeft: `3px solid ${state.color}60`,
            borderRadius: "0 4px 4px 0",
          }}
        >
          <p
            style={{
              fontFamily: fonts.heading,
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: state.color,
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "16px" }}>{state.icon}</span>
            {state.label}
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: isMobile ? "17px" : "16px",
              lineHeight: isMobile ? "2.0" : "1.75",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {state.text}
          </p>
        </div>
      ))}
    </div>
  );
}
