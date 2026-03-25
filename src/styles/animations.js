export const slowRotate = `@keyframes slowRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;

export const connectionPulse = `@keyframes connectionPulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.65; } }`;

export const lightRadiance = `@keyframes lightRadiance { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.12; } }`;

export const fadeIn = `@keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`;

export const centerPulse = `@keyframes centerPulse { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.35; } }`;

export const slideUp = `@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`;

export const allKeyframes = [
  slowRotate,
  connectionPulse,
  lightRadiance,
  fadeIn,
  centerPulse,
  slideUp,
].join("\n");
