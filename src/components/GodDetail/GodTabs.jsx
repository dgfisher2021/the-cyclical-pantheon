import { fonts, godColor } from "../../styles/theme";

export default function GodTabs({
  tabs,
  activeTab,
  onTabChange,
  god,
  isMobile,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMobile ? "flex-start" : "center",
        gap: "3px",
        marginBottom: "22px",
        flexWrap: isMobile ? "nowrap" : "wrap",
        overflowX: isMobile ? "auto" : "visible",
        WebkitOverflowScrolling: "touch",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        padding: isMobile ? "0 4px" : 0,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          style={{
            background: activeTab === tab.key ? `${god.glow}30` : "transparent",
            border: `1px solid ${activeTab === tab.key ? `${god.glow}50` : "rgba(255,255,255,0.1)"}`,
            color:
              activeTab === tab.key ? godColor(god) : "rgba(255,255,255,0.4)",
            fontFamily: fonts.heading,
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            padding: isMobile ? "10px 14px" : "7px 14px",
            cursor: "pointer",
            borderRadius: "2px",
            transition: "all 0.3s",
            whiteSpace: "nowrap",
            flexShrink: 0,
            minHeight: isMobile ? "44px" : "auto",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
