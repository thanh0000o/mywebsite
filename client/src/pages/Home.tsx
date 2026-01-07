import { useEffect, useState } from "react";
import { CrtOverlay } from "@/components/CrtOverlay";
import { TerminalText } from "@/components/TerminalText";
import { useLogVisitor } from "@/hooks/use-visitors";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "@assets/thanh1000_layer_data_and_nature_and_invert_it_and_use_vietname_1767797246973.png";

export default function Home() {
  const { mutate: logVisitor } = useLogVisitor();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Log visitor on mount
    logVisitor({
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });

    // Slight delay for "boot up" sequence
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, [logVisitor]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none cursor-crosshair">
      {/* Background Layer - Preserving Pixel Integrity */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          imageRendering: 'pixelated', // CSS Standard
          // @ts-ignore - Vendor specific but necessary for full coverage
          imageRendering: '-moz-crisp-edges',
          imageRendering: 'crisp-edges',
        }}
      />

      {/* CRT Effects Layer */}
      <CrtOverlay />

      {/* Minimal Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="text-center"
            >
              <div className="bg-black/80 border border-primary/30 p-8 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <TerminalText 
                  text="SYSTEM_READY" 
                  className="text-4xl md:text-6xl text-primary font-bold mb-2 text-shadow-glow"
                  glitch
                />
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="mt-4 font-mono text-sm md:text-base text-primary/80"
                >
                  <p>CONNECTION ESTABLISHED :: SECURE LINK</p>
                  <p className="mt-1 text-xs opacity-50">V.1.0.4 [DATAMOSH_PROTOCOL]</p>
                </motion.div>
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="mt-12 px-8 py-3 border border-primary text-primary font-display text-xl tracking-widest hover:text-white hover:border-white transition-colors duration-200 bg-black/50 backdrop-blur-md uppercase"
                onClick={() => window.location.reload()}
              >
                Reboot System
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative corner UI elements */}
        <div className="absolute top-8 left-8 text-xs font-mono text-primary/40 hidden md:block">
          <p>MEM: 64KB OK</p>
          <p>CPU: 8MHZ</p>
        </div>

        <div className="absolute bottom-8 right-8 text-xs font-mono text-primary/40 hidden md:block text-right">
          <p>SIGNAL: STRONG</p>
          <p>ENCRYPTION: NONE</p>
        </div>
      </div>
    </div>
  );
}
