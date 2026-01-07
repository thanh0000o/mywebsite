const aboutMeText = `Gerrit Thành Lambeets is a visual thinker and builder based in Brussels. He sees art, technology, and design as a chance to constantly explore what makes us human, how we see the world, and what we can achieve.

His process always starts with observing things carefully a slow, thoughtful way of thinking that allows ideas to form naturally. This quiet focus leads to a strong interest in how we move between the real, physical world and the forces we can't see but feel every day: things like memory, desire, change, and the subtle urge to be more than ordinary.

With a background that includes Innovation Management, visual communication, and creative direction, Gerrit is comfortable moving between big concepts and the technical work needed to finish a project. He is always curious about new technologies like AI tools and digital ways of working, and how they change the environments we live in, both personally and together. For him, technology isn't a distraction; it's a tool to expand, challenge, or rethink human meaning.

Thanks to a multicultural upbringing and experience in youth leadership, research, and creative work, he tackles every project with empathy, clear thinking, and strong discipline. His approach is all about growth: constantly learning, improving his skills, and giving each idea the time it needs to become something solid. He believes creativity isn't a flash of genius, but a conversation between people, between tools, and between the world as it is and the world we imagine it could be.

In all his work, Gerrit wants to create chances for people to pause, reflect, and find the simple beauty hidden inside complex things. His goal is to build thoughtful, impactful experiences that successfully mix imagination, technology, and human understanding into work that truly connects with people.`;

export function AboutMeContent() {
  return (
    <div
      className="h-full p-4 overflow-y-auto"
      style={{
        backgroundColor: "#fff",
      }}
    >
      {/* Title */}
      <h1
        className="text-3xl font-bold mb-4 pb-2"
        style={{
          fontFamily: "var(--font-pixel)",
          color: "#000",
          borderBottom: "2px solid #000",
        }}
      >
        About Me
      </h1>

      {/* Text Content */}
      <div
        className="text-sm leading-relaxed"
        style={{
          fontFamily: "var(--font-pixel)",
          color: "#000",
        }}
      >
        {aboutMeText.split("\n\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
