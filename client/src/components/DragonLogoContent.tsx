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
        className="flex items-center gap-1 px-1 py-1"
        style={{
          borderBottom: "1px solid #808080",
        }}
      >
        {["File", "Edit", "View", "Image", "Colors", "Help"].map((menu) => (
          <span
            key={menu}
            className="px-2 py-0.5 text-[9px]"
            style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}
          >
            {menu}
          </span>
        ))}
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
                fontSize: '9px',
                color: '#000',
                lineHeight: '1.4',
              }}
            >
              <svg width="240" height="45" viewBox="0 0 240 45" style={{ display: 'block', margin: '0 auto' }}>
                <text x="4" y="12" fill="#222" style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px' }}>
                  I'm Vietnamese &amp; born in the
                </text>
                <text x="4" y="26" fill="#222" style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px' }}>
                  Year of the Dragon! So I drew
                </text>
                <text x="4" y="40" fill="#222" style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px' }}>
                  this cute dragon as my logo~
                </text>
              </svg>
            </div>
            {/* Dragon with hearts and stars around it */}
            <div className="relative" style={{ display: 'inline-block' }}>
              <img 
                src={dragonLogo} 
                alt="Dragon Logo"
                className="max-w-full"
                style={{ 
                  imageRendering: 'pixelated',
                  maxHeight: '160px',
                }}
                draggable={false}
              />
              {/* Decorations around the dragon */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 200 200"
                style={{ overflow: 'visible' }}
              >
                {/* Top left star */}
                <path d="M15 20 L17 26 L23 26 L18 30 L20 36 L15 32 L10 36 L12 30 L7 26 L13 26 Z" fill="none" stroke="#ffd93d" strokeWidth="1.5"/>
                {/* Top right heart */}
                <path d="M180 15 Q184 10 188 15 Q192 10 196 15 Q196 22 188 30 Q180 22 180 15" fill="none" stroke="#ff6b6b" strokeWidth="1.5"/>
                {/* Bottom left heart */}
                <path d="M5 170 Q9 165 13 170 Q17 165 21 170 Q21 177 13 185 Q5 177 5 170" fill="none" stroke="#ff6b6b" strokeWidth="1.5"/>
                {/* Bottom right star */}
                <path d="M185 175 L187 181 L193 181 L188 185 L190 191 L185 187 L180 191 L182 185 L177 181 L183 181 Z" fill="none" stroke="#ffd93d" strokeWidth="1.5"/>
                {/* Small sparkles */}
                <circle cx="30" cy="90" r="2" fill="#ffd93d"/>
                <circle cx="175" cy="100" r="2" fill="#ff6b6b"/>
                <circle cx="170" cy="50" r="1.5" fill="#ffd93d"/>
                <circle cx="25" cy="140" r="1.5" fill="#ff6b6b"/>
              </svg>
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
