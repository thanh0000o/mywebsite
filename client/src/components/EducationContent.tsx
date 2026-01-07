import { GraduationCap, Pause, Award } from "lucide-react";

export function EducationContent() {
  const educationItems = [
    {
      icon: GraduationCap,
      degree: "Bachelor",
      field: "Idea & Innovation",
      school: "Erasmus Hogeschool",
      period: "2021-2024",
      badge: "cum laude",
      color: "#2e7d32",
      status: "completed",
    },
    {
      icon: Pause,
      degree: "Master",
      field: "Business Admin",
      school: "VUB",
      period: "2024",
      badge: "paused",
      color: "#f57c00",
      status: "paused",
    },
    {
      icon: Award,
      degree: "Secondary",
      field: "Accounting & CS",
      school: "KA Tervuren",
      period: "2012-2018",
      badge: null,
      color: "#1565c0",
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
      
      {/* Content area - horizontal cards */}
      <div className="p-2 relative z-10 h-full flex flex-col">
        <div
          className="flex-1 p-2 flex flex-col gap-1"
          style={{
            backgroundColor: "#d4d4d4",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderBottom: "2px solid #fff",
            borderRight: "2px solid #fff",
          }}
        >
          {educationItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="flex items-center gap-1.5 px-1 py-0.5 flex-1"
                style={{
                  backgroundColor: "#c0c0c0",
                  borderTop: "1px solid #fff",
                  borderLeft: "1px solid #fff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                }}
              >
                {/* Icon */}
                <div 
                  className="w-5 h-5 flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: item.color,
                    borderTop: "1px solid rgba(255,255,255,0.5)",
                    borderLeft: "1px solid rgba(255,255,255,0.5)",
                    borderBottom: "1px solid rgba(0,0,0,0.3)",
                    borderRight: "1px solid rgba(0,0,0,0.3)",
                  }}
                >
                  <IconComponent className="w-3 h-3 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 leading-tight">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span 
                      className="text-[7px] font-bold"
                      style={{ fontFamily: "var(--font-pixel)", color: "#000" }}
                    >
                      {item.degree}
                    </span>
                    <span 
                      className="text-[6px]"
                      style={{ fontFamily: "var(--font-pixel)", color: "#666" }}
                    >
                      {item.period}
                    </span>
                    {item.badge && (
                      <span 
                        className="text-[5px] px-0.5"
                        style={{ 
                          fontFamily: "var(--font-pixel)", 
                          color: "#fff",
                          backgroundColor: item.status === "paused" ? "#f57c00" : "#2e7d32",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div 
                    className="text-[6px]"
                    style={{ fontFamily: "var(--font-pixel)", color: "#000080" }}
                  >
                    {item.field} - {item.school}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
