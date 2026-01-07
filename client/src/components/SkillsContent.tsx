import { Brain, Lightbulb, Sparkles, Eye, Users, Target, Award, Clock } from "lucide-react";

export function SkillsContent() {
  const skills = [
    { icon: Brain, label: "Deep thinker", color: "#8e44ad" },
    { icon: Lightbulb, label: "Builder", color: "#f39c12" },
    { icon: Sparkles, label: "AI explorer", color: "#3498db" },
    { icon: Eye, label: "Creative", color: "#e91e63" },
    { icon: Users, label: "Empathetic", color: "#00bcd4" },
    { icon: Target, label: "Focused", color: "#4caf50" },
    { icon: Award, label: "High standards", color: "#ff5722" },
    { icon: Clock, label: "Deadline pro", color: "#607d8b" },
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
      
      {/* Content area - horizontal pill layout */}
      <div className="p-2 relative z-10 h-full flex flex-col">
        <div
          className="flex-1 p-2 flex flex-wrap content-start gap-1"
          style={{
            backgroundColor: "#d4d4d4",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderBottom: "2px solid #fff",
            borderRight: "2px solid #fff",
          }}
        >
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div 
                key={index} 
                className="flex items-center gap-1 px-2 py-1"
                style={{
                  backgroundColor: skill.color,
                  borderTop: "1px solid rgba(255,255,255,0.5)",
                  borderLeft: "1px solid rgba(255,255,255,0.5)",
                  borderBottom: "1px solid rgba(0,0,0,0.3)",
                  borderRight: "1px solid rgba(0,0,0,0.3)",
                }}
              >
                <IconComponent className="w-3 h-3 text-white" />
                <span 
                  className="text-[8px] text-white font-bold"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  {skill.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
