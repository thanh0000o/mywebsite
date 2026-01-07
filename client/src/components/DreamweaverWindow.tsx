import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import logoImage from "@assets/ChatGPT_Image_Jan_7,_2026,_12_04_31_PM_1767811147577.png";

interface DreamweaverWindowProps {
  onClose: () => void;
}

// Define 15 organic curved stems radiating from center
const stemPaths = [
  "M 0,0 Q -20,-80 -40,-150",      // stem 1: upper left
  "M 0,0 Q 30,-90 50,-160",         // stem 2: upper center-right
  "M 0,0 Q -60,-60 -120,-90",       // stem 3: upper far left
  "M 0,0 Q 70,-50 130,-70",         // stem 4: upper right
  "M 0,0 Q 90,10 160,20",           // stem 5: right
  "M 0,0 Q 80,60 140,110",          // stem 6: lower right
  "M 0,0 Q 40,80 60,150",           // stem 7: lower center-right
  "M 0,0 Q -10,90 -15,165",         // stem 8: lower center
  "M 0,0 Q -50,75 -80,140",         // stem 9: lower left
  "M 0,0 Q -90,40 -155,60",         // stem 10: left
  "M 0,0 Q -100,-20 -170,-25",      // stem 11: far left
  "M 0,0 Q 100,-30 175,-40",        // stem 12: far right
  "M 0,0 Q 55,95 85,165",           // stem 13: lower far right
  "M 0,0 Q -75,90 -120,155",        // stem 14: lower far left
  "M 0,0 Q 5,-100 10,-175",         // stem 15: straight up
];

// Get endpoint of quadratic bezier path
function getPathEndpoint(pathD: string): { x: number; y: number } {
  const parts = pathD.split(' ');
  const lastParts = parts[parts.length - 1].split(',');
  return {
    x: parseFloat(lastParts[0]),
    y: parseFloat(lastParts[1]),
  };
}

export function DreamweaverWindow({ onClose }: DreamweaverWindowProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0, progress: 0 });
  const [flowerProgress, setFlowerProgress] = useState(0);
  const [pathLengths, setPathLengths] = useState<number[]>([]);
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  // Calculate path lengths on mount
  useEffect(() => {
    const lengths = pathRefs.current.map(path => path?.getTotalLength() || 0);
    setPathLengths(lengths);
  }, []);

  // Handle scroll with pixelated movement
  const handleScroll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scrollY = canvas.scrollTop;
    
    // Phase 1: Logo animation (0-300px)
    const logoMaxScroll = 300;
    const logoProgress = Math.min(scrollY / logoMaxScroll, 1);
    const steppedLogoProgress = Math.round(logoProgress * 25) / 25;

    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;
    const logoWidth = 320;
    
    const startX = (canvasWidth - logoWidth) / 2;
    const startY = (canvasHeight - 200) / 2;
    const endX = 20;
    const endY = 20;

    let newX = startX + (endX - startX) * steppedLogoProgress;
    let newY = startY + (endY - startY) * steppedLogoProgress;

    newX = Math.round(newX / 4) * 4;
    newY = Math.round(newY / 4) * 4;

    setLogoPosition({ x: newX, y: newY, progress: steppedLogoProgress });

    // Phase 2: Flower growth (300-1200px)
    if (scrollY > 300) {
      const flowerScrollProgress = Math.min((scrollY - 300) / 900, 1);
      // Pixelate progress (stepped effect)
      const steppedFlower = Math.floor(flowerScrollProgress * 50) / 50;
      setFlowerProgress(steppedFlower);
    } else {
      setFlowerProgress(0);
    }
  }, []);

  // Handle portfolio square click
  const handleSquareClick = (index: number) => {
    alert(`Portfolio piece ${index + 1} clicked`);
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
            {/* Sidebar Tool Icons - using simple symbols instead of emojis */}
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
              {/* Left blue square */}
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
              {/* Toolbar Tabs */}
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

            {/* Center Canvas - Scrollable */}
            <div 
              ref={canvasRef}
              onScroll={handleScroll}
              className="flex-1 m-1 relative overflow-y-auto overflow-x-hidden"
              style={{
                backgroundColor: '#fff',
                borderTop: '2px solid #808080',
                borderLeft: '2px solid #808080',
                borderBottom: '2px solid #fff',
                borderRight: '2px solid #fff',
              }}
            >
              {/* Scrollable content area - makes canvas scrollable */}
              <div style={{ height: '1500px', position: 'relative' }}>
                {/* Logo Image - Positioned with scroll animation */}
                <img 
                  src={logoImage}
                  alt="Thành Lambeets"
                  className="w-80 h-auto object-contain"
                  style={{ 
                    imageRendering: 'pixelated',
                    position: logoPosition.progress > 0 ? 'fixed' : 'absolute',
                    left: logoPosition.progress > 0 
                      ? `calc(50% - 40vw + ${logoPosition.x}px)` 
                      : '50%',
                    top: logoPosition.progress > 0 
                      ? `calc(50% - 25vh + ${logoPosition.y}px)` 
                      : '50%',
                    transform: logoPosition.progress > 0 ? 'none' : 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                  draggable={false}
                />
                
                {/* Scroll Here text - visible at start */}
                {logoPosition.progress < 0.3 && (
                  <p 
                    className="text-sm text-black font-bold absolute left-1/2 -translate-x-1/2"
                    style={{ 
                      fontFamily: 'var(--font-pixel)',
                      top: 'calc(50% + 100px)',
                    }}
                  >
                    [SCROLL HERE]
                  </p>
                )}

                {/* SVG Flower - grows after logo animation */}
                <svg 
                  width="400" 
                  height="400" 
                  viewBox="-200 -200 400 400"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    marginTop: '100px',
                    opacity: flowerProgress > 0 ? 1 : 0,
                  }}
                >
                  {/* Stems */}
                  {stemPaths.map((pathD, index) => {
                    const length = pathLengths[index] || 200;
                    const delay = index * 0.04;
                    const stemProgress = Math.max(0, Math.min(1, (flowerProgress - delay) / 0.7));
                    const offset = length * (1 - stemProgress);
                    
                    return (
                      <path
                        key={index}
                        ref={(el) => { pathRefs.current[index] = el; }}
                        d={pathD}
                        stroke="#00AA00"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: length,
                          strokeDashoffset: Math.round(offset / 4) * 4,
                        }}
                      />
                    );
                  })}
                  
                  {/* Portfolio squares at endpoints */}
                  {stemPaths.map((pathD, index) => {
                    const endpoint = getPathEndpoint(pathD);
                    const delay = index * 0.04;
                    const stemProgress = Math.max(0, Math.min(1, (flowerProgress - delay) / 0.7));
                    const isVisible = stemProgress >= 0.95;
                    const isHovered = hoveredSquare === index;
                    
                    return (
                      <rect
                        key={`square-${index}`}
                        x={endpoint.x - 7}
                        y={endpoint.y - 7}
                        width="14"
                        height="14"
                        fill="#00AA00"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          cursor: isVisible ? 'pointer' : 'default',
                          transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                          transformOrigin: `${endpoint.x}px ${endpoint.y}px`,
                          transition: 'transform 0.1s steps(3)',
                        }}
                        onMouseEnter={() => setHoveredSquare(index)}
                        onMouseLeave={() => setHoveredSquare(null)}
                        onClick={() => isVisible && handleSquareClick(index)}
                        data-testid={`portfolio-square-${index}`}
                      />
                    );
                  })}
                </svg>
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
              {/* Format dropdown */}
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

              {/* Font dropdown */}
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

              {/* Size dropdown */}
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

              {/* Format buttons */}
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
