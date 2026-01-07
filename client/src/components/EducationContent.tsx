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
      className="h-full p-3 overflow-y-auto"
      style={{
        backgroundColor: "#fff",
      }}
    >
      {/* Content */}
      <div
        className="text-[10px] leading-relaxed"
        style={{
          fontFamily: "var(--font-pixel)",
          color: "#000",
        }}
      >
        {educationItems.map((item, index) => (
          <div key={index} className="mb-3">
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
