import { Sparkles, Eye, Cpu, Heart, Lightbulb } from "lucide-react";

const paragraphs = [
  {
    icon: Sparkles,
    color: "#9b59b6",
    text: "Visual thinker and builder based in Brussels. Art, technology, and design as a chance to explore what makes us human.",
  },
  {
    icon: Eye,
    color: "#3498db",
    text: "Process starts with observing carefully - a slow, thoughtful way of thinking. Interest in memory, desire, change, and the urge to be more.",
  },
  {
    icon: Cpu,
    color: "#27ae60",
    text: "Background in Innovation Management, visual communication, and creative direction. Curious about AI tools and how they change our world.",
  },
  {
    icon: Heart,
    color: "#e74c3c",
    text: "Multicultural upbringing with experience in youth leadership and creative work. Tackles every project with empathy and discipline.",
  },
  {
    icon: Lightbulb,
    color: "#f39c12",
    text: "Goal: create chances for people to pause, reflect, and find beauty in complex things. Mixing imagination, technology, and human understanding.",
  },
];

export function AboutMeContent() {
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
      
      {/* Content area - no scroll */}
      <div className="p-2 relative z-10 h-full flex flex-col">
        {/* Inner content panel with inset border */}
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
          {paragraphs.map((para, index) => {
            const IconComponent = para.icon;
            return (
              <div 
                key={index} 
                className="flex items-start gap-2 p-1.5 flex-1"
                style={{
                  backgroundColor: "#c0c0c0",
                  borderTop: "1px solid #fff",
                  borderLeft: "1px solid #fff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                }}
              >
                <div 
                  className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    backgroundColor: para.color,
                    borderTop: "1px solid rgba(255,255,255,0.5)",
                    borderLeft: "1px solid rgba(255,255,255,0.5)",
                    borderBottom: "1px solid rgba(0,0,0,0.3)",
                    borderRight: "1px solid rgba(0,0,0,0.3)",
                  }}
                >
                  <IconComponent className="w-3 h-3 text-white" />
                </div>
                <p
                  className="text-[9px] leading-snug flex-1"
                  style={{
                    fontFamily: "var(--font-pixel)",
                    color: "#000",
                  }}
                >
                  <span style={{ color: "#000080" }}>&gt;</span> {para.text}
                </p>
              </div>
            );
          })}
          
          {/* Footer */}
          <div
            className="text-[8px] text-center pt-1"
            style={{
              fontFamily: "var(--font-pixel)",
              color: "#666",
            }}
          >
            [EOF] Brussels, Belgium
          </div>
        </div>
      </div>
    </div>
  );
}
