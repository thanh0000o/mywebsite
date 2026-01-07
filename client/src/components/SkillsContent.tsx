export function SkillsContent() {
  const skills = [
    "Deep thinking",
    "Curious builder mindset",
    "AI-driven workflow exploration",
    "Visual & conceptual creativity",
    "Empathetic collaboration",
    "Self-directed focus",
    "High personal standards",
    "Deadline discipline",
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
      
      {/* Content area */}
      <div className="p-3 relative z-10 h-full">
        <div
          className="h-full p-4"
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
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <span style={{ color: "#000080" }}>&gt;</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
