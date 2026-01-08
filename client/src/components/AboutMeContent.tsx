import { Sparkles, Eye, Cpu, Heart, Lightbulb } from "lucide-react";

const paragraphs = [
  {
    icon: Sparkles,
    color: "#9b59b6",
    text: "Thành Lambeets is a visual thinker and builder based in Brussels. He sees art, technology, and design as a chance to constantly explore what makes us human, how we see the world, and what we can achieve.",
  },
  {
    icon: Eye,
    color: "#3498db",
    text: "His process always starts with observing things carefully a slow, thoughtful way of thinking that allows ideas to form naturally. This quiet focus leads to a strong interest in how we move between the real, physical world and the forces we can't see but feel every day: things like memory, desire, change, and the subtle urge to be more than ordinary.",
  },
  {
    icon: Cpu,
    color: "#27ae60",
    text: "With a background that includes Innovation Management, visual communication, and creative direction, Thành is comfortable moving between big concepts and the technical work needed to finish a project. He is always curious about new technologies like AI tools and digital ways of working, and how they change the environments we live in, both personally and together. For him, technology isn't a distraction; it's a tool to expand, challenge, or rethink human meaning.",
  },
  {
    icon: Heart,
    color: "#e74c3c",
    text: "Thanks to a multicultural upbringing and experience in youth leadership, research, and creative work, he tackles every project with empathy, clear thinking, and strong discipline. His approach is all about growth: constantly learning, improving his skills, and giving each idea the time it needs to become something solid. He believes creativity isn't a flash of genius, but a conversation between people, between tools, and between the world as it is and the world we imagine it could be.",
  },
  {
    icon: Lightbulb,
    color: "#f39c12",
    text: "In all his work, Thành wants to create chances for people to pause, reflect, and find the simple beauty hidden inside complex things. His goal is to build thoughtful, impactful experiences that successfully mix imagination, technology, and human understanding into work that truly connects with people.",
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
