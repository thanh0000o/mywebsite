import { motion } from "framer-motion";

interface DreamweaverWindowProps {
  onClose: () => void;
}

export function DreamweaverWindow({ onClose }: DreamweaverWindowProps) {
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

            {/* Center Canvas */}
            <div 
              className="flex-1 m-1 flex flex-col items-center justify-center relative"
              style={{
                backgroundColor: '#fff',
                borderTop: '2px solid #808080',
                borderLeft: '2px solid #808080',
                borderBottom: '2px solid #fff',
                borderRight: '2px solid #fff',
              }}
            >
              {/* Canvas Content - Thành Lambeets design */}
              <div className="relative w-48 h-32 flex flex-col items-center justify-center">
                {/* Diagonal line */}
                <div 
                  className="absolute w-32 h-0.5 bg-black"
                  style={{
                    transform: 'rotate(-25deg)',
                    top: '30%',
                    left: '10%',
                  }}
                />
                {/* Lambeets text */}
                <p 
                  className="text-lg italic text-blue-800 absolute"
                  style={{ 
                    fontFamily: 'var(--font-pixel)',
                    top: '15%',
                    right: '5%',
                  }}
                >
                  Lambeets
                </p>
                {/* Thành text */}
                <p 
                  className="text-lg italic text-blue-800 absolute"
                  style={{ 
                    fontFamily: 'var(--font-pixel)',
                    top: '45%',
                    left: '15%',
                    borderBottom: '2px solid black',
                    paddingBottom: '2px',
                  }}
                >
                  Thành
                </p>
              </div>
              
              {/* Scroll Here text */}
              <p 
                className="text-xs text-black mt-4"
                style={{ fontFamily: 'var(--font-pixel)' }}
              >
                [SCROLL HERE]
              </p>

              {/* Footer copyright inside canvas */}
              <div 
                className="absolute bottom-2 left-0 right-0 flex justify-center"
              >
                <p 
                  className="text-[10px] text-black px-2 py-1"
                  style={{ 
                    fontFamily: 'var(--font-pixel)',
                    backgroundColor: '#C0C0C0',
                    borderTop: '1px solid #fff',
                    borderLeft: '1px solid #fff',
                    borderBottom: '1px solid #808080',
                    borderRight: '1px solid #808080',
                  }}
                >
                  © 2000-2026 | designed on a 2560 x 1440 screen & to last
                </p>
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
