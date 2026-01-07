import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@assets/ChatGPT_Image_Jan_7,_2026,_12_04_31_PM_1767811147577.png";

interface DreamweaverWindowProps {
  onClose: () => void;
}

const aboutMeText = `Gerrit Thành Lambeets is a visual thinker and builder based in Brussels. He sees art, technology, and design as a chance to constantly explore what makes us human, how we see the world, and what we can achieve.

His process always starts with observing things carefully a slow, thoughtful way of thinking that allows ideas to form naturally. This quiet focus leads to a strong interest in how we move between the real, physical world and the forces we can't see but feel every day: things like memory, desire, change, and the subtle urge to be more than ordinary.

With a background that includes Innovation Management, visual communication, and creative direction, Gerrit is comfortable moving between big concepts and the technical work needed to finish a project. He is always curious about new technologies like AI tools and digital ways of working, and how they change the environments we live in, both personally and together. For him, technology isn't a distraction; it's a tool to expand, challenge, or rethink human meaning.

Thanks to a multicultural upbringing and experience in youth leadership, research, and creative work, he tackles every project with empathy, clear thinking, and strong discipline. His approach is all about growth: constantly learning, improving his skills, and giving each idea the time it needs to become something solid. He believes creativity isn't a flash of genius, but a conversation between people, between tools, and between the world as it is and the world we imagine it could be.

In all his work, Gerrit wants to create chances for people to pause, reflect, and find the simple beauty hidden inside complex things. His goal is to build thoughtful, impactful experiences that successfully mix imagination, technology, and human understanding into work that truly connects with people.`;

function AboutMeModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center z-[60] p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
    >
      <div
        className="flex flex-col"
        style={{
          width: '500px',
          maxHeight: '80vh',
          backgroundColor: '#C0C0C0',
          boxShadow: '5px 5px 20px rgba(0,0,0,0.5)',
          borderTop: '2px solid #fff',
          borderLeft: '2px solid #fff',
          borderBottom: '2px solid #808080',
          borderRight: '2px solid #808080',
        }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center justify-between px-1 py-0.5"
          style={{
            background: 'linear-gradient(90deg, #000080, #1084d0)',
            color: 'white',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 flex items-center justify-center"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '1px solid #fff',
                borderLeft: '1px solid #fff',
                borderBottom: '1px solid #808080',
                borderRight: '1px solid #808080',
              }}
            >
              <span className="text-[8px]" style={{ color: '#000' }}>?</span>
            </div>
            <span
              className="text-sm font-bold"
              style={{ fontFamily: 'var(--font-pixel)', textShadow: '1px 1px 0 #000' }}
            >
              Untitled-1 - gerrit thành lambeets
            </span>
          </div>
          <div className="flex gap-0.5">
            <button
              className="w-5 h-5 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderBottom: '2px solid #808080',
                borderRight: '2px solid #808080',
                color: '#000',
              }}
              data-testid="button-about-minimize"
            >
              _
            </button>
            <button
              className="w-5 h-5 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderBottom: '2px solid #808080',
                borderRight: '2px solid #808080',
                color: '#000',
              }}
              data-testid="button-about-maximize"
            >
              □
            </button>
            <button
              onClick={onClose}
              className="w-5 h-5 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderBottom: '2px solid #808080',
                borderRight: '2px solid #808080',
                color: '#000',
              }}
              data-testid="button-about-close"
            >
              X
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div
          className="flex-1 m-1 p-4 overflow-y-auto"
          style={{
            backgroundColor: '#fff',
            borderTop: '2px solid #808080',
            borderLeft: '2px solid #808080',
            borderBottom: '2px solid #fff',
            borderRight: '2px solid #fff',
          }}
        >
          {/* Title */}
          <h1
            className="text-3xl font-bold mb-4 pb-2"
            style={{
              fontFamily: 'var(--font-pixel)',
              color: '#000',
              borderBottom: '2px solid #000',
            }}
          >
            About Me
          </h1>

          {/* Text Content */}
          <div
            className="text-sm leading-relaxed"
            style={{
              fontFamily: 'var(--font-pixel)',
              color: '#000',
            }}
          >
            {aboutMeText.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div
          className="flex items-center justify-between px-2 py-0.5 text-[10px]"
          style={{
            backgroundColor: '#C0C0C0',
            borderTop: '1px solid #808080',
            fontFamily: 'var(--font-pixel)',
            color: '#000',
          }}
        >
          <span>&lt;body&gt;</span>
          <span>Ready</span>
        </div>
      </div>
    </motion.div>
  );
}

