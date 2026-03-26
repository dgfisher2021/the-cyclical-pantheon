export const colors = {
  gold: "#d4af37",
  goldDark: "#DAA520",
  bg: "#000003",
  bgMid: "#08080f",
  bgLight: "#141428",
};

export const goldAlpha = (a) => `rgba(212,175,55,${a})`;
export const whiteAlpha = (a) => `rgba(255,255,255,${a})`;

export function godColor(god, alpha = 1) {
  if (god.name === "Light") return alpha < 1 ? whiteAlpha(alpha) : "#FFF";
  if (alpha < 1)
    return `${god.glow}${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0")}`;
  return god.glow;
}

export const fonts = {
  display: "'Cinzel Decorative', serif",
  heading: "'Cinzel', serif",
  body: "'Cormorant Garamond', serif",
  base: "'Cinzel', 'Palatino Linotype', serif",
};

export const breakpoints = {
  mobile: 640,
  tablet: 1024,
};

/**
 * Returns special text styling for gods whose default colors have
 * readability issues on dark backgrounds (Light = white, Darkness = near-black).
 * Returns null for gods that don't need special treatment.
 */
export function godTextStyle(god) {
  if (god.name === "Light") {
    return {
      color: "rgba(255,255,255,0.95)",
      textShadow:
        "0 0 8px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,248,220,0.15)",
    };
  }
  if (god.name === "Darkness") {
    return {
      color: "rgba(180,180,195,0.9)",
      textShadow:
        "0 0 8px rgba(63,63,70,0.8), 0 0 20px rgba(0,0,0,0.6), 0 0 3px rgba(180,180,195,0.3)",
    };
  }
  return null;
}
