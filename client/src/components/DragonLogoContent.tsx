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
            }}
          >
            <img 
              src={dragonLogo} 
              alt="Dragon Logo"
              className="max-w-full"
              style={{ 
                imageRendering: 'pixelated',
                maxHeight: '280px',
              }}
              draggable={false}
            />
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
