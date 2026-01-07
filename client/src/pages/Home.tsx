import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CrtOverlay } from "@/components/CrtOverlay";
import { DesktopIcon } from "@/components/DesktopIcon";
import { DreamweaverWindow } from "@/components/DreamweaverWindow";
import logoImage from "@assets/image_1767797842217.png";

export default function Home() {
  const [showDreamweaver, setShowDreamweaver] = useState(false);

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
                label="portfolio_gerritthànhlambeets"
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
          <DreamweaverWindow onClose={() => setShowDreamweaver(false)} />
        )}
      </AnimatePresence>

      {/* Footer Text */}
      <div 
        className="absolute bottom-4 left-0 right-0 flex justify-center z-10"
      >
        <p 
          className="text-[10px] text-white/40 tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          style={{ fontFamily: 'var(--font-pixel)' }}
        >
          © 2000-2026 | designed on a 2560 x 1440 screen & to last
        </p>
      </div>

      {/* CRT / SCANLINE OVERLAY */}
      <CrtOverlay />
    </div>
  );
}
