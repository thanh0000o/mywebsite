const aboutMeText = `Gerrit Thành Lambeets is a visual thinker and builder based in Brussels. He sees art, technology, and design as a chance to constantly explore what makes us human, how we see the world, and what we can achieve.

His process always starts with observing things carefully a slow, thoughtful way of thinking that allows ideas to form naturally. This quiet focus leads to a strong interest in how we move between the real, physical world and the forces we can't see but feel every day: things like memory, desire, change, and the subtle urge to be more than ordinary.

With a background that includes Innovation Management, visual communication, and creative direction, Gerrit is comfortable moving between big concepts and the technical work needed to finish a project. He is always curious about new technologies like AI tools and digital ways of working, and how they change the environments we live in, both personally and together. For him, technology isn't a distraction; it's a tool to expand, challenge, or rethink human meaning.

Thanks to a multicultural upbringing and experience in youth leadership, research, and creative work, he tackles every project with empathy, clear thinking, and strong discipline. His approach is all about growth: constantly learning, improving his skills, and giving each idea the time it needs to become something solid. He believes creativity isn't a flash of genius, but a conversation between people, between tools, and between the world as it is and the world we imagine it could be.

In all his work, Gerrit wants to create chances for people to pause, reflect, and find the simple beauty hidden inside complex things. His goal is to build thoughtful, impactful experiences that successfully mix imagination, technology, and human understanding into work that truly connects with people.`;

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
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23888' /%3E%3Crect x='3' y='1' width='1' height='1' fill='%23aaa' /%3E%3Crect x='1' y='3' width='1' height='1' fill='%23777' /%3E%3Crect x='4' y='4' width='1' height='1' fill='%239a9a9a' /%3E%3Crect x='2' y='5' width='1' height='1' fill='%23909090' /%3E%3Crect x='5' y='2' width='1' height='1' fill='%23858585' /%3E%3C/svg%3E")`,
          backgroundSize: "6px 6px",
          imageRendering: "pixelated",
        }}
      />
      
      {/* Header bar */}
      <div
        className="px-3 py-2 relative z-10"
        style={{
          background: "linear-gradient(90deg, #000080, #1084d0)",
          borderBottom: "2px solid #808080",
        }}
      >
        <h1
          className="text-sm font-bold tracking-wide"
          style={{
            fontFamily: "var(--font-pixel)",
            color: "#fff",
            textShadow: "1px 1px 0 #000",
          }}
        >
          // ABOUT_ME.txt
        </h1>
      </div>
      
      {/* Content area */}
      <div className="p-4 overflow-y-auto relative z-10" style={{ height: "calc(100% - 40px)" }}>
        {/* Inner content panel with inset border */}
        <div
          className="h-full p-3 overflow-y-auto"
          style={{
            backgroundColor: "#d4d4d4",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderBottom: "2px solid #fff",
            borderRight: "2px solid #fff",
          }}
        >
          <div
            className="text-[10px] leading-relaxed"
            style={{
              fontFamily: "var(--font-pixel)",
              color: "#000",
            }}
          >
            {aboutMeText.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-3">
                <span style={{ color: "#000080" }}>&gt;</span> {paragraph}
              </p>
            ))}
          </div>
          
          {/* Footer */}
          <div
            className="mt-4 pt-2 text-[9px]"
            style={{
              fontFamily: "var(--font-pixel)",
              color: "#666",
              borderTop: "1px dashed #999",
            }}
          >
            [EOF] Brussels, Belgium
          </div>
        </div>
      </div>
    </div>
  );
}
