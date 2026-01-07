import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CrtOverlay } from "@/components/CrtOverlay";
import { DesktopIcon } from "@/components/DesktopIcon";
import { DreamweaverWindow } from "@/components/DreamweaverWindow";
import { DesktopWindow } from "@/components/DesktopWindow";
import { AboutMeContent } from "@/components/AboutMeContent";
import { EducationContent } from "@/components/EducationContent";
import { ExperienceContent } from "@/components/ExperienceContent";
import { ValuesContent } from "@/components/ValuesContent";
import { SkillsContent } from "@/components/SkillsContent";
import { LanguagesContent } from "@/components/LanguagesContent";
import { SoftwareContent } from "@/components/SoftwareContent";
import { ArtContent } from "@/components/ArtContent";
import { MediaPlayer } from "@/components/MediaPlayer";
import logoImage from "@assets/image_1767797842217.png";

interface WindowState {
  id: string;
  type: string;
  title: string;
  position: { x: number; y: number };
  width: string;
  height: string;
  zIndex: number;
}

let windowIdCounter = 0;

export default function Home() {
  const [showDreamweaver, setShowDreamweaver] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [topZIndex, setTopZIndex] = useState(100);

  const openWindow = (type: string, title: string) => {
    const existingWindow = windows.find((w) => w.type === type);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    // Get viewport dimensions for responsive positioning
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Random position within visible area - constrained to viewport
    const maxX = Math.max(50, vw - 450);
    const maxY = Math.max(30, vh - 400);
    const randomX = Math.floor(Math.random() * Math.min(maxX, 400)) + 20;
    const randomY = Math.floor(Math.random() * Math.min(maxY, 250)) + 20;
    
    // Set size based on content type - use responsive values
    let width = "min(400px, 90vw)";
    let height = "min(300px, 70vh)";
    if (type === "aboutme") {
      width = "min(650px, 90vw)";
      height = "min(520px, 80vh)";
    } else if (type === "education") {
      width = "min(320px, 90vw)";
      height = "min(180px, 50vh)";
    } else if (type === "experience") {
      width = "min(320px, 90vw)";
      height = "min(220px, 60vh)";
    } else if (type === "values") {
      width = "min(300px, 90vw)";
      height = "min(200px, 55vh)";
    } else if (type === "skills") {
      width = "min(320px, 90vw)";
      height = "min(160px, 50vh)";
    } else if (type === "languages") {
      width = "min(360px, 90vw)";
      height = "min(260px, 65vh)";
    } else if (type === "software") {
      width = "min(420px, 90vw)";
      height = "min(320px, 70vh)";
    } else if (type === "art") {
      width = "min(620px, 90vw)";
      height = "min(500px, 80vh)";
    }
    
    const newWindow: WindowState = {
      id: `window-${windowIdCounter++}`,
      type,
      title,
      position: { x: randomX, y: randomY },
      width,
      height,
      zIndex: topZIndex + 1,
    };
    setTopZIndex(topZIndex + 1);
    setWindows([...windows, newWindow]);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

  const focusWindow = (id: string) => {
    setWindows(
      windows.map((w) =>
        w.id === id ? { ...w, zIndex: topZIndex + 1 } : w
      )
    );
    setTopZIndex(topZIndex + 1);
  };

  const renderWindowContent = (type: string) => {
    switch (type) {
      case "aboutme":
        return <AboutMeContent />;
      case "education":
        return <EducationContent />;
      case "experience":
        return <ExperienceContent />;
      case "values":
        return <ValuesContent />;
      case "skills":
        return <SkillsContent />;
      case "languages":
        return <LanguagesContent />;
      case "software":
        return <SoftwareContent />;
      case "art":
        return <ArtContent />;
      default:
        return <div className="p-4">Content coming soon...</div>;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 
        =====================================================
        BACKGROUND LAYER
        =====================================================
        Black background with subtle blur texture
        =====================================================
      */}
      <div 
        className="absolute inset-0 w-full h-full blur-xl scale-110 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%, #000000 100%)'
        }}
      />

      {/* 
        =====================================================
        DESKTOP VIEW
        =====================================================
        Retro styled icons with hover effects
        =====================================================
      */}
      <AnimatePresence>
        {!showDreamweaver && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center">
              <DesktopIcon
                imageSrc={logoImage}
                label="portfolio_thànhlambeets"
                onClick={() => setShowDreamweaver(true)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        =====================================================
        DREAMWEAVER WINDOW
        =====================================================
        Retro 1990s style application window
        =====================================================
      */}
      <AnimatePresence>
        {showDreamweaver && (
          <DreamweaverWindow 
            onClose={() => setShowDreamweaver(false)} 
            onOpenWindow={openWindow}
          />
        )}
      </AnimatePresence>

      {/* 
        =====================================================
        DESKTOP WINDOWS
        =====================================================
        Draggable windows for different content
        =====================================================
      */}
      <AnimatePresence>
        {windows.map((window) => (
          <DesktopWindow
            key={window.id}
            id={window.id}
            title={window.title}
            initialPosition={window.position}
            width={window.width}
            height={window.height}
            zIndex={window.zIndex}
            onFocus={() => focusWindow(window.id)}
            onClose={() => closeWindow(window.id)}
          >
            {renderWindowContent(window.type)}
          </DesktopWindow>
        ))}
      </AnimatePresence>

      {/* Footer Text */}
      <div 
        className="absolute bottom-4 left-0 right-0 flex justify-center z-10"
      >
        <p 
          className="text-[10px] text-white/40 tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          style={{ fontFamily: 'var(--font-pixel)' }}
        >
          © 2000-2026 | designed on a 2560 x 1440 screen & <a href="https://jeffhuang.com/designed_to_last/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#6699ff' }} data-testid="link-designed-to-last">to last</a>
        </p>
      </div>

      {/* Media Player - Top Right */}
      <MediaPlayer />

      {/* CRT / SCANLINE OVERLAY */}
      <CrtOverlay />
    </div>
  );
}
