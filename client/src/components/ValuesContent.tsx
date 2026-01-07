export function ValuesContent() {
  const values = [
    "Curiosity",
    "Empathy", 
    "Reliability",
    "Creativity",
    "Discipline",
    "Thoughtfulness",
    "Growth",
    "Authenticity",
    "Dedication",
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
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23888' /%3E%3Crect x='3' y='1' width='1' height='1' fill='%23aaa' /%3E%3Crect x='1' y='3' width='1' height='1' fill='%23777' /%3E%3Crect x='4' y='4' width='1' height='1' fill='%239a9a9a' /%3E%3Crect x='2' y='5' width='1' height='1' fill='%23909090' /%3E%3Crect x='5' y='2' width='1' height='1' fill='%23858585' /%3E%3C/svg%3E")`,
          backgroundSize: "6px 6px",
          imageRendering: "pixelated",
        }}
      />
      
      {/* Content area */}
      <div className="p-3 relative z-10 h-full">
        <div
          className="h-full p-3"
          style={{
            backgroundColor: "#d4d4d4",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderBottom: "2px solid #fff",
            borderRight: "2px solid #fff",
          }}
        >
          <div
            className="text-[9px]"
            style={{
              fontFamily: "var(--font-pixel)",
              color: "#000",
            }}
          >
            <div className="grid grid-cols-3 gap-2">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1 p-1"
                  style={{
                    backgroundColor: "#c0c0c0",
                    borderTop: "1px solid #fff",
                    borderLeft: "1px solid #fff",
                    borderBottom: "1px solid #808080",
                    borderRight: "1px solid #808080",
                  }}
                >
                  <span style={{ color: "#008000" }}>+</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
