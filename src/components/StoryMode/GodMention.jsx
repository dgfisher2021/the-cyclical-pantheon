import { useState, useRef, useEffect } from "react";
import { godByName } from "../../data/gods";
import { fonts, godColor } from "../../styles/theme";

export default function GodMention({ name, onOpenWheel }) {
  const [showPopover, setShowPopover] = useState(false);
  const ref = useRef(null);
  const god = godByName[name];

  useEffect(() => {
    if (!showPopover) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowPopover(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [showPopover]);

  if (!god) return <span>{name}</span>;

  return (
    <span ref={ref} style={{ position: "relative", display: "inline" }}>
      <span
        onClick={(e) => {
          e.stopPropagation();
          setShowPopover(!showPopover);
        }}
        style={{
          color: godColor(god, 0.85),
          fontWeight: 600,
          cursor: "pointer",
          textShadow: `0 0 12px ${god.glow}30`,
          borderBottom: `1px dotted ${god.glow}40`,
        }}
      >
        {name}
      </span>
      {showPopover && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "220px",
            background: "rgba(8,8,15,0.95)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${god.glow}30`,
            borderRadius: "4px",
            padding: "14px",
            zIndex: 60,
            animation: "fadeIn 0.2s ease",
            boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${god.glow}10`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: god.glow,
                boxShadow: `0 0 12px ${god.glow}50`,
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: fonts.display,
                  fontSize: "12px",
                  color: godColor(god),
                  letterSpacing: "2px",
                }}
              >
                {god.name.toUpperCase()}
              </p>
              <p
                style={{
                  fontFamily: fonts.heading,
                  fontSize: "8px",
                  color: `${god.glow}70`,
                  letterSpacing: "1px",
                }}
              >
                {god.domain}
              </p>
            </div>
          </div>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: "13px",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.5)",
              lineHeight: "1.5",
              marginBottom: "10px",
            }}
          >
            &ldquo;{god.quote}&rdquo;
          </p>
          <button
            onClick={() => {
              onOpenWheel(name);
              setShowPopover(false);
            }}
            style={{
              width: "100%",
              background: `${god.glow}10`,
              border: `1px solid ${god.glow}25`,
              color: godColor(god, 0.7),
              fontFamily: fonts.heading,
              fontSize: "8px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              padding: "6px 12px",
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >
            Open Codex
          </button>
          {/* Arrow */}
          <div
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "10px",
              height: "10px",
              background: "rgba(8,8,15,0.95)",
              borderRight: `1px solid ${god.glow}30`,
              borderBottom: `1px solid ${god.glow}30`,
            }}
          />
        </div>
      )}
    </span>
  );
}
