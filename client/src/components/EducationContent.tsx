export function EducationContent() {
  const educationItems = [
    {
      degree: "Bachelor — Idea & Innovation Management",
      school: "Erasmus Hogeschool Brussel",
      period: "2021–2024  (with praise)",
    },
    {
      degree: "Master — Business Administration",
      school: "VUB | 2024",
      period: "status: paused",
    },
    {
      degree: "Secondary — Accounting & CS",
      school: "KA Tervuren | 2012–2018",
      period: "",
    },
  ];

  return (
    <div
      className="h-full p-3 relative"
      style={{
        backgroundColor: "#a0a0a0",
      }}
    >
      {/* Pixelated noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23888' /%3E%3Crect x='2' y='1' width='1' height='1' fill='%23999' /%3E%3Crect x='1' y='2' width='1' height='1' fill='%23777' /%3E%3Crect x='3' y='3' width='1' height='1' fill='%238a8a8a' /%3E%3Crect x='0' y='3' width='1' height='1' fill='%23909090' /%3E%3Crect x='2' y='0' width='1' height='1' fill='%23858585' /%3E%3C/svg%3E")`,
          backgroundSize: "4px 4px",
          imageRendering: "pixelated",
        }}
      />
      
      {/* Content */}
      <div
        className="relative z-10 text-[9px] leading-relaxed"
        style={{
          fontFamily: "var(--font-pixel)",
          color: "#000",
        }}
      >
        {educationItems.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-start gap-1">
              <span>[■]</span>
              <span className="font-bold">{item.degree}</span>
            </div>
            <div className="ml-4">{item.school}</div>
            {item.period && <div className="ml-4">{item.period}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
