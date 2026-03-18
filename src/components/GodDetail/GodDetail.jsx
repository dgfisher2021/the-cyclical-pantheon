import { useState, useRef, useEffect } from "react";
import { gods } from "../../data/gods";
import { fonts, godColor, goldAlpha } from "../../styles/theme";
import SectionDivider from "../shared/SectionDivider";
import GodTabs from "./GodTabs";
import PersonaTab from "./PersonaTab";
import OriginTab from "./OriginTab";
import StatesTab from "./StatesTab";
import BondsTab from "./BondsTab";
import ChronicleTab from "./ChronicleTab";

export default function GodDetail({
  godIndex,
  onClose,
  onNavigate,
  onOpenStory,
  isMobile,
}) {
  const [activeTab, setActiveTab] = useState("personality");
  const scrollRef = useRef(null);

  const god = gods[godIndex];
  const prevGod = gods[(godIndex - 1 + 12) % 12];
  const nextGod = gods[(godIndex + 1) % 12];

  useEffect(() => {
    setActiveTab("personality");
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [godIndex]);

  const tabs = [
    { key: "personality", label: "Persona" },
    { key: "lore", label: "Origin" },
    { key: "balance", label: "States" },
    { key: "bonds", label: "Bonds" },
  ];

  if (onOpenStory) {
    tabs.push({ key: "chronicle", label: "Chronicle" });
  }

  const handleNav = (dir) => onNavigate(dir);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Color wash */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "300px",
          background: `radial-gradient(ellipse at center top, ${god.glow}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Desktop nav header */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 16px",
            borderBottom: `1px solid ${god.glow}20`,
            flexShrink: 0,
            position: "relative",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <button
              onClick={() => handleNav(-1)}
              style={{
                background: "none",
                border: "none",
                color: prevGod.glow,
                fontFamily: fonts.heading,
                fontSize: "11px",
                letterSpacing: "1px",
                cursor: "pointer",
                padding: "6px 12px",
                textTransform: "uppercase",
              }}
            >
              &larr; {prevGod.name}
            </button>
            <span style={{ color: goldAlpha(0.2), fontSize: "10px" }}>
              &middot;
            </span>
            <button
              onClick={() => handleNav(1)}
              style={{
                background: "none",
                border: "none",
                color: nextGod.glow,
                fontFamily: fonts.heading,
                fontSize: "11px",
                letterSpacing: "1px",
                cursor: "pointer",
                padding: "6px 12px",
                textTransform: "uppercase",
              }}
            >
              {nextGod.name} &rarr;
            </button>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontSize: "24px",
              cursor: "pointer",
              padding: "4px 8px",
              lineHeight: 1,
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            &times;
          </button>
        </div>
      )}

      {/* Mobile close button */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px 14px",
            borderBottom: `1px solid ${god.glow}20`,
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontSize: "24px",
              cursor: "pointer",
              padding: "4px 8px",
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>
      )}

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: isMobile ? "16px 16px 100px" : "20px 24px 40px",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* God Header */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: god.glow,
                margin: "0 auto 14px",
                boxShadow: `0 0 25px ${god.glow}50`,
              }}
            />
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: isMobile ? "22px" : "26px",
                fontWeight: 900,
                color: godColor(god),
                letterSpacing: isMobile ? "5px" : "7px",
                textTransform: "uppercase",
                marginBottom: "8px",
                textShadow: `0 0 35px ${god.glow}30`,
              }}
            >
              {god.name}
            </h2>
            <p
              style={{
                fontFamily: fonts.heading,
                fontSize: "11px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              {god.domain}
            </p>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: "14px",
                color: "rgba(255,255,255,0.4)",
                fontStyle: "italic",
              }}
            >
              Manifests as{" "}
              <strong style={{ color: "rgba(255,255,255,0.6)" }}>
                {god.form}
              </strong>{" "}
              &middot;{" "}
              <strong style={{ color: "rgba(255,255,255,0.6)" }}>
                {god.temperament}
              </strong>
              {god.trait ? (
                <>
                  {" "}
                  &mdash;{" "}
                  <strong style={{ color: god.glow }}>{god.trait}</strong>
                </>
              ) : (
                ""
              )}
            </p>
          </div>

          <SectionDivider color={`${god.glow}20`} />

          <GodTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            god={god}
            isMobile={isMobile}
          />

          {activeTab === "personality" && (
            <PersonaTab god={god} isMobile={isMobile} />
          )}
          {activeTab === "lore" && <OriginTab god={god} isMobile={isMobile} />}
          {activeTab === "balance" && (
            <StatesTab god={god} isMobile={isMobile} />
          )}
          {activeTab === "bonds" && (
            <BondsTab god={god} godIndex={godIndex} isMobile={isMobile} />
          )}
          {activeTab === "chronicle" && onOpenStory && (
            <ChronicleTab god={god} onOpenStory={onOpenStory} />
          )}

          <SectionDivider color={goldAlpha(0.08)} />

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: `1px solid ${goldAlpha(0.15)}`,
                color: goldAlpha(0.4),
                fontFamily: fonts.heading,
                fontSize: "9px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                padding: "10px 28px",
                cursor: "pointer",
                borderRadius: "2px",
              }}
            >
              Return to the Wheel
            </button>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 16px",
            background: "rgba(0,0,0,0.9)",
            borderTop: `1px solid ${god.glow}20`,
            zIndex: 101,
          }}
        >
          <button
            onClick={() => handleNav(-1)}
            style={{
              background: "none",
              border: "none",
              color: prevGod.glow,
              fontFamily: fonts.heading,
              fontSize: "12px",
              letterSpacing: "1px",
              cursor: "pointer",
              padding: "8px 16px",
              textTransform: "uppercase",
              minHeight: "44px",
            }}
          >
            &larr; {prevGod.name}
          </button>
          <button
            onClick={() => handleNav(1)}
            style={{
              background: "none",
              border: "none",
              color: nextGod.glow,
              fontFamily: fonts.heading,
              fontSize: "12px",
              letterSpacing: "1px",
              cursor: "pointer",
              padding: "8px 16px",
              textTransform: "uppercase",
              minHeight: "44px",
            }}
          >
            {nextGod.name} &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
