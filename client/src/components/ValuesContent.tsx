import { Star } from "lucide-react";

export function ValuesContent() {
  const values = [
    { label: "Curiosity", stars: 3 },
    { label: "Empathy", stars: 3 },
    { label: "Reliability", stars: 3 },
    { label: "Creativity", stars: 3 },
    { label: "Discipline", stars: 3 },
    { label: "Growth", stars: 3 },
    { label: "Authenticity", stars: 3 },
    { label: "Dedication", stars: 3 },
  ];

  const starColors = ["#ffd700", "#ffa500", "#ff69b4"];

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
      
      {/* Content area - star rating style */}
      <div className="p-2 relative z-10 h-full flex flex-col">
        <div
          className="flex-1 p-2"
          style={{
            backgroundColor: "#d4d4d4",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderBottom: "2px solid #fff",
            borderRight: "2px solid #fff",
          }}
        >
          <div className="grid grid-cols-2 gap-1 h-full">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between gap-1 px-1 py-0.5 overflow-hidden"
                style={{
                  backgroundColor: "#c0c0c0",
                  borderTop: "1px solid #fff",
                  borderLeft: "1px solid #fff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                }}
              >
                <span 
                  className="text-[7px] font-bold truncate"
                  style={{ fontFamily: "var(--font-pixel)", color: "#000" }}
                >
                  {value.label}
                </span>
                <div className="flex gap-0 flex-shrink-0">
                  {Array.from({ length: value.stars }).map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-2.5 h-2.5" 
                      fill={starColors[i % starColors.length]}
                      color={starColors[i % starColors.length]}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
