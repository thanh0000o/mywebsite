import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import logoImage from "@assets/ChatGPT_Image_Jan_7,_2026,_12_04_31_PM_1767811147577.png";

interface DreamweaverWindowProps {
  onClose: () => void;
}

// Helper to quantize values in 4px steps for pixelated movement
function pixelate(value: number, step: number = 4): number {
  return Math.round(value / step) * step;
}

export function DreamweaverWindow({ onClose }: DreamweaverWindowProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const scrollIndicatorRef = useRef<HTMLParagraphElement>(null);
  const stemsRef = useRef<SVGPathElement[]>([]);
  const squaresRef = useRef<SVGRectElement[]>([]);
  
  const [stemLengths, setStemLengths] = useState<number[]>([]);

  // Initialize stem lengths and center logo on mount
  useEffect(() => {
    const lengths: number[] = [];
    stemsRef.current.forEach((stem) => {
      if (stem) {
        const length = stem.getTotalLength();
        lengths.push(length);
        stem.style.strokeDasharray = `${length}`;
        stem.style.strokeDashoffset = `${length}`;
      }
    });
    setStemLengths(lengths);
    
    // Center logo initially (with a small delay to ensure dimensions are computed)
    setTimeout(() => {
      const scrollContainer = scrollContainerRef.current;
      const logo = logoRef.current;
      if (scrollContainer && logo) {
        const canvasWidth = scrollContainer.offsetWidth - 20;
        const logoWidth = logo.offsetWidth;
        const startX = (canvasWidth - logoWidth) / 2;
        logo.style.left = `${startX}px`;
      }
    }, 50);
  }, []);

  // Scroll animation handler
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const canvas = canvasRef.current;
    if (!scrollContainer || !canvas) return;

    const handleScroll = () => {
      const scrollY = scrollContainer.scrollTop;
      const logo = logoRef.current;
      const scrollIndicator = scrollIndicatorRef.current;

      // Animation constants
      const logoAnimationEnd = 300;
      const flowerStart = 300;
      const flowerEnd = 1200;

      // LOGO ANIMATION (0-300px scroll)
      if (logo) {
        const canvasWidth = scrollContainer.offsetWidth - 20; // Account for padding
        const logoWidth = logo.offsetWidth;
        
        // Start position (centered - accounting for logo width)
        const startX = (canvasWidth - logoWidth) / 2;
        const startY = 80;
        
        // End position (top-left with padding)
        const endX = 20;
        const endY = 20;
        
        const logoProgress = Math.min(scrollY / logoAnimationEnd, 1);
        
        // Calculate new position with pixelation
        let newX = startX + (endX - startX) * logoProgress;
        let newY = startY + (endY - startY) * logoProgress;
        
        // Pixelate for stepped movement
        newX = pixelate(newX);
        newY = pixelate(newY);
        
        // Clamp to keep within canvas bounds
        newX = Math.max(endX, Math.min(newX, canvasWidth - logoWidth - 20));
        newY = Math.max(endY, newY);
        
        logo.style.left = `${newX}px`;
        logo.style.top = `${newY}px`;
        logo.style.transform = 'none';
      }

      // SCROLL INDICATOR FADE (0-50px scroll)
      if (scrollIndicator) {
        if (scrollY > 50) {
          scrollIndicator.style.opacity = '0';
          scrollIndicator.style.pointerEvents = 'none';
        } else {
          const opacity = Math.max(0, 1 - scrollY / 50);
          scrollIndicator.style.opacity = `${Math.round(opacity * 10) / 10}`;
          scrollIndicator.style.pointerEvents = 'auto';
        }
      }

      // FLOWER ANIMATION (300-1200px scroll)
      if (scrollY > flowerStart) {
        const flowerScrollRange = flowerEnd - flowerStart;
        const flowerProgress = Math.min((scrollY - flowerStart) / flowerScrollRange, 1);
        
        // Pixelate progress for stepped effect
        const pixelatedProgress = Math.floor(flowerProgress * 50) / 50;

        // Animate each stem with proper staggered timing
        stemsRef.current.forEach((stem, index) => {
          if (stem && stemLengths[index]) {
            const length = stemLengths[index];
            
            // Stagger each stem - earlier stems start sooner
            const stemCount = stemsRef.current.length;
            const delayFraction = index / stemCount * 0.3; // Max 30% delay for last stem
            const stemDuration = 1 - delayFraction; // Remaining duration for stem to grow
            
            // Calculate stem progress: starts at delayFraction, ends at 1
            let stemProgress = 0;
            if (pixelatedProgress > delayFraction) {
              stemProgress = Math.min(1, (pixelatedProgress - delayFraction) / stemDuration);
            }
            
            // Animate stem growth
            const offset = length * (1 - stemProgress);
            stem.style.strokeDashoffset = `${offset}`;
          }
        });

        // Show squares when their corresponding stem is 70% grown
        squaresRef.current.forEach((square, index) => {
          if (square && stemsRef.current[index]) {
            const stemCount = stemsRef.current.length;
            const delayFraction = index / stemCount * 0.3;
            const stemDuration = 1 - delayFraction;
            
            let stemProgress = 0;
            if (pixelatedProgress > delayFraction) {
              stemProgress = Math.min(1, (pixelatedProgress - delayFraction) / stemDuration);
            }
            
            // Show square when stem is 70% grown
            if (stemProgress >= 0.7) {
              square.style.opacity = '1';
            } else {
              square.style.opacity = '0';
            }
          }
        });
      } else {
        // Reset flower if scrolled back up
        stemsRef.current.forEach((stem, index) => {
          if (stem && stemLengths[index]) {
            stem.style.strokeDashoffset = `${stemLengths[index]}`;
          }
        });
        squaresRef.current.forEach((square) => {
          if (square) {
            square.style.opacity = '0';
          }
        });
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [stemLengths]);

  // Store ref for stems
  const addStemRef = (el: SVGPathElement | null, index: number) => {
    if (el) stemsRef.current[index] = el;
  };

  // Store ref for squares
  const addSquareRef = (el: SVGRectElement | null, index: number) => {
    if (el) squaresRef.current[index] = el;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      <div 
        className="w-[60vw] h-[60vh] flex flex-col"
        style={{
          backgroundColor: '#C0C0C0',
          boxShadow: '5px 5px 20px rgba(0,0,0,0.5)',
          borderTop: '2px solid #fff',
          borderLeft: '2px solid #fff',
          borderBottom: '2px solid #808080',
          borderRight: '2px solid #808080',
        }}
      >
        {/* Title Bar */}
        <div 
          className="flex items-center justify-between px-1 py-0.5"
          style={{
            background: 'linear-gradient(90deg, #000080, #1084d0)',
            color: 'white',
          }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 flex items-center justify-center"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '1px solid #fff',
                borderLeft: '1px solid #fff',
                borderBottom: '1px solid #808080',
                borderRight: '1px solid #808080',
              }}
            >
              <span className="text-[8px] text-black">W</span>
            </div>
            <span 
              className="text-sm font-bold"
              style={{ fontFamily: 'var(--font-pixel)', textShadow: '1px 1px 0 #000' }}
            >
              Untitled-1 - gerrit thành lambeets
            </span>
          </div>
          <div className="flex gap-0.5">
            {/* Minimize */}
            <button
              className="w-5 h-5 flex items-center justify-center text-black text-xs font-bold"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderBottom: '2px solid #808080',
                borderRight: '2px solid #808080',
              }}
              data-testid="button-minimize"
            >
              _
            </button>
            {/* Maximize */}
            <button
              className="w-5 h-5 flex items-center justify-center text-black text-xs font-bold"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderBottom: '2px solid #808080',
                borderRight: '2px solid #808080',
              }}
              data-testid="button-maximize"
            >
              □
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              className="w-5 h-5 flex items-center justify-center text-black text-xs font-bold"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderBottom: '2px solid #808080',
                borderRight: '2px solid #808080',
              }}
              data-testid="button-close"
            >
              X
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div 
          className="flex items-center gap-4 px-2 py-1 text-sm text-black"
          style={{
            backgroundColor: '#C0C0C0',
            borderBottom: '1px solid #808080',
            fontFamily: 'var(--font-pixel)',
          }}
        >
          {['File', 'Edit', 'View', 'Insert', 'Modify', 'Text', 'Window', 'Help'].map((item) => (
            <span 
              key={item} 
              className="cursor-pointer text-black"
              style={{ fontSize: '12px' }}
            >
              <span style={{ textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '2px' }}>{item[0]}</span>{item.slice(1)}
            </span>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div 
            className="flex flex-col gap-1 p-1"
            style={{
              width: '30px',
              backgroundColor: '#C0C0C0',
              borderRight: '1px solid #808080',
            }}
          >
            {['▼', '□', '⊞', '⊟', '▤', '●', '⟁', '⚡', '✦'].map((icon, i) => (
              <div
                key={i}
                className="w-5 h-5 flex items-center justify-center text-[8px] cursor-pointer text-black"
                style={{
                  backgroundColor: '#C0C0C0',
                  borderTop: '1px solid #fff',
                  borderLeft: '1px solid #fff',
                  borderBottom: '1px solid #808080',
                  borderRight: '1px solid #808080',
                }}
              >
                {icon}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex-1 flex flex-col">
            {/* Top Toolbar */}
            <div 
              className="flex items-center justify-between px-2 gap-2"
              style={{
                height: '40px',
                backgroundColor: '#C0C0C0',
                borderBottom: '1px solid #808080',
              }}
            >
              <div 
                className="w-6 h-6"
                style={{
                  backgroundColor: '#000080',
                  borderTop: '1px solid #fff',
                  borderLeft: '1px solid #fff',
                  borderBottom: '1px solid #808080',
                  borderRight: '1px solid #808080',
                }}
              />
              <div className="flex items-center gap-1">
                {['SITE', 'LIBRARY', 'STYLES', 'BEHAVIOR', 'TIMELINE', 'HTML'].map((tab) => (
                  <div
                    key={tab}
                    className="px-2 py-1 text-[10px] cursor-pointer text-black font-bold"
                    style={{
                      backgroundColor: '#C0C0C0',
                      borderTop: '2px solid #fff',
                      borderLeft: '2px solid #fff',
                      borderBottom: '2px solid #808080',
                      borderRight: '2px solid #808080',
                      fontFamily: 'var(--font-pixel)',
                    }}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>

            {/* Center Canvas - Scrollable with clip */}
            <div 
              ref={canvasRef}
              className="flex-1 m-1 relative overflow-hidden"
              style={{
                backgroundColor: '#fff',
                borderTop: '2px solid #808080',
                borderLeft: '2px solid #808080',
                borderBottom: '2px solid #fff',
                borderRight: '2px solid #fff',
              }}
            >
              {/* Inner scroll container */}
              <div 
                ref={scrollContainerRef}
                className="absolute inset-0 overflow-y-auto overflow-x-hidden"
                style={{ padding: '10px' }}
              >
                {/* Scrollable content container */}
                <div className="relative" style={{ minHeight: '1500px' }}>
                  {/* Logo Image - Positioned absolutely for animation */}
                  <img 
                    ref={logoRef}
                    src={logoImage}
                    alt="Thành Lambeets"
                    className="absolute w-40 h-auto object-contain"
                    style={{ 
                      imageRendering: 'pixelated',
                      top: '80px',
                    }}
                    draggable={false}
                  />
                  
                  {/* Scroll Here text */}
                  <p 
                    ref={scrollIndicatorRef}
                    className="absolute text-sm text-black font-bold"
                    style={{ 
                      fontFamily: 'var(--font-pixel)',
                      left: '50%',
                      top: '200px',
                      transform: 'translateX(-50%)',
                      transition: 'opacity 0.1s steps(5)',
                    }}
                  >
                    [SCROLL HERE]
                  </p>

                  {/* Flower SVG - 12 stems matching reference style */}
                  <svg 
                    id="flower" 
                    width="100%" 
                    height="350"
                    viewBox="0 0 400 350"
                    preserveAspectRatio="xMidYMid meet"
                    className="absolute"
                    style={{
                      left: '0',
                      top: '280px',
                      shapeRendering: 'crispEdges',
                    }}
                  >
                    {/* Center point at (200, 300) - bottom center */}
                    {/* Stem 1: Far left */}
                    <path ref={(el) => addStemRef(el, 0)} d="M 200,300 Q 120,250 60,120" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Stem 2: Left */}
                    <path ref={(el) => addStemRef(el, 1)} d="M 200,300 Q 140,220 100,80" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Stem 3: Center-left up */}
                    <path ref={(el) => addStemRef(el, 2)} d="M 200,300 Q 170,200 150,50" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Stem 4: Center-left */}
                    <path ref={(el) => addStemRef(el, 3)} d="M 200,300 Q 190,180 180,30" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Stem 5: Center */}
                    <path ref={(el) => addStemRef(el, 4)} d="M 200,300 Q 200,200 200,40" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Stem 6: Center-right */}
                    <path ref={(el) => addStemRef(el, 5)} d="M 200,300 Q 210,180 220,30" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Stem 7: Center-right up */}
                    <path ref={(el) => addStemRef(el, 6)} d="M 200,300 Q 230,200 250,50" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Stem 8: Right */}
                    <path ref={(el) => addStemRef(el, 7)} d="M 200,300 Q 260,220 300,80" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Stem 9: Far right */}
                    <path ref={(el) => addStemRef(el, 8)} d="M 200,300 Q 280,250 340,120" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Stem 10: Lower left curve */}
                    <path ref={(el) => addStemRef(el, 9)} d="M 200,300 Q 100,320 40,260" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Stem 11: Lower right curve */}
                    <path ref={(el) => addStemRef(el, 10)} d="M 200,300 Q 300,320 360,260" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Stem 12: Straight down */}
                    <path ref={(el) => addStemRef(el, 11)} d="M 200,300 L 200,340" 
                          stroke="#00AA00" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    
                    {/* Portfolio squares at stem endpoints */}
                    <rect ref={(el) => addSquareRef(el, 0)} data-project="1" x="53" y="113" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                    <rect ref={(el) => addSquareRef(el, 1)} data-project="2" x="93" y="73" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                    <rect ref={(el) => addSquareRef(el, 2)} data-project="3" x="143" y="43" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                    <rect ref={(el) => addSquareRef(el, 3)} data-project="4" x="173" y="23" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                    <rect ref={(el) => addSquareRef(el, 4)} data-project="5" x="193" y="33" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                    <rect ref={(el) => addSquareRef(el, 5)} data-project="6" x="213" y="23" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                    <rect ref={(el) => addSquareRef(el, 6)} data-project="7" x="243" y="43" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                    <rect ref={(el) => addSquareRef(el, 7)} data-project="8" x="293" y="73" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                    <rect ref={(el) => addSquareRef(el, 8)} data-project="9" x="333" y="113" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                    <rect ref={(el) => addSquareRef(el, 9)} data-project="10" x="33" y="253" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                    <rect ref={(el) => addSquareRef(el, 10)} data-project="11" x="353" y="253" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                    <rect ref={(el) => addSquareRef(el, 11)} data-project="12" x="193" y="333" width="14" height="14" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Toolbar */}
            <div 
              className="flex items-center px-2 gap-2"
              style={{
                height: '50px',
                backgroundColor: '#C0C0C0',
                borderTop: '1px solid #808080',
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-black" style={{ fontFamily: 'var(--font-pixel)' }}>Format</span>
                <select 
                  className="text-[10px] px-1 text-black"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #808080',
                    fontFamily: 'var(--font-pixel)',
                  }}
                >
                  <option>None</option>
                </select>
              </div>

              <select 
                className="text-[10px] px-1 text-black"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #808080',
                  fontFamily: 'var(--font-pixel)',
                }}
              >
                <option>Default Font</option>
              </select>

              <select 
                className="text-[10px] px-1 text-black"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #808080',
                  fontFamily: 'var(--font-pixel)',
                }}
              >
                <option>Default Size</option>
              </select>

              <div className="flex gap-0.5">
                {['B', 'I', '≡', '≡', '≡'].map((btn, i) => (
                  <button
                    key={i}
                    className="w-5 h-5 flex items-center justify-center text-[10px] font-bold text-black"
                    style={{
                      backgroundColor: '#C0C0C0',
                      borderTop: '2px solid #fff',
                      borderLeft: '2px solid #fff',
                      borderBottom: '2px solid #808080',
                      borderRight: '2px solid #808080',
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div 
          className="flex items-center justify-between px-2 py-0.5 text-[10px] text-black"
          style={{
            backgroundColor: '#C0C0C0',
            borderTop: '1px solid #808080',
            fontFamily: 'var(--font-pixel)',
          }}
        >
          <span>&lt;body&gt;</span>
          <span>1K / 1 sec</span>
        </div>
      </div>
    </motion.div>
  );
}
