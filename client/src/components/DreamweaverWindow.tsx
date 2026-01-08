import { motion } from "framer-motion";
import logoImage from "@assets/ChatGPT_Image_Jan_7,_2026,_12_04_31_PM_1767811147577.png";

interface DreamweaverWindowProps {
  onClose: () => void;
  onOpenWindow: (type: string, title: string) => void;
}

export function DreamweaverWindow({ onClose, onOpenWindow }: DreamweaverWindowProps) {
  const tabs = ['ART', 'ABOUT ME', 'EDUCATION', 'LANGUAGES', 'EXPERIENCE', 'SOFTWARE', 'SOFTSKILLS', 'VALUES'];

  const handleTabClick = (tab: string) => {
    if (tab === 'ABOUT ME') {
      onOpenWindow('aboutme', 'About Me - thành lambeets');
    } else if (tab === 'EDUCATION') {
      onOpenWindow('education', 'EDUCATION.log');
    } else if (tab === 'EXPERIENCE') {
      onOpenWindow('experience', 'EXPERIENCE.exe');
    } else if (tab === 'VALUES') {
      onOpenWindow('values', 'VALUES.ini');
    } else if (tab === 'SOFTSKILLS') {
      onOpenWindow('skills', 'SKILLS.dat');
    } else if (tab === 'LANGUAGES') {
      onOpenWindow('languages', 'LANGUAGES.cfg');
    } else if (tab === 'SOFTWARE') {
      onOpenWindow('software', 'SOFTWARE.sys');
    } else if (tab === 'ART') {
      onOpenWindow('art', 'ART_GALLERY.exe');
    }
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
        className="w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[60vw] xl:w-[45vw] h-[70vh] sm:h-[60vh] md:h-[50vh] max-w-[900px] flex flex-col relative"
        style={{
          backgroundColor: '#C0C0C0',
          boxShadow: '5px 5px 20px rgba(0,0,0,0.5)',
          borderTop: '2px solid #fff',
          borderLeft: '2px solid #fff',
          borderBottom: '2px solid #808080',
          borderRight: '2px solid #808080',
        }}
      >
        {/* Pixelated noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23999' /%3E%3Crect x='2' y='1' width='1' height='1' fill='%23bbb' /%3E%3Crect x='1' y='2' width='1' height='1' fill='%23888' /%3E%3Crect x='3' y='3' width='1' height='1' fill='%23aaa' /%3E%3C/svg%3E")`,
            backgroundSize: "4px 4px",
            imageRendering: "pixelated" as const,
            opacity: 0.6,
            zIndex: 0,
          }}
        />
        {/* Moving scanlines overlay */}
        <div className="window-scanlines" aria-hidden="true" />
        {/* Title Bar */}
        <div 
          className="flex items-center justify-between px-1 py-0.5 relative z-10"
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
              <span className="text-[8px]" style={{ color: '#000' }}>W</span>
            </div>
            <span 
              className="text-sm font-bold"
              style={{ fontFamily: 'var(--font-pixel)', textShadow: '1px 1px 0 #000' }}
            >
              Untitled-1 - thành lambeets
            </span>
          </div>
          <div className="flex gap-0.5">
            {/* Minimize */}
            <button
              className="w-5 h-5 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderBottom: '2px solid #808080',
                borderRight: '2px solid #808080',
                color: '#000',
              }}
              data-testid="button-minimize"
            >
              _
            </button>
            {/* Maximize */}
            <button
              className="w-5 h-5 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderBottom: '2px solid #808080',
                borderRight: '2px solid #808080',
                color: '#000',
              }}
              data-testid="button-maximize"
            >
              □
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              className="w-5 h-5 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderBottom: '2px solid #808080',
                borderRight: '2px solid #808080',
                color: '#000',
              }}
              data-testid="button-close"
            >
              X
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div 
          className="flex items-center gap-4 px-2 py-1 text-sm relative z-10"
          style={{
            backgroundColor: '#C0C0C0',
            borderBottom: '1px solid #808080',
            fontFamily: 'var(--font-pixel)',
            color: '#000',
          }}
        >
          {['File', 'Edit', 'View', 'Insert', 'Modify', 'Text', 'Window', 'Help'].map((item) => (
            <span 
              key={item} 
              className="cursor-pointer"
              style={{ fontSize: '12px', color: '#000' }}
            >
              <span style={{ textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '2px' }}>{item[0]}</span>{item.slice(1)}
            </span>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden relative z-10">
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
                className="w-5 h-5 flex items-center justify-center text-[8px] cursor-pointer"
                style={{
                  backgroundColor: '#C0C0C0',
                  borderTop: '1px solid #fff',
                  borderLeft: '1px solid #fff',
                  borderBottom: '1px solid #808080',
                  borderRight: '1px solid #808080',
                  color: '#000',
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
              className="flex items-center justify-between px-1 sm:px-2 gap-1 sm:gap-2 py-1"
              style={{
                minHeight: '40px',
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
              <div className="flex items-center gap-1 flex-wrap overflow-x-auto">
                {tabs.map((tab) => (
                  <div
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className="px-1 sm:px-2 py-1 text-[8px] sm:text-[10px] cursor-pointer font-bold whitespace-nowrap"
                    style={{
                      backgroundColor: '#C0C0C0',
                      borderTop: '2px solid #fff',
                      borderLeft: '2px solid #fff',
                      borderBottom: '2px solid #808080',
                      borderRight: '2px solid #808080',
                      fontFamily: 'var(--font-pixel)',
                      color: '#000',
                    }}
                    data-testid={`tab-${tab.toLowerCase().replace(' ', '-')}`}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>

            {/* Center Canvas with noise texture */}
            <div 
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
              {/* Centered logo and welcome text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
                <img 
                  src={logoImage}
                  alt="Thành Lambeets"
                  className="w-32 sm:w-48 md:w-64 h-auto object-contain"
                  style={{ imageRendering: 'pixelated' }}
                  draggable={false}
                />
                <div 
                  className="mt-4 text-center max-w-sm"
                  style={{ 
                    fontFamily: 'var(--font-pixel)', 
                    color: '#333',
                    fontSize: '10px',
                    lineHeight: '1.5',
                  }}
                >
                  <p className="mb-2" style={{ fontSize: '12px', fontWeight: 'bold' }}>Welcome.</p>
                  <p>
                    This is a place for ideas, tools, and quiet exploration. I'm Thành, and I like building things with ideas, pixels, and curiosity where art, technology, and thoughtful experimentation come together.
                  </p>
                  <p className="mt-2" style={{ fontStyle: 'italic' }}>Explore gently.</p>
                </div>
              </div>
            </div>

            {/* Bottom Toolbar */}
            <div 
              className="flex items-center px-2 gap-2 relative z-10"
              style={{
                height: '50px',
                backgroundColor: '#C0C0C0',
                borderTop: '1px solid #808080',
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-[10px]" style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}>Format</span>
                <select 
                  className="text-[10px] px-1"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #808080',
                    fontFamily: 'var(--font-pixel)',
                    color: '#000',
                  }}
                >
                  <option>None</option>
                </select>
              </div>

              <select 
                className="text-[10px] px-1"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #808080',
                  fontFamily: 'var(--font-pixel)',
                  color: '#000',
                }}
              >
                <option>Default Font</option>
              </select>

              <select 
                className="text-[10px] px-1"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #808080',
                  fontFamily: 'var(--font-pixel)',
                  color: '#000',
                }}
              >
                <option>Default Size</option>
              </select>

              <div className="flex gap-0.5">
                {['B', 'I', '≡', '≡', '≡'].map((btn, i) => (
                  <button
                    key={i}
                    className="w-5 h-5 flex items-center justify-center text-[10px] font-bold"
                    style={{
                      backgroundColor: '#C0C0C0',
                      borderTop: '2px solid #fff',
                      borderLeft: '2px solid #fff',
                      borderBottom: '2px solid #808080',
                      borderRight: '2px solid #808080',
                      color: '#000',
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
          className="flex items-center justify-between px-2 py-0.5 text-[10px] relative z-10"
          style={{
            backgroundColor: '#C0C0C0',
            borderTop: '1px solid #808080',
            fontFamily: 'var(--font-pixel)',
            color: '#000',
          }}
        >
          <span>&lt;body&gt;</span>
          <span>1K / 1 sec</span>
        </div>
      </div>
    </motion.div>
  );
}
