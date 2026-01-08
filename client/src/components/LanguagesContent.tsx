export function LanguagesContent() {
  const BelgianFlag = () => (
    <svg width="20" height="14" viewBox="0 0 20 14" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="7" height="14" fill="#000"/>
      <rect x="7" y="0" width="6" height="14" fill="#ffd90c"/>
      <rect x="13" y="0" width="7" height="14" fill="#f31830"/>
    </svg>
  );

  const UKFlag = () => (
    <svg width="20" height="14" viewBox="0 0 20 14" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="20" height="14" fill="#012169"/>
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#fff" strokeWidth="2"/>
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#c8102e" strokeWidth="1"/>
      <rect x="8" y="0" width="4" height="14" fill="#fff"/>
      <rect x="0" y="5" width="20" height="4" fill="#fff"/>
      <rect x="9" y="0" width="2" height="14" fill="#c8102e"/>
      <rect x="0" y="6" width="20" height="2" fill="#c8102e"/>
    </svg>
  );

  const FrenchFlag = () => (
    <svg width="20" height="14" viewBox="0 0 20 14" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="7" height="14" fill="#0055a4"/>
      <rect x="7" y="0" width="6" height="14" fill="#fff"/>
      <rect x="13" y="0" width="7" height="14" fill="#ef4135"/>
    </svg>
  );

  const VietnamFlag = () => (
    <svg width="20" height="14" viewBox="0 0 20 14" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="20" height="14" fill="#da251d"/>
      <polygon points="10,2 11.5,6 16,6 12.5,8.5 14,12.5 10,10 6,12.5 7.5,8.5 4,6 8.5,6" fill="#ffff00"/>
    </svg>
  );

  const PixelBar = ({ level }: { level: number }) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round((level / 100) * totalBlocks);
    
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-2"
            style={{
              backgroundColor: i < filledBlocks ? "#00ff00" : "#333",
              boxShadow: i < filledBlocks ? "0 0 2px #00ff00" : "none",
            }}
          />
        ))}
      </div>
    );
  };

  const languages = [
    { name: "Dutch", level: 100, flag: BelgianFlag },
    { name: "English", level: 90, flag: UKFlag },
    { name: "French", level: 30, flag: FrenchFlag },
    { name: "Vietnamese", level: 30, flag: VietnamFlag },
  ];

  return (
    <div
      className="h-full relative"
      style={{
        backgroundColor: "#c0c0c0",
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
        }}
      />
      {/* Moving scanlines overlay */}
      <div className="window-scanlines" aria-hidden="true" />
      
      {/* Content area */}
      <div className="p-2 relative z-10 h-full overflow-y-auto">
        <div
          className="h-full p-3 overflow-y-auto"
          style={{
            backgroundColor: "#1a1a1a",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderBottom: "2px solid #fff",
            borderRight: "2px solid #fff",
          }}
        >
          <div className="space-y-2">
            {languages.map((lang, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-2"
                style={{
                  backgroundColor: '#2a2a2a',
                  borderTop: '1px solid #444',
                  borderLeft: '1px solid #444',
                  borderBottom: '1px solid #111',
                  borderRight: '1px solid #111',
                }}
              >
                <lang.flag />
                <span
                  className="w-24 text-[10px]"
                  style={{
                    fontFamily: "var(--font-pixel)",
                    color: "#00ff00",
                  }}
                >
                  {lang.name}
                </span>
                <PixelBar level={lang.level} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
