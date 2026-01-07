export function EducationContent() {
  const educationItems = [
    {
      degree: "Bachelor — Idea & Innovation Management",
      school: "Erasmus Hogeschool Brussel",
      period: "2021–2024  (with praise)",
      status: "completed",
    },
    {
      degree: "Master — Business Administration",
      school: "VUB | 2024",
      period: "status: paused",
      status: "paused",
    },
    {
      degree: "Secondary — Accounting & CS",
      school: "KA Tervuren | 2012–2018",
      period: "",
      status: "completed",
    },
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
      <div className="p-3 overflow-y-auto relative z-10 h-full">
        {/* Inner content panel with inset border */}
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
            className="text-[9px] leading-relaxed"
            style={{
              fontFamily: "var(--font-pixel)",
              color: "#000",
            }}
          >
            {educationItems.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-start gap-1">
                  <span style={{ color: item.status === "paused" ? "#b8860b" : "#008000" }}>
                    {item.status === "paused" ? "[○]" : "[■]"}
                  </span>
                  <span className="font-bold">{item.degree}</span>
                </div>
                <div className="ml-4" style={{ color: "#333" }}>{item.school}</div>
                {item.period && (
                  <div 
                    className="ml-4" 
                    style={{ 
                      color: item.status === "paused" ? "#b8860b" : "#666",
                      fontStyle: item.status === "paused" ? "italic" : "normal"
                    }}
                  >
                    {item.period}
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
