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
