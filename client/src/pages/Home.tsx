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
import { Guestbook } from "@/components/Guestbook";
import logoImage from "@assets/image_1767797842217.png";
import backgroundImage from "@assets/thanh1000_layer_data_and_nature_and_invert_it_and_use_japanes__1768055536677.png";

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
        Datamoshing nature/data image with Win95 effects
        =====================================================
      */}
      
      {/* Base background - darkened */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Main background image with slow drift animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [0, -20, 0, 20, 0],
          y: [0, 10, -10, 5, 0],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          filter: 'saturate(0.7) contrast(1.1)',
        }}
      />
      
      {/* Datamosh color channel shift - Red */}
      <motion.div
        className="absolute inset-0 mix-blend-screen pointer-events-none"
        animate={{
          x: [0, 3, -2, 4, 0],
          opacity: [0.15, 0.25, 0.1, 0.2, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(2) hue-rotate(-30deg) brightness(0.8)',
          opacity: 0.15,
        }}
      />
      
      {/* Datamosh color channel shift - Cyan */}
      <motion.div
        className="absolute inset-0 mix-blend-multiply pointer-events-none"
        animate={{
          x: [-2, 0, 3, -1, -2],
          opacity: [0.2, 0.1, 0.25, 0.15, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(1.5) hue-rotate(180deg) brightness(0.6)',
          opacity: 0.2,
        }}
      />
      
      {/* Glitch slice effect - horizontal bands */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        animate={{
          opacity: [0, 0, 0.8, 0, 0, 0.6, 0, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          times: [0, 0.4, 0.42, 0.44, 0.7, 0.72, 0.74, 1],
        }}
      >
        <div
          className="absolute w-full h-[3px]"
          style={{
            top: '23%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 23%',
            transform: 'translateX(15px)',
            filter: 'brightness(1.5) saturate(2)',
          }}
        />
        <div
          className="absolute w-full h-[2px]"
          style={{
            top: '67%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 67%',
            transform: 'translateX(-20px)',
            filter: 'brightness(1.3) hue-rotate(90deg)',
          }}
        />
        <div
          className="absolute w-full h-[4px]"
          style={{
            top: '45%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 45%',
            transform: 'translateX(8px)',
            filter: 'invert(1) brightness(0.8)',
          }}
        />
      </motion.div>
      
      {/* Win95 scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          opacity: 0.6,
        }}
      />
      
      {/* Pixelated noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23fff' fill-opacity='0.03' /%3E%3Crect x='4' y='2' width='1' height='1' fill='%23fff' fill-opacity='0.05' /%3E%3Crect x='2' y='5' width='1' height='1' fill='%23fff' fill-opacity='0.02' /%3E%3Crect x='6' y='7' width='1' height='1' fill='%23fff' fill-opacity='0.04' /%3E%3Crect x='1' y='3' width='1' height='1' fill='%23000' fill-opacity='0.05' /%3E%3Crect x='5' y='1' width='1' height='1' fill='%23000' fill-opacity='0.03' /%3E%3Crect x='7' y='4' width='1' height='1' fill='%23000' fill-opacity='0.04' /%3E%3Crect x='3' y='6' width='1' height='1' fill='%23000' fill-opacity='0.02' /%3E%3C/svg%3E")`,
          backgroundSize: '8px 8px',
          imageRendering: 'pixelated',
        }}
      />
      
      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
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
        {/* Instagram Link - thanh0000 - Win95 Camera Style */}
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
            <div className="absolute -inset-4 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <svg 
              width="40" 
              height="36" 
              viewBox="0 0 40 36" 
              className="relative drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] transition-all duration-300"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* Camera body - main grey box with Win95 bevels */}
              <rect x="2" y="8" width="36" height="26" fill="#c0c0c0"/>
              {/* Top bevel - light */}
              <rect x="2" y="8" width="36" height="2" fill="#ffffff"/>
              {/* Left bevel - light */}
              <rect x="2" y="8" width="2" height="26" fill="#ffffff"/>
              {/* Bottom bevel - dark */}
              <rect x="2" y="32" width="36" height="2" fill="#808080"/>
              {/* Right bevel - dark */}
              <rect x="36" y="8" width="2" height="26" fill="#808080"/>
              
              {/* Viewfinder bump on top */}
              <rect x="14" y="2" width="12" height="8" fill="#c0c0c0"/>
              <rect x="14" y="2" width="12" height="2" fill="#ffffff"/>
              <rect x="14" y="2" width="2" height="8" fill="#ffffff"/>
              <rect x="24" y="2" width="2" height="8" fill="#808080"/>
              
              {/* Lens - outer dark ring */}
              <rect x="12" y="14" width="16" height="16" fill="#404040"/>
              {/* Lens - inner beveled ring */}
              <rect x="14" y="16" width="12" height="12" fill="#000080"/>
              {/* Lens - glass center */}
              <rect x="16" y="18" width="8" height="8" fill="#000000"/>
              {/* Lens - reflection highlight */}
              <rect x="17" y="19" width="3" height="2" fill="#4040ff"/>
              <rect x="18" y="20" width="1" height="1" fill="#ffffff"/>
              
              {/* Flash - red square */}
              <rect x="30" y="12" width="6" height="6" fill="#ff0000"/>
              <rect x="31" y="13" width="2" height="2" fill="#ff8080"/>
              
              {/* Shutter button */}
              <rect x="6" y="12" width="4" height="4" fill="#808080"/>
              <rect x="6" y="12" width="4" height="1" fill="#404040"/>
              <rect x="6" y="12" width="1" height="4" fill="#404040"/>
              <rect x="7" y="13" width="2" height="2" fill="#c0c0c0"/>
              
              {/* Film advance knob */}
              <rect x="30" y="2" width="6" height="6" fill="#808080"/>
              <rect x="31" y="3" width="4" height="4" fill="#606060"/>
              <rect x="32" y="4" width="2" height="2" fill="#404040"/>
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

      {/* Guestbook - Bottom Left */}
      <Guestbook />

      {/* CRT / SCANLINE OVERLAY */}
      <CrtOverlay />
    </div>
  );
}
