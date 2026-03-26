import { useState, useRef, useEffect } from "react";
import { chapters } from "../../data/storyMeta";
import { fonts, goldAlpha, whiteAlpha } from "../../styles/theme";

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function formatRate(rate) {
  if (rate === Math.floor(rate)) return `${rate}x`;
  // Show minimal decimals: 1.1x not 1.10x, but 1.25x stays
  const str = rate.toFixed(2).replace(/0+$/, "");
  return `${str}x`;
}

const PRESETS = [0.75, 1, 1.25, 1.5, 1.75, 2];

function SpeedPopup({ playbackRate, onSetRate, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        right: 0,
        width: "200px",
        background: "rgba(8,8,15,0.96)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${goldAlpha(0.2)}`,
        borderRadius: "10px",
        padding: "16px",
        zIndex: 60,
        animation: "fadeIn 0.2s ease",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
      }}
    >
      {/* Current speed display */}
      <p
        style={{
          fontFamily: fonts.heading,
          fontSize: "13px",
          color: goldAlpha(0.8),
          letterSpacing: "2px",
          textAlign: "center",
          marginBottom: "12px",
        }}
      >
        {formatRate(playbackRate)}
      </p>

      {/* Slider */}
      <input
        type="range"
        min="0.5"
        max="2.5"
        step="0.05"
        value={playbackRate}
        onChange={(e) => onSetRate(parseFloat(e.target.value))}
        style={{
          width: "100%",
          marginBottom: "12px",
          accentColor: "#d4af37",
          cursor: "pointer",
          height: "20px",
        }}
      />

      {/* Presets */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          justifyContent: "center",
        }}
      >
        {PRESETS.map((rate) => (
          <button
            key={rate}
            onClick={() => {
              onSetRate(rate);
              onClose();
            }}
            style={{
              background:
                playbackRate === rate ? goldAlpha(0.2) : goldAlpha(0.06),
              border: `1px solid ${playbackRate === rate ? goldAlpha(0.4) : goldAlpha(0.12)}`,
              color:
                playbackRate === rate ? goldAlpha(0.9) : goldAlpha(0.5),
              fontFamily: fonts.heading,
              fontSize: "11px",
              padding: "6px 10px",
              cursor: "pointer",
              borderRadius: "6px",
              minWidth: "44px",
              minHeight: "32px",
            }}
          >
            {formatRate(rate)}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Persistent narration bar fixed at the bottom of the viewport.
 * Shows play/pause, progress, chapter name, time, and speed control.
 */
export default function NarrationBar({
  playing,
  globalTime,
  totalDuration,
  chapterId,
  playbackRate,
  onToggle,
  onSeek,
  onStop,
  onSetRate,
  onCycleRate,
  isMobile,
}) {
  const [showSpeed, setShowSpeed] = useState(false);
  const pct = totalDuration > 0 ? (globalTime / totalDuration) * 100 : 0;
  const chapter = chapters[chapterId];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: isMobile ? 0 : "240px",
        right: 0,
        zIndex: 50,
        background: "rgba(8,8,15,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: `1px solid ${goldAlpha(0.25)}`,
      }}
    >
      {/* Progress bar — larger touch target wrapping thin visual bar */}
      <div
        style={{
          padding: "8px 0 4px",
          cursor: "pointer",
        }}
        onClick={(e) => {
          if (!totalDuration) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = Math.max(
            0,
            Math.min(1, (e.clientX - rect.left) / rect.width),
          );
          onSeek(ratio * totalDuration);
        }}
      >
        <div
          style={{
            height: "3px",
            background: goldAlpha(0.15),
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: goldAlpha(0.7),
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>

      {/* Controls row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "6px" : "14px",
          padding: isMobile ? "4px 10px 8px" : "4px 20px 8px",
        }}
      >
        {/* Play/Pause */}
        <button
          onClick={onToggle}
          style={{
            background: "none",
            border: "none",
            color: goldAlpha(playing ? 0.9 : 0.65),
            fontSize: "22px",
            cursor: "pointer",
            padding: "6px",
            lineHeight: 1,
            flexShrink: 0,
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {playing ? "\u275A\u275A" : "\u25B6"}
        </button>

        {/* Chapter info */}
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          <p
            style={{
              fontFamily: fonts.heading,
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: goldAlpha(0.8),
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {chapter?.title || chapterId}
          </p>
        </div>

        {/* Time */}
        <span
          style={{
            fontFamily: fonts.heading,
            fontSize: "11px",
            color: goldAlpha(0.6),
            letterSpacing: "1px",
            flexShrink: 0,
          }}
        >
          {formatTime(globalTime)} / {formatTime(totalDuration)}
        </span>

        {/* Speed button + popup */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button
            onClick={() =>
              onSetRate ? setShowSpeed(!showSpeed) : onCycleRate?.()
            }
            title="Playback speed"
            style={{
              background: playbackRate !== 1 ? goldAlpha(0.12) : "none",
              border: `1px solid ${playbackRate !== 1 ? goldAlpha(0.25) : "transparent"}`,
              color: playbackRate !== 1 ? goldAlpha(0.85) : goldAlpha(0.55),
              fontFamily: fonts.heading,
              fontSize: "11px",
              letterSpacing: "1px",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "6px",
              minWidth: "44px",
              minHeight: "36px",
              textAlign: "center",
            }}
          >
            {formatRate(playbackRate)}
          </button>
          {showSpeed && onSetRate && (
            <SpeedPopup
              playbackRate={playbackRate}
              onSetRate={onSetRate}
              onClose={() => setShowSpeed(false)}
            />
          )}
        </div>

        {/* Stop button */}
        <button
          onClick={onStop}
          title="Stop narration"
          style={{
            background: "none",
            border: "none",
            color: whiteAlpha(0.45),
            fontSize: "18px",
            cursor: "pointer",
            padding: "6px",
            lineHeight: 1,
            flexShrink: 0,
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &#9632;
        </button>
      </div>
    </div>
  );
}
