import { allKeyframes } from "./animations";

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
  ${allKeyframes}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #000003; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.15); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.3); }
`;
