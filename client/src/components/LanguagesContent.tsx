export function LanguagesContent() {
  const languages = [
    { name: "Dutch", level: 100 },
    { name: "English", level: 90 },
    { name: "French", level: 60 },
    { name: "Vietnamese", level: 30 },
  ];

  const PixelBar = ({ level }: { level: number }) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round((level / 100) * totalBlocks);
    
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-3"
            style={{
              backgroundColor: i < filledBlocks ? "#fff" : "transparent",
              backgroundImage: i < filledBlocks 
                ? `url("data:image/svg+xml,%3Csvg viewBox='0 0 2 2' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23ccc' /%3E%3Crect x='1' y='1' width='1' height='1' fill='%23ccc' /%3E%3C/svg%3E")`
                : `url("data:image/svg+xml,%3Csvg viewBox='0 0 2 2' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23333' /%3E%3Crect x='1' y='1' width='1' height='1' fill='%23333' /%3E%3C/svg%3E")`,
              backgroundSize: "2px 2px",
              imageRendering: "pixelated",
            }}
          />
        ))}
      </div>
    );
  };

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
      <div className="p-3 relative z-10 h-full">
        <div
          className="h-full p-4"
          style={{
            backgroundColor: "#1a1a1a",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderBottom: "2px solid #fff",
            borderRight: "2px solid #fff",
          }}
        >
          <div
            className="text-[9px] mb-3"
            style={{
              fontFamily: "var(--font-pixel)",
              color: "#888",
            }}
          >
            Displayed as pixel bars:
          </div>
          
          <div className="space-y-3">
            {languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-4">
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
