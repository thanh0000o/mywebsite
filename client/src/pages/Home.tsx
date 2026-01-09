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
import { WebsiteArchiveContent } from "@/components/WebsiteArchiveContent";
import { ResumeContent } from "@/components/ResumeContent";
import { PhotoAlbumsContent } from "@/components/PhotoAlbumsContent";
import { DragonLogoContent } from "@/components/DragonLogoContent";
import { UnderConstructionContent } from "@/components/UnderConstructionContent";
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
    
    // Calculate constrained random position - keep windows in central area
    // Define a "safe zone" that's roughly 20-80% of the viewport
    const marginX = Math.max(80, vw * 0.15); // 15% margin from edges, min 80px
    const marginY = Math.max(60, vh * 0.12); // 12% margin from edges, min 60px
    
    // Calculate safe bounds (where windows can spawn)
    const safeMinX = marginX;
    const safeMaxX = Math.max(marginX + 100, vw - marginX - 450); // Account for window width
    const safeMinY = marginY;
    const safeMaxY = Math.max(marginY + 100, vh - marginY - 400); // Account for window height
    
    // Random position within the safe central zone
    // Add small random offset from center for variety
    const centerX = vw / 2 - 200;
    const centerY = vh / 2 - 200;
    const offsetRange = 150; // How far from center windows can spawn
    
    let randomX = centerX + (Math.random() * offsetRange * 2 - offsetRange);
    let randomY = centerY + (Math.random() * offsetRange * 2 - offsetRange);
    
    // Clamp to safe bounds
    randomX = Math.max(safeMinX, Math.min(safeMaxX, randomX));
    randomY = Math.max(safeMinY, Math.min(safeMaxY, randomY));
    
    // Round to integers
    randomX = Math.floor(randomX);
    randomY = Math.floor(randomY);
    
    // Set size based on content type - use responsive values
    let width = "min(400px, 90vw)";
    let height = "min(300px, 70vh)";
    if (type === "aboutme") {
      width = "min(700px, 95vw)";
      height = "min(550px, 85vh)";
    } else if (type === "education") {
      width = "min(420px, 90vw)";
      height = "min(220px, 60vh)";
    } else if (type === "experience") {
      width = "min(450px, 90vw)";
      height = "min(300px, 70vh)";
    } else if (type === "values") {
      width = "min(300px, 90vw)";
      height = "min(200px, 55vh)";
    } else if (type === "skills") {
      width = "min(320px, 90vw)";
      height = "min(160px, 50vh)";
    } else if (type === "languages") {
      width = "min(400px, 90vw)";
      height = "min(280px, 65vh)";
    } else if (type === "software") {
      width = "min(420px, 90vw)";
      height = "min(320px, 70vh)";
    } else if (type === "art") {
      width = "min(620px, 90vw)";
      height = "min(500px, 80vh)";
    } else if (type === "archive") {
      width = "min(900px, 95vw)";
      height = "min(700px, 90vh)";
    } else if (type === "photoalbums") {
      width = "min(520px, 95vw)";
      height = "min(380px, 80vh)";
    } else if (type === "dragonlogo") {
      width = "min(420px, 90vw)";
      height = "min(380px, 75vh)";
    } else if (type === "resume") {
      width = "min(900px, 95vw)";
      height = "min(750px, 90vh)";
    } else if (type === "underconstruction") {
      width = "min(420px, 90vw)";
      height = "min(400px, 75vh)";
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
      case "archive":
        return <WebsiteArchiveContent />;
      case "photoalbums":
        return <PhotoAlbumsContent />;
      case "dragonlogo":
        return <DragonLogoContent />;
      case "resume":
        return <ResumeContent />;
      case "underconstruction":
        return <UnderConstructionContent />;
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
        DESKTOP VIEW - Portfolio Icon (always visible)
        =====================================================
        Retro styled icons with hover effects
        =====================================================
      */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="flex flex-col items-center">
          <DesktopIcon
            imageSrc={logoImage}
            label="portfolio_thànhlambeets"
            onClick={() => setShowDreamweaver(true)}
          />
        </div>
      </div>

      {/* 
        =====================================================
        DESKTOP ICONS - Top Left
        =====================================================
        Website Archive folder & Resume PDF - always visible
        =====================================================
      */}
      <div className="absolute top-4 left-4 flex flex-col gap-2" style={{ zIndex: 50 }}>
        {/* Instagram Link - thanh0000 - Frutiger Aero Style */}
        <motion.a
          href="https://www.instagram.com/thanh0000o/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-2 group"
          style={{ background: 'transparent', textDecoration: 'none' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="link-instagram"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-cyan-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <svg 
              width="44" 
              height="44" 
              viewBox="0 0 44 44" 
              className="relative drop-shadow-[0_0_12px_rgba(77,217,255,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(77,217,255,0.8)] transition-all duration-300"
            >
              <defs>
                {/* Main body gradient - sky blue aero */}
                <linearGradient id="aeroBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#b8e4ff"/>
                  <stop offset="25%" stopColor="#7dd3fc"/>
                  <stop offset="50%" stopColor="#38bdf8"/>
                  <stop offset="75%" stopColor="#0ea5e9"/>
                  <stop offset="100%" stopColor="#0284c7"/>
                </linearGradient>
                {/* Glass highlight gradient */}
                <linearGradient id="aeroGlassHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
                </linearGradient>
                {/* Lens gradient - deep navy to cyan */}
                <radialGradient id="aeroLensGrad" cx="40%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#67e8f9"/>
                  <stop offset="40%" stopColor="#22d3ee"/>
                  <stop offset="70%" stopColor="#0891b2"/>
                  <stop offset="100%" stopColor="#164e63"/>
                </radialGradient>
                {/* Inner lens - dark core */}
                <radialGradient id="aeroLensCore" cx="35%" cy="35%" r="50%">
                  <stop offset="0%" stopColor="#1e3a5f"/>
                  <stop offset="60%" stopColor="#0c1929"/>
                  <stop offset="100%" stopColor="#020617"/>
                </radialGradient>
                {/* Flash gradient - lime green aero */}
                <linearGradient id="aeroFlashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d9f99d"/>
                  <stop offset="50%" stopColor="#a3e635"/>
                  <stop offset="100%" stopColor="#65a30d"/>
                </linearGradient>
              </defs>
              
              {/* Outer glow/shadow base */}
              <rect x="4" y="4" width="36" height="36" rx="8" ry="8" fill="#0369a1" opacity="0.3"/>
              
              {/* Main camera body - rounded aero style */}
              <rect x="3" y="3" width="38" height="38" rx="9" ry="9" fill="url(#aeroBodyGrad)" stroke="#0284c7" strokeWidth="1"/>
              
              {/* Glass highlight overlay - top half shine */}
              <rect x="5" y="5" width="34" height="16" rx="7" ry="7" fill="url(#aeroGlassHighlight)"/>
              
              {/* Secondary subtle highlight */}
              <ellipse cx="22" cy="12" rx="14" ry="6" fill="#ffffff" opacity="0.25"/>
              
              {/* Camera lens outer ring - glossy */}
              <circle cx="22" cy="24" r="12" fill="url(#aeroLensGrad)" stroke="#0e7490" strokeWidth="1.5"/>
              
              {/* Lens inner ring */}
              <circle cx="22" cy="24" r="9" fill="url(#aeroLensCore)" stroke="#155e75" strokeWidth="1"/>
              
              {/* Lens innermost - deep black */}
              <circle cx="22" cy="24" r="5" fill="#020617"/>
              
              {/* Lens specular highlights */}
              <ellipse cx="19" cy="21" rx="2.5" ry="1.8" fill="#ffffff" opacity="0.85"/>
              <circle cx="25" cy="27" r="1" fill="#ffffff" opacity="0.4"/>
              
              {/* Flash/LED - top right with aero glow */}
              <circle cx="33" cy="11" r="4" fill="url(#aeroFlashGrad)" stroke="#84cc16" strokeWidth="0.5"/>
              <ellipse cx="32" cy="10" rx="1.5" ry="1" fill="#ffffff" opacity="0.8"/>
              
              {/* Instagram gradient accent stripe - bottom */}
              <rect x="8" y="36" width="7" height="3" rx="1" fill="#fbbf24"/>
              <rect x="15" y="36" width="7" height="3" rx="1" fill="#f472b6"/>
              <rect x="22" y="36" width="7" height="3" rx="1" fill="#a855f7"/>
              <rect x="29" y="36" width="7" height="3" rx="1" fill="#6366f1"/>
              
              {/* Bubble reflection - bottom right */}
              <circle cx="35" cy="32" r="2" fill="#ffffff" opacity="0.15"/>
            </svg>
          </div>
          <span
            className="mt-1 text-[9px] text-white text-center drop-shadow-md tracking-wide transition-transform duration-300 group-hover:scale-105"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            thanh0000
          </span>
        </motion.a>

        {/* Photo Albums Folder */}
        <motion.button
          onClick={() => openWindow("photoalbums", "PhotoAlbums")}
          className="flex flex-col items-center p-2 group"
          style={{ background: 'transparent' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="button-photoalbums-folder"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <svg 
              width="40" 
              height="36" 
              viewBox="0 0 40 36" 
              className="relative drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] transition-all duration-300"
              style={{ imageRendering: 'pixelated' }}
            >
              <rect x="0" y="6" width="40" height="30" fill="#ffd700"/>
              <rect x="0" y="0" width="16" height="10" fill="#ffd700"/>
              <rect x="2" y="8" width="36" height="26" fill="#e6c200"/>
              <rect x="4" y="10" width="32" height="2" fill="#fff" opacity="0.3"/>
            </svg>
          </div>
          <span
            className="mt-1 text-[9px] text-white text-center drop-shadow-md tracking-wide transition-transform duration-300 group-hover:scale-105"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            PhotoAlbums
          </span>
        </motion.button>

        {/* Website Archive Folder */}
        <motion.button
          onClick={() => openWindow("archive", "WebsiteArchive")}
          className="flex flex-col items-center p-2 group"
          style={{ background: 'transparent' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="button-archive-folder"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <svg 
              width="40" 
              height="36" 
              viewBox="0 0 40 36" 
              className="relative drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] transition-all duration-300"
              style={{ imageRendering: 'pixelated' }}
            >
              <rect x="0" y="6" width="40" height="30" fill="#ffd700"/>
              <rect x="0" y="0" width="16" height="10" fill="#ffd700"/>
              <rect x="2" y="8" width="36" height="26" fill="#e6c200"/>
              <rect x="4" y="10" width="32" height="2" fill="#fff" opacity="0.3"/>
            </svg>
          </div>
          <span
            className="mt-1 text-[9px] text-white text-center drop-shadow-md tracking-wide transition-transform duration-300 group-hover:scale-105"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            WebsiteArchive
          </span>
        </motion.button>

        {/* Under Construction Notepad File */}
        <motion.button
          onClick={() => openWindow("underconstruction", "notepad.txt")}
          className="flex flex-col items-center p-2 group"
          style={{ background: 'transparent' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="button-underconstruction"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-yellow-300/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <svg 
              width="36" 
              height="42" 
              viewBox="0 0 36 42" 
              className="relative drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] transition-all duration-300"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* Notepad document shape */}
              <rect x="2" y="2" width="28" height="38" fill="#fffef5" stroke="#808080" strokeWidth="2"/>
              {/* Folded corner */}
              <polygon points="22,2 30,10 22,10" fill="#e8e8d0" stroke="#808080" strokeWidth="1"/>
              {/* Notepad spiral binding */}
              <circle cx="6" cy="8" r="2" fill="#808080"/>
              <circle cx="6" cy="14" r="2" fill="#808080"/>
              <circle cx="6" cy="20" r="2" fill="#808080"/>
              <circle cx="6" cy="26" r="2" fill="#808080"/>
              <circle cx="6" cy="32" r="2" fill="#808080"/>
              {/* Text lines */}
              <rect x="10" y="10" width="14" height="2" fill="#c0c0c0"/>
              <rect x="10" y="15" width="12" height="2" fill="#c0c0c0"/>
              <rect x="10" y="20" width="15" height="2" fill="#c0c0c0"/>
              <rect x="10" y="25" width="10" height="2" fill="#c0c0c0"/>
              <rect x="10" y="30" width="13" height="2" fill="#c0c0c0"/>
              {/* Blue header line */}
              <rect x="2" y="2" width="28" height="4" fill="#000080"/>
            </svg>
          </div>
          <span
            className="mt-1 text-[9px] text-white text-center drop-shadow-md tracking-wide transition-transform duration-300 group-hover:scale-105"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            underconstruction.txt
          </span>
        </motion.button>

        {/* Resume PDF File */}
        <motion.button
          onClick={() => openWindow("resume", "Resume.pdf - Acrobat Reader")}
          className="flex flex-col items-center p-2 group"
          style={{ background: 'transparent' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="button-resume-pdf"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <svg 
              width="36" 
              height="42" 
              viewBox="0 0 36 42" 
              className="relative drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] transition-all duration-300"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* PDF document shape */}
              <rect x="2" y="2" width="28" height="38" fill="#fff" stroke="#808080" strokeWidth="2"/>
              {/* Folded corner */}
              <polygon points="22,2 30,10 22,10" fill="#C0C0C0" stroke="#808080" strokeWidth="1"/>
              {/* PDF text */}
              <rect x="6" y="16" width="20" height="4" fill="#cc0000"/>
              <text x="8" y="19" fill="#fff" style={{ fontSize: '4px', fontFamily: 'var(--font-pixel)' }}>PDF</text>
              {/* Document lines */}
              <rect x="6" y="24" width="18" height="2" fill="#808080"/>
              <rect x="6" y="28" width="14" height="2" fill="#808080"/>
              <rect x="6" y="32" width="16" height="2" fill="#808080"/>
              {/* Adobe red accent */}
              <rect x="2" y="2" width="4" height="38" fill="#cc0000"/>
            </svg>
          </div>
          <span
            className="mt-1 text-[9px] text-white text-center drop-shadow-md tracking-wide transition-transform duration-300 group-hover:scale-105"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            Resume.pdf
          </span>
        </motion.button>

        {/* Dragon Logo PNG File */}
        <motion.button
          onClick={() => openWindow("dragonlogo", "dragon_logo.png - MS Paint")}
          className="flex flex-col items-center p-2 group"
          style={{ background: 'transparent' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="button-dragon-png"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-purple-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <svg 
              width="36" 
              height="42" 
              viewBox="0 0 36 42" 
              className="relative drop-shadow-[0_0_15px_rgba(180,100,255,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(180,100,255,0.9)] transition-all duration-300"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* PNG document shape */}
              <rect x="2" y="2" width="28" height="38" fill="#fff" stroke="#808080" strokeWidth="2"/>
              {/* Folded corner */}
              <polygon points="22,2 30,10 22,10" fill="#C0C0C0" stroke="#808080" strokeWidth="1"/>
              {/* Image preview area - checkered pattern for transparency */}
              <rect x="6" y="12" width="20" height="16" fill="#c0c0c0"/>
              <rect x="6" y="12" width="5" height="4" fill="#fff"/>
              <rect x="16" y="12" width="5" height="4" fill="#fff"/>
              <rect x="11" y="16" width="5" height="4" fill="#fff"/>
              <rect x="21" y="16" width="5" height="4" fill="#fff"/>
              <rect x="6" y="20" width="5" height="4" fill="#fff"/>
              <rect x="16" y="20" width="5" height="4" fill="#fff"/>
              <rect x="11" y="24" width="5" height="4" fill="#fff"/>
              <rect x="21" y="24" width="5" height="4" fill="#fff"/>
              {/* Simple dragon silhouette */}
              <path d="M12 14 Q16 12 18 16 Q20 14 22 16 L20 20 Q18 24 16 22 L14 26 L12 22 Q10 20 12 14" fill="#000"/>
              {/* PNG text */}
              <rect x="6" y="30" width="20" height="4" fill="#8b5cf6"/>
              <text x="8" y="33" fill="#fff" style={{ fontSize: '4px', fontFamily: 'var(--font-pixel)' }}>PNG</text>
              {/* Purple accent */}
              <rect x="2" y="2" width="4" height="38" fill="#8b5cf6"/>
            </svg>
          </div>
          <span
            className="mt-1 text-[9px] text-white text-center drop-shadow-md tracking-wide transition-transform duration-300 group-hover:scale-105"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            dragon_logo.png
          </span>
        </motion.button>
      </div>

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
