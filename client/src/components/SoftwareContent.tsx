export function SoftwareContent() {
  const AdobeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="16" height="16" fill="#330000"/>
      <polygon points="8,2 14,14 10,14 8.5,10 5.5,10 8,2" fill="#ff0000"/>
      <polygon points="2,14 6,14 8,8 5,8" fill="#ff0000"/>
    </svg>
  );

  const BlenderIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="16" height="16" fill="#1a1a1a"/>
      <ellipse cx="8" cy="9" rx="6" ry="4" fill="#ea7600"/>
      <ellipse cx="8" cy="8" rx="2" ry="1.5" fill="#265787"/>
      <circle cx="8" cy="8" r="0.8" fill="#fff"/>
    </svg>
  );

  const OfficeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="16" height="16" fill="#d24726"/>
      <rect x="3" y="3" width="10" height="10" fill="#fff"/>
      <rect x="5" y="5" width="6" height="6" fill="#d24726"/>
    </svg>
  );

  const AIIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="16" height="16" fill="#1a1a2e"/>
      <rect x="4" y="4" width="8" height="8" fill="#00ff00" opacity="0.8"/>
      <rect x="5" y="6" width="2" height="2" fill="#000"/>
      <rect x="9" y="6" width="2" height="2" fill="#000"/>
      <rect x="6" y="9" width="4" height="1" fill="#000"/>
    </svg>
  );

  const software = [
    { name: "Adobe Creative Suite", items: ["Illustrator", "InDesign", "Photoshop"], icon: AdobeIcon },
    { name: "Blender", items: [], icon: BlenderIcon },
    { name: "Microsoft Office", items: [], icon: OfficeIcon },
    { name: "AI Tools", items: ["up-to-date user", "eager to learn & integrate"], icon: AIIcon },
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
      <div className="p-3 overflow-y-auto relative z-10 h-full">
        <div
          className="h-full p-4 overflow-y-auto"
          style={{
            backgroundColor: "#d4d4d4",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderBottom: "2px solid #fff",
            borderRight: "2px solid #fff",
          }}
        >
          <div
            className="text-[10px]"
            style={{
              fontFamily: "var(--font-pixel)",
              color: "#000",
            }}
          >
            {software.map((item, index) => (
              <div key={index} className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon />
                  <span 
                    className="px-2 py-0.5"
                    style={{ 
                      backgroundColor: "#000080", 
                      color: "#fff",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                {item.items.length > 0 && (
                  <div className="ml-3">
                    {item.items.map((subItem, subIndex) => (
                      <div key={subIndex} className="flex items-center gap-1 mb-0.5">
                        <span style={{ color: "#666" }}>|--</span>
                        <span style={{ color: "#333" }}>{subItem}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
