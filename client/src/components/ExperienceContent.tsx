import { Landmark, Users, Palette, UtensilsCrossed, Heart, TreePine } from "lucide-react";

export function ExperienceContent() {
  const experiences = [
    {
      icon: Landmark,
      role: "Intern",
      company: "Argenta",
      period: "'18",
      color: "#4a90d9",
    },
    {
      icon: Users,
      role: "Leader",
      company: "Scouts",
      period: "'19-22",
      color: "#2d8f2d",
    },
    {
      icon: Palette,
      role: "Artist",
      company: "Freelance",
      period: "'21+",
      color: "#9b59b6",
    },
    {
      icon: UtensilsCrossed,
      role: "Kitchen",
      company: "Bouf's",
      period: "'22-25",
      color: "#e67e22",
    },
    {
      icon: Heart,
      role: "Intern",
      company: "Make It Work",
      period: "'23",
      color: "#e74c3c",
    },
    {
      icon: TreePine,
      role: "Intern",
      company: "OneBonsai",
      period: "'24",
      color: "#27ae60",
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
      
      {/* Content area - grid layout, no scroll */}
      <div className="p-3 relative z-10 h-full flex flex-col">
        <div
          className="flex-1 p-3"
          style={{
            backgroundColor: "#d4d4d4",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderBottom: "2px solid #fff",
            borderRight: "2px solid #fff",
          }}
        >
          <div className="grid grid-cols-3 gap-2 h-full">
            {experiences.map((exp, index) => {
              const IconComponent = exp.icon;
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-center p-2 text-center"
                  style={{
                    backgroundColor: "#c0c0c0",
                    borderTop: "1px solid #fff",
                    borderLeft: "1px solid #fff",
                    borderBottom: "1px solid #808080",
                    borderRight: "1px solid #808080",
                  }}
                >
                  <div 
                    className="w-8 h-8 flex items-center justify-center mb-1.5"
                    style={{
                      backgroundColor: exp.color,
                      borderTop: "1px solid #fff",
                      borderLeft: "1px solid #fff",
                      borderBottom: "1px solid #808080",
                      borderRight: "1px solid #808080",
                    }}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <span 
                    className="text-[11px] font-bold"
                    style={{ fontFamily: "var(--font-pixel)", color: "#000" }}
                  >
                    {exp.role}
                  </span>
                  <span 
                    className="text-[10px]"
                    style={{ fontFamily: "var(--font-pixel)", color: "#000080" }}
                  >
                    {exp.company}
                  </span>
                  <span 
                    className="text-[9px]"
                    style={{ fontFamily: "var(--font-pixel)", color: "#666" }}
                  >
                    {exp.period}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
