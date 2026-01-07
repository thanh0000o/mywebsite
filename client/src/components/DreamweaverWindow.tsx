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
        
        // Start position (centered)
        const startX = (canvasWidth - logoWidth) / 2;
        const startY = 80;
        
        // End position (top-left corner)
        const endX = 10;
        const endY = 10;
        
        const logoProgress = Math.min(scrollY / logoAnimationEnd, 1);
        
        // Calculate new position with pixelation
        let newX = startX + (endX - startX) * logoProgress;
        let newY = startY + (endY - startY) * logoProgress;
        
        // Pixelate for stepped movement (4px increments)
        newX = pixelate(newX);
        newY = pixelate(newY);
        
        // After animation completes, make logo sticky at top-left
        if (logoProgress >= 1) {
          logo.style.position = 'sticky';
          logo.style.top = `${endY}px`;
          logo.style.left = `${endX}px`;
        } else {
          logo.style.position = 'absolute';
          logo.style.left = `${newX}px`;
          logo.style.top = `${newY}px`;
        }
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

            {/* Center Canvas - Scrollable with clip and noise texture */}
            <div 
              ref={canvasRef}
              className="flex-1 m-1 relative overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
                borderTop: '2px solid #808080',
                borderLeft: '2px solid #808080',
                borderBottom: '2px solid #fff',
                borderRight: '2px solid #fff',
              }}
            >
              {/* FIXED CENTERED FLOWER OVERLAY - doesn't scroll */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <svg 
                  id="flower" 
                  width="450"
                  height="380"
                  viewBox="0 0 450 380"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Organic curved branches matching reference - cubic bezier for smooth loops */}
                  {/* Center point at (225, 300) */}
                  
                  {/* Branch 1: Far left, curves down then up-left */}
                  <path ref={(el) => addStemRef(el, 0)} 
                        d="M 225,300 C 180,320 100,340 50,280 C 20,240 30,200 45,160" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  {/* Branch 2: Left low, loops down and curves to left */}
                  <path ref={(el) => addStemRef(el, 1)} 
                        d="M 225,300 C 190,330 120,340 70,290 C 40,255 55,210 75,175" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  {/* Branch 3: Left mid, S-curve going up-left */}
                  <path ref={(el) => addStemRef(el, 2)} 
                        d="M 225,300 C 200,280 140,280 100,220 C 70,170 80,120 100,80" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  {/* Branch 4: Left upper, graceful arc */}
                  <path ref={(el) => addStemRef(el, 3)} 
                        d="M 225,300 C 210,260 170,200 145,140 C 125,90 130,50 145,25" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  {/* Branch 5: Center-left top */}
                  <path ref={(el) => addStemRef(el, 4)} 
                        d="M 225,300 C 220,250 200,160 185,100 C 175,55 180,25 190,10" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  {/* Branch 6: Center top left */}
                  <path ref={(el) => addStemRef(el, 5)} 
                        d="M 225,300 C 225,240 215,140 210,80 C 208,40 215,15 225,5" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  {/* Branch 7: Center top right */}
                  <path ref={(el) => addStemRef(el, 6)} 
                        d="M 225,300 C 225,240 235,140 240,80 C 242,40 235,15 225,5" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  {/* Branch 8: Center-right top */}
                  <path ref={(el) => addStemRef(el, 7)} 
                        d="M 225,300 C 230,250 250,160 265,100 C 275,55 270,25 260,10" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  {/* Branch 9: Right upper, graceful arc */}
                  <path ref={(el) => addStemRef(el, 8)} 
                        d="M 225,300 C 240,260 280,200 305,140 C 325,90 320,50 305,25" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  {/* Branch 10: Right mid, S-curve going up-right */}
                  <path ref={(el) => addStemRef(el, 9)} 
                        d="M 225,300 C 250,280 310,280 350,220 C 380,170 370,120 350,80" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  {/* Branch 11: Right low, loops down and curves to right */}
                  <path ref={(el) => addStemRef(el, 10)} 
                        d="M 225,300 C 260,330 330,340 380,290 C 410,255 395,210 375,175" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  {/* Branch 12: Far right, curves down then up-right */}
                  <path ref={(el) => addStemRef(el, 11)} 
                        d="M 225,300 C 270,320 350,340 400,280 C 430,240 420,200 405,160" 
                        stroke="#00AA00" strokeWidth="1.5" fill="none"/>
                  
                  {/* Square nodes at exact branch endpoints */}
                  <rect ref={(el) => addSquareRef(el, 0)} x="39" y="154" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  <rect ref={(el) => addSquareRef(el, 1)} x="69" y="169" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  <rect ref={(el) => addSquareRef(el, 2)} x="94" y="74" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  <rect ref={(el) => addSquareRef(el, 3)} x="139" y="19" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  <rect ref={(el) => addSquareRef(el, 4)} x="184" y="4" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  <rect ref={(el) => addSquareRef(el, 5)} x="219" y="-1" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  <rect ref={(el) => addSquareRef(el, 6)} x="219" y="-1" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  <rect ref={(el) => addSquareRef(el, 7)} x="254" y="4" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  <rect ref={(el) => addSquareRef(el, 8)} x="299" y="19" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  <rect ref={(el) => addSquareRef(el, 9)} x="344" y="74" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  <rect ref={(el) => addSquareRef(el, 10)} x="369" y="169" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  <rect ref={(el) => addSquareRef(el, 11)} x="399" y="154" width="12" height="12" fill="#00AA00" style={{ opacity: 0, cursor: 'pointer' }}/>
                  
                  {/* Select text */}
                  <text x="225" y="340" textAnchor="middle" fill="#999" fontSize="10" fontFamily="var(--font-pixel)">
                    SELECT A NODE TO VIEW DETAILS
                  </text>
                </svg>
              </div>
              
              {/* Scrollable content layer - for scroll interaction and logo */}
              <div 
                ref={scrollContainerRef}
                className="absolute inset-0 overflow-y-auto overflow-x-hidden"
                style={{ padding: '10px', zIndex: 2 }}
              >
                {/* Scrollable content - creates scroll height */}
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