export function DreamweaverWindow({ onClose }: DreamweaverWindowProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const tabs = ['ART', 'ABOUT ME', 'EDUCATION', 'LANGUAGES', 'EXPERIENCE', 'SOFTWARE', 'SOFTSKILLS', 'VALUES'];

  const handleTabClick = (tab: string) => {
    if (tab === 'ABOUT ME') {
      setActiveModal('aboutme');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div 
          className="w-[60vw] h-[60vh] flex flex-col"
          style={{
            backgroundColor: '#C0C0C0',
            boxShadow: '5px 5px 20px rgba(0,0,0,0.5)',
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderBottom: '2px solid #808080',
            borderRight: '2px solid #808080',
          }}
        >
          {/* Title Bar */}
          <div 
            className="flex items-center justify-between px-1 py-0.5"
            style={{
              background: 'linear-gradient(90deg, #000080, #1084d0)',
              color: 'white',
            }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 flex items-center justify-center"
                style={{
                  backgroundColor: '#C0C0C0',
                  borderTop: '1px solid #fff',
                  borderLeft: '1px solid #fff',
                  borderBottom: '1px solid #808080',
                  borderRight: '1px solid #808080',
                }}
              >
                <span className="text-[8px]" style={{ color: '#000' }}>W</span>
              </div>
              <span 
                className="text-sm font-bold"
                style={{ fontFamily: 'var(--font-pixel)', textShadow: '1px 1px 0 #000' }}
              >
                Untitled-1 - gerrit thành lambeets
              </span>
            </div>
            <div className="flex gap-0.5">
              {/* Minimize */}
              <button
                className="w-5 h-5 flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: '#C0C0C0',
                  borderTop: '2px solid #fff',
                  borderLeft: '2px solid #fff',
                  borderBottom: '2px solid #808080',
                  borderRight: '2px solid #808080',
                  color: '#000',
                }}
                data-testid="button-minimize"
              >
                _
              </button>
              {/* Maximize */}
              <button
                className="w-5 h-5 flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: '#C0C0C0',
                  borderTop: '2px solid #fff',
                  borderLeft: '2px solid #fff',
                  borderBottom: '2px solid #808080',
                  borderRight: '2px solid #808080',
                  color: '#000',
                }}
                data-testid="button-maximize"
              >
                □
              </button>
              {/* Close */}
              <button
                onClick={onClose}
                className="w-5 h-5 flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: '#C0C0C0',
                  borderTop: '2px solid #fff',
                  borderLeft: '2px solid #fff',
                  borderBottom: '2px solid #808080',
                  borderRight: '2px solid #808080',
                  color: '#000',
                }}
                data-testid="button-close"
              >
                X
              </button>
            </div>
          </div>

          {/* Menu Bar */}
          <div 
            className="flex items-center gap-4 px-2 py-1 text-sm"
            style={{
              backgroundColor: '#C0C0C0',
              borderBottom: '1px solid #808080',
              fontFamily: 'var(--font-pixel)',
              color: '#000',
            }}
          >
            {['File', 'Edit', 'View', 'Insert', 'Modify', 'Text', 'Window', 'Help'].map((item) => (
              <span 
                key={item} 
                className="cursor-pointer"
                style={{ fontSize: '12px', color: '#000' }}
              >
                <span style={{ textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '2px' }}>{item[0]}</span>{item.slice(1)}
              </span>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <div 
              className="flex flex-col gap-1 p-1"
              style={{
                width: '30px',
                backgroundColor: '#C0C0C0',
                borderRight: '1px solid #808080',
              }}
            >
              {['▼', '□', '⊞', '⊟', '▤', '●', '⟁', '⚡', '✦'].map((icon, i) => (
                <div
                  key={i}
                  className="w-5 h-5 flex items-center justify-center text-[8px] cursor-pointer"
                  style={{
                    backgroundColor: '#C0C0C0',
                    borderTop: '1px solid #fff',
                    borderLeft: '1px solid #fff',
                    borderBottom: '1px solid #808080',
                    borderRight: '1px solid #808080',
                    color: '#000',
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex-1 flex flex-col">
              {/* Top Toolbar */}
              <div 
                className="flex items-center justify-between px-2 gap-2"
                style={{
                  height: '40px',
                  backgroundColor: '#C0C0C0',
                  borderBottom: '1px solid #808080',
                }}
              >
                <div 
                  className="w-6 h-6"
                  style={{
                    backgroundColor: '#000080',
                    borderTop: '1px solid #fff',
                    borderLeft: '1px solid #fff',
                    borderBottom: '1px solid #808080',
                    borderRight: '1px solid #808080',
                  }}
                />
                <div className="flex items-center gap-1">
                  {tabs.map((tab) => (
                    <div
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className="px-2 py-1 text-[10px] cursor-pointer font-bold"
                      style={{
                        backgroundColor: '#C0C0C0',
                        borderTop: '2px solid #fff',
                        borderLeft: '2px solid #fff',
                        borderBottom: '2px solid #808080',
                        borderRight: '2px solid #808080',
                        fontFamily: 'var(--font-pixel)',
                        color: '#000',
                      }}
                      data-testid={`tab-${tab.toLowerCase().replace(' ', '-')}`}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Canvas with noise texture */}
              <div 
                className="flex-1 m-1 relative overflow-hidden"
                style={{
                  backgroundColor: '#ffffff',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
                  borderTop: '2px solid #808080',
                  borderLeft: '2px solid #808080',
                  borderBottom: '2px solid #fff',
                  borderRight: '2px solid #fff',
                }}
              >
                {/* Centered logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={logoImage}
                    alt="Thành Lambeets"
                    className="w-72 h-auto object-contain"
                    style={{ imageRendering: 'pixelated' }}
                    draggable={false}
                  />
                </div>
              </div>

              {/* Bottom Toolbar */}
              <div 
                className="flex items-center px-2 gap-2"
                style={{
                  height: '50px',
                  backgroundColor: '#C0C0C0',
                  borderTop: '1px solid #808080',
                }}
              >
                <div className="flex items-center gap-1">
                  <span className="text-[10px]" style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}>Format</span>
                  <select 
                    className="text-[10px] px-1"
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #808080',
                      fontFamily: 'var(--font-pixel)',
                      color: '#000',
                    }}
                  >
                    <option>None</option>
                  </select>
                </div>

                <select 
                  className="text-[10px] px-1"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #808080',
                    fontFamily: 'var(--font-pixel)',
                    color: '#000',
                  }}
                >
                  <option>Default Font</option>
                </select>

                <select 
                  className="text-[10px] px-1"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #808080',
                    fontFamily: 'var(--font-pixel)',
                    color: '#000',
                  }}
                >
                  <option>Default Size</option>
                </select>

                <div className="flex gap-0.5">
                  {['B', 'I', '≡', '≡', '≡'].map((btn, i) => (
                    <button
                      key={i}
                      className="w-5 h-5 flex items-center justify-center text-[10px] font-bold"
                      style={{
                        backgroundColor: '#C0C0C0',
                        borderTop: '2px solid #fff',
                        borderLeft: '2px solid #fff',
                        borderBottom: '2px solid #808080',
                        borderRight: '2px solid #808080',
                        color: '#000',
                      }}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div 
            className="flex items-center justify-between px-2 py-0.5 text-[10px]"
            style={{
              backgroundColor: '#C0C0C0',
              borderTop: '1px solid #808080',
              fontFamily: 'var(--font-pixel)',
              color: '#000',
            }}
          >
            <span>&lt;body&gt;</span>
            <span>1K / 1 sec</span>
          </div>
        </div>
      </motion.div>

      {/* About Me Modal */}
      <AnimatePresence>
        {activeModal === 'aboutme' && (
          <AboutMeModal onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
