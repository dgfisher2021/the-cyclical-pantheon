import { useState, useCallback } from "react";
import { globalStyles } from "./styles/globalStyles";
import { fonts } from "./styles/theme";
import { useIsMobile } from "./hooks/useMediaQuery";
import { godIndexByName } from "./data/gods";
import PantheonWheel from "./components/PantheonWheel";
import StoryMode from "./components/StoryMode/StoryMode";

export default function App() {
  const [view, setView] = useState("wheel");
  const [storyTarget, setStoryTarget] = useState(null);
  const [wheelInitialGod, setWheelInitialGod] = useState(null);
  const isMobile = useIsMobile();

  const openStory = useCallback((chapterId) => {
    setStoryTarget(chapterId ? { chapterId } : null);
    setView("story");
  }, []);

  const openWheel = useCallback((godName) => {
    if (godName && godIndexByName[godName] !== undefined) {
      setWheelInitialGod(godIndexByName[godName]);
    } else {
      setWheelInitialGod(null);
    }
    setView("wheel");
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at center, #141428 0%, #08080f 60%, #000003 100%)",
        fontFamily: fonts.base,
        color: "rgba(255,255,255,0.8)",
        overflow: "auto",
        position: "relative",
      }}
    >
      {/* Star-field background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
          radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.15), transparent),
          radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.1), transparent),
          radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.12), transparent),
          radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.08), transparent),
          radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.1), transparent),
          radial-gradient(1px 1px at 15% 55%, rgba(212,175,55,0.08), transparent),
          radial-gradient(1px 1px at 85% 25%, rgba(212,175,55,0.06), transparent),
          radial-gradient(1px 1px at 45% 90%, rgba(255,255,255,0.07), transparent),
          radial-gradient(1px 1px at 65% 60%, rgba(255,255,255,0.09), transparent),
          radial-gradient(1px 1px at 25% 35%, rgba(255,255,255,0.06), transparent)
        `,
          backgroundSize: "200px 200px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <style>{globalStyles}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        {view === "wheel" && (
          <PantheonWheel
            onOpenStory={openStory}
            initialSelectedGod={wheelInitialGod}
            isMobile={isMobile}
          />
        )}
        {view === "story" && (
          <StoryMode
            initialChapterId={storyTarget?.chapterId || null}
            onOpenWheel={openWheel}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
}
