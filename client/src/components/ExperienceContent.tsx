export function ExperienceContent() {
  const experiences = [
    {
      role: "Student Intern",
      description: "banking operations & certification support",
      company: "Argenta Tervuren",
      period: "2018",
    },
    {
      role: "Leader",
      description: "youth coordination & project organization",
      company: "Scouts en Gidsen Vlaanderen",
      period: "2019–2022",
    },
    {
      role: "Digital artist",
      description: "cover art & creative visuals",
      company: "Freelance",
      period: "2021+",
    },
    {
      role: "Student job",
      description: "kitchen helper, food preparation & workflow support",
      company: "Bouf's restaurant",
      period: "2022–2025",
    },
    {
      role: "Student Intern",
      description: "youth coaching support & visual communication",
      company: "Make It Work",
      period: "2023",
    },
    {
      role: "Student Intern",
      description: "marketing, research & client presentations",
      company: "OneBonsai",
      period: "2024",
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
      
      {/* Content area */}
      <div className="p-3 overflow-y-auto relative z-10 h-full">
        <div
          className="h-full p-4 overflow-y-auto"
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
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="mb-3 pb-2" 
                style={{ 
                  borderBottom: index < experiences.length - 1 ? "1px dotted #999" : "none" 
                }}
              >
                <div className="flex items-start gap-1">
                  <span style={{ color: "#000080" }}>[*]</span>
                  <span className="font-bold">{exp.role}</span>
                  <span style={{ color: "#666" }}>| {exp.period}</span>
                </div>
                <div className="ml-4" style={{ color: "#333" }}>{exp.description}</div>
                <div className="ml-4">
                  <span style={{ color: "#000080" }}>{exp.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
