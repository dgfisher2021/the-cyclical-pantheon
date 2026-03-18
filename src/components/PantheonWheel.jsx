import { useState } from "react";
import { gods } from "../data/gods";
import { fonts, goldAlpha, whiteAlpha } from "../styles/theme";
import GodPreview from "./GodPreview";
import GodDetail from "./GodDetail/GodDetail";

export default function PantheonWheel({
  onOpenStory,
  initialSelectedGod,
  isMobile,
}) {
  const [hoveredGod, setHoveredGod] = useState(null);
  const [selectedGod, setSelectedGod] = useState(() => {
    if (initialSelectedGod != null) return initialSelectedGod;
    return null;
  });
  const [expandedGod, setExpandedGod] = useState(() => {
    if (initialSelectedGod != null) return initialSelectedGod;
    return null;
  });

  const centerX = 300;
  const centerY = 300;
  const radius = 210;
  const orbRadius = 18;
  const total = gods.length;

  const getPosition = (i) => {
    const a = (i / total) * Math.PI * 2 - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(a),
      y: centerY + radius * Math.sin(a),
    };
  };
  const getLabelPosition = (i) => {
    const a = (i / total) * Math.PI * 2 - Math.PI / 2;
    const r = radius + 42;
    return { x: centerX + r * Math.cos(a), y: centerY + r * Math.sin(a) };
  };

  const activeGod = selectedGod !== null ? selectedGod : hoveredGod;
  const oppositeIndex = activeGod !== null ? (activeGod + 6) % 12 : null;

  const handleGodClick = (i) => {
    if (selectedGod === i && expandedGod !== i) {
      setExpandedGod(i);
    } else if (selectedGod === i && expandedGod === i) {
      setSelectedGod(null);
      setExpandedGod(null);
    } else {
      setSelectedGod(i);
      setExpandedGod(null);
    }
  };

  const expandToDetail = (i) => {
    setExpandedGod(i);
  };

  const navigateGod = (dir) => {
    const next = (expandedGod + dir + 12) % 12;
    setSelectedGod(next);
    setExpandedGod(next);
  };

  return (
    <>
      {/* HEADER */}
      <div style={{ textAlign: "center", padding: "36px 20px 8px" }}>
        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: isMobile ? "20px" : "28px",
            fontWeight: 900,
            color: "#d4af37",
            letterSpacing: isMobile ? "5px" : "10px",
            textTransform: "uppercase",
            marginBottom: "4px",
            textShadow: "0 0 50px rgba(212,175,55,0.25)",
          }}
        >
          The Pantheon
        </h1>
        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: "10px",
            color: whiteAlpha(0.25),
            letterSpacing: "5px",
            textTransform: "uppercase",
          }}
        >
          Twelve Gods &middot; Six Oppositions &middot; One Wheel
        </p>
      </div>

      {/* WHEEL */}
      <div
        style={{ display: "flex", justifyContent: "center", padding: "0 10px" }}
      >
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          style={{ maxWidth: "100%", height: "auto" }}
        >
          <defs>
            {gods.map((g, i) => (
              <radialGradient key={`g${i}`} id={`o${i}`}>
                <stop offset="0%" stopColor={g.glow} stopOpacity="1" />
                <stop offset="30%" stopColor={g.glow} stopOpacity="0.85" />
                <stop offset="70%" stopColor={g.color} stopOpacity="0.7" />
                <stop offset="100%" stopColor={g.color} stopOpacity="0.35" />
              </radialGradient>
            ))}
            <filter id="gl">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="bg">
              <feGaussianBlur stdDeviation="12" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="lg">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ls">
              <feGaussianBlur stdDeviation="18" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Wheel rings */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={goldAlpha(0.1)}
            strokeWidth="1.5"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={radius - 10}
            fill="none"
            stroke={goldAlpha(0.03)}
            strokeWidth="0.5"
            strokeDasharray="2 8"
            style={{ animation: "slowRotate 120s linear infinite" }}
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 10}
            fill="none"
            stroke={goldAlpha(0.03)}
            strokeWidth="0.5"
            strokeDasharray="2 8"
            style={{
              animation: "slowRotate 120s linear infinite",
              animationDirection: "reverse",
            }}
          />

          {/* Connecting lines */}
          {gods.map((g, i) => {
            const p1 = getPosition(i),
              p2 = getPosition((i + 1) % total);
            return (
              <line
                key={`c${i}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={i === 5 || i === 11 ? goldAlpha(0.06) : goldAlpha(0.04)}
                strokeWidth="1"
                strokeDasharray={i === 5 || i === 11 ? "3 5" : "none"}
              />
            );
          })}

          {/* Opposition line */}
          {activeGod !== null &&
            oppositeIndex !== null &&
            (() => {
              const p1 = getPosition(activeGod),
                p2 = getPosition(oppositeIndex);
              const g1 = gods[activeGod],
                g2 = gods[oppositeIndex];
              const c1 = g1.name === "Darkness" ? "#888" : g1.glow;
              const c2 = g2.name === "Darkness" ? "#888" : g2.glow;
              const gid = `op${activeGod}`;
              return (
                <g filter="url(#lg)">
                  <defs>
                    <linearGradient
                      id={gid}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor={c1} stopOpacity="1" />
                      <stop offset="40%" stopColor="rgba(212,175,55,0.5)" />
                      <stop offset="60%" stopColor="rgba(212,175,55,0.5)" />
                      <stop offset="100%" stopColor={c2} stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <line
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={`url(#${gid})`}
                    strokeWidth="2.5"
                    style={{
                      animation: "connectionPulse 2.5s ease-in-out infinite",
                    }}
                  />
                </g>
              );
            })()}

          {/* Center */}
          {selectedGod === null ? (
            <text
              x={centerX}
              y={centerY + 3}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={goldAlpha(0.1)}
              fontSize="28"
              fontFamily={fonts.display}
              fontWeight="900"
            >
              &#10022;
            </text>
          ) : (
            (() => {
              const sg = gods[selectedGod];
              return (
                <g
                  onClick={() => expandToDetail(selectedGod)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={55}
                    fill={sg.glow}
                    opacity="0.08"
                    filter="url(#bg)"
                    style={{ animation: "centerPulse 2s ease-in-out infinite" }}
                  />
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={42}
                    fill={sg.glow}
                    opacity="0.12"
                    filter="url(#gl)"
                    style={{
                      animation: "centerPulse 2s ease-in-out infinite",
                      animationDelay: "0.3s",
                    }}
                  />
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={36}
                    fill={`${sg.glow}0A`}
                    stroke={`${sg.glow}30`}
                    strokeWidth="1.5"
                  />
                  <text
                    x={centerX}
                    y={centerY - 4}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={
                      sg.name === "Light" ? whiteAlpha(0.7) : `${sg.glow}BB`
                    }
                    fontSize="28"
                    fontFamily={fonts.display}
                    fontWeight="900"
                  >
                    &#10022;
                  </text>
                  <text
                    x={centerX}
                    y={centerY + 20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={
                      sg.name === "Light" ? whiteAlpha(0.45) : `${sg.glow}70`
                    }
                    fontSize="9"
                    fontFamily={fonts.heading}
                    letterSpacing="3"
                    fontWeight="700"
                  >
                    ENTER
                  </text>
                </g>
              );
            })()
          )}

          {/* God orbs */}
          {gods.map((g, i) => {
            const pos = getPosition(i),
              lp = getLabelPosition(i);
            const isA = activeGod === i,
              isO = oppositeIndex === i,
              isH = isA || isO;
            const isD = activeGod !== null && !isH;
            const cr = isH ? orbRadius + 5 : orbRadius;
            const isL = g.name === "Light";
            const isDV = g.name === "Darkness" || g.name === "Oblivion";
            const isExp = expandedGod === i;
            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredGod(i)}
                onMouseLeave={() => setHoveredGod(null)}
                onClick={() => handleGodClick(i)}
                style={{ cursor: "pointer" }}
              >
                {isL && (
                  <>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={cr + 22}
                      fill="white"
                      opacity={isH ? 0.1 : 0.03}
                      filter="url(#ls)"
                      style={{
                        transition: "opacity 0.4s",
                        animation: "lightRadiance 4s ease-in-out infinite",
                      }}
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={cr + 14}
                      fill="white"
                      opacity={isH ? 0.12 : 0.05}
                      filter="url(#bg)"
                      style={{ transition: "opacity 0.4s" }}
                    />
                  </>
                )}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={cr + 16}
                  fill={g.glow}
                  opacity={isH ? 0.3 : isD ? 0.015 : 0.05}
                  filter="url(#bg)"
                  style={{ transition: "opacity 0.4s" }}
                />
                {isDV && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={cr + 2}
                    fill="none"
                    stroke={isH ? whiteAlpha(0.15) : whiteAlpha(0.08)}
                    strokeWidth="1.5"
                  />
                )}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={cr}
                  fill={`url(#o${i})`}
                  filter="url(#gl)"
                  stroke={isExp ? "#d4af37" : isH ? g.glow : whiteAlpha(0.06)}
                  strokeWidth={isExp ? 3 : isH ? 2 : 0.5}
                  opacity={isD ? 0.35 : 1}
                  style={{ transition: "all 0.3s" }}
                />
                <circle
                  cx={pos.x - 4}
                  cy={pos.y - 5}
                  r={cr * 0.25}
                  fill="white"
                  opacity={isL ? 0.6 : isH ? 0.35 : isD ? 0.03 : 0.12}
                />
                {/* Larger invisible hit area on mobile */}
                {isMobile && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={cr + 20}
                    fill="transparent"
                  />
                )}
                <text
                  x={lp.x}
                  y={lp.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={
                    isH
                      ? isL
                        ? "#FFF"
                        : g.glow
                      : isD
                        ? whiteAlpha(0.15)
                        : g.side === "light"
                          ? whiteAlpha(0.65)
                          : whiteAlpha(0.4)
                  }
                  fontSize={isH ? "13" : "11"}
                  fontFamily={fonts.heading}
                  fontWeight={isH ? "700" : "600"}
                  letterSpacing="2px"
                  style={{
                    transition: "all 0.3s",
                    textShadow: isH ? `0 0 25px ${g.glow}60` : "none",
                  }}
                >
                  {g.name.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* INFO PANEL */}
      {selectedGod !== null && expandedGod === null && (
        <GodPreview
          god={gods[selectedGod]}
          oppositeGod={gods[(selectedGod + 6) % 12]}
          onExpand={() => expandToDetail(selectedGod)}
          isMobile={isMobile}
        />
      )}

      {selectedGod === null && (
        <p
          style={{
            textAlign: "center",
            fontFamily: fonts.heading,
            fontSize: "11px",
            color: whiteAlpha(0.18),
            letterSpacing: "4px",
            textTransform: "uppercase",
            padding: "0 20px 30px",
          }}
        >
          Touch a god to reveal their opposition
        </p>
      )}

      {/* DRAWER MODAL */}
      {expandedGod !== null && (
        <GodDetail
          godIndex={expandedGod}
          onClose={() => {
            setExpandedGod(null);
            setSelectedGod(null);
          }}
          onNavigate={navigateGod}
          onOpenStory={onOpenStory}
          isMobile={isMobile}
        />
      )}

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          padding: "20px 24px 16px",
          borderTop: `1px solid ${goldAlpha(0.04)}`,
        }}
      >
        {onOpenStory && (
          <button
            onClick={() => onOpenStory(null)}
            style={{
              background: `${goldAlpha(0.05)}`,
              border: `1px solid ${goldAlpha(0.15)}`,
              color: goldAlpha(0.5),
              fontFamily: fonts.heading,
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              padding: "12px 28px",
              cursor: "pointer",
              borderRadius: "2px",
              marginBottom: "16px",
            }}
          >
            &#9733; Read the Story
          </button>
        )}
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: "13px",
            fontStyle: "italic",
            color: whiteAlpha(0.12),
            maxWidth: "450px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          The wheel turns. The gods endure. None are good. None are evil. They
          simply are &mdash; and in their eternal dance, everything that ever
          was and ever will be takes shape.
        </p>
      </div>
    </>
  );
}
