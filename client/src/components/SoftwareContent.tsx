export function SoftwareContent() {
  const software = [
    { name: "Adobe Creative Suite", items: ["Illustrator", "InDesign", "Photoshop"] },
    { name: "Blender", items: [] },
    { name: "Microsoft Office", items: [] },
    { name: "AI Tools", items: ["up-to-date user", "eager to learn & integrate", "Replit, Lovable, AI agents"] },
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
                <div className="flex items-center gap-1 mb-1">
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
