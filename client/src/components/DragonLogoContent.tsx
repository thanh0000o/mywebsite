import dragonLogo from "@assets/Screenshot_2026-01-08_013635_1767887215921.png";

export function DragonLogoContent() {
  return (
    <div 
      className="h-full flex flex-col"
      style={{
        backgroundColor: "#c0c0c0",
      }}
    >
      {/* Toolbar */}
      <div 
        className="flex items-center px-1 py-1"
        style={{
          borderBottom: "1px solid #808080",
        }}
      >
        <span className="px-2 py-0.5 text-[9px] hover:bg-[#000080] hover:text-white cursor-default" style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}><u>F</u>ile</span>
        <span className="px-2 py-0.5 text-[9px] hover:bg-[#000080] hover:text-white cursor-default" style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}><u>E</u>dit</span>
        <span className="px-2 py-0.5 text-[9px] hover:bg-[#000080] hover:text-white cursor-default" style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}><u>V</u>iew</span>
        <span className="px-2 py-0.5 text-[9px] hover:bg-[#000080] hover:text-white cursor-default" style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}><u>I</u>mage</span>
        <span className="px-2 py-0.5 text-[9px] hover:bg-[#000080] hover:text-white cursor-default" style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}><u>C</u>olors</span>
        <span className="px-2 py-0.5 text-[9px] hover:bg-[#000080] hover:text-white cursor-default" style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}><u>H</u>elp</span>
      </div>

      {/* Tool palette */}
      <div className="flex flex-1">
        {/* Left tool panel */}
        <div 
          className="flex flex-col gap-0.5 p-1"
          style={{
            backgroundColor: "#c0c0c0",
            borderRight: "1px solid #808080",
            width: "32px",
          }}
        >
          {[
            { icon: "✂", title: "Select" },
            { icon: "✏", title: "Pencil" },
            { icon: "🖌", title: "Brush" },
            { icon: "🪣", title: "Fill" },
            { icon: "A", title: "Text" },
            { icon: "⬜", title: "Rectangle" },
          ].map((tool, i) => (
            <div
              key={i}
              className="w-6 h-6 flex items-center justify-center text-[10px]"
              style={{
                backgroundColor: i === 0 ? "#fff" : "#c0c0c0",
                borderTop: "1px solid #fff",
                borderLeft: "1px solid #fff",
                borderBottom: "1px solid #808080",
                borderRight: "1px solid #808080",
              }}
              title={tool.title}
            >
              {tool.icon}
            </div>
          ))}
        </div>

        {/* Canvas area */}
        <div 
          className="flex-1 p-2 overflow-auto"
          style={{
            backgroundColor: "#808080",
          }}
        >
          <div
            className="relative"
            style={{
              backgroundColor: "#fff",
              borderTop: "2px solid #808080",
              borderLeft: "2px solid #808080",
              borderBottom: "2px solid #fff",
              borderRight: "2px solid #fff",
              display: "inline-block",
              padding: "8px",
            }}
          >
            {/* Hand-drawn style text at top */}
            <div 
              className="mb-2 text-center"
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '8px',
                color: '#222',
                lineHeight: '1.4',
              }}
            >
              <div>I'm Vietnamese & born in the</div>
              <div>Year of the Dragon! So I drew</div>
              <div>this dragon as my logo~</div>
            </div>
            {/* Dragon with hearts and stars around it */}
            <div className="relative flex justify-center" style={{ padding: '12px' }}>
              {/* Top left star */}
              <svg className="absolute" style={{ top: '2px', left: '2px', width: '16px', height: '16px' }} viewBox="0 0 20 20">
                <path d="M10 2 L11 7 L16 7 L12 10 L14 15 L10 12 L6 15 L8 10 L4 7 L9 7 Z" fill="none" stroke="#ffd93d" strokeWidth="1.5"/>
              </svg>
              {/* Top right heart */}
              <svg className="absolute" style={{ top: '2px', right: '2px', width: '16px', height: '16px' }} viewBox="0 0 20 20">
                <path d="M10 5 Q12 2 14 5 Q16 2 18 5 Q18 10 14 14 Q10 10 10 5" fill="none" stroke="#ff6b6b" strokeWidth="1.5"/>
              </svg>
              {/* Bottom left heart */}
              <svg className="absolute" style={{ bottom: '2px', left: '2px', width: '16px', height: '16px' }} viewBox="0 0 20 20">
                <path d="M10 5 Q12 2 14 5 Q16 2 18 5 Q18 10 14 14 Q10 10 10 5" fill="none" stroke="#ff6b6b" strokeWidth="1.5"/>
              </svg>
              {/* Bottom right star */}
              <svg className="absolute" style={{ bottom: '2px', right: '2px', width: '16px', height: '16px' }} viewBox="0 0 20 20">
                <path d="M10 2 L11 7 L16 7 L12 10 L14 15 L10 12 L6 15 L8 10 L4 7 L9 7 Z" fill="none" stroke="#ffd93d" strokeWidth="1.5"/>
              </svg>
              <img 
                src={dragonLogo} 
                alt="Dragon Logo"
                style={{ 
                  imageRendering: 'pixelated',
                  maxHeight: '130px',
                  display: 'block',
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Color palette */}
        <div 
          className="flex flex-col gap-1 p-1"
          style={{
            backgroundColor: "#c0c0c0",
            borderLeft: "1px solid #808080",
            width: "28px",
          }}
        >
          {[
            "#000000", "#808080", "#800000", "#808000",
            "#008000", "#008080", "#000080", "#800080",
            "#ffffff", "#c0c0c0", "#ff0000", "#ffff00",
            "#00ff00", "#00ffff", "#0000ff", "#ff00ff",
          ].map((color, i) => (
            <div
              key={i}
              className="w-4 h-3"
              style={{
                backgroundColor: color,
                border: "1px solid #808080",
              }}
            />
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-2 py-1"
        style={{
          backgroundColor: "#c0c0c0",
          borderTop: "1px solid #fff",
        }}
      >
        <span
          className="text-[8px]"
          style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}
        >
          &gt; dragon_logo.png | 420 x 480 pixels
        </span>
        <span
          className="text-[8px]"
          style={{ fontFamily: 'var(--font-pixel)', color: '#666' }}
        >
          MS Paint 95
        </span>
      </div>
    </div>
  );
}
