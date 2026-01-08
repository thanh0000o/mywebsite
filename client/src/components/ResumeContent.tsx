import { motion } from "framer-motion";
import resumePdf from "@assets/resume_v2-landscape-V3-DEF_1767872450922.pdf";
import resumeImage from "@assets/image_1767872658054.png";

export function ResumeContent() {
  return (
    <div 
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{
        backgroundColor: '#C0C0C0',
        fontFamily: 'var(--font-pixel)',
      }}
    >
      {/* Pixelated noise texture background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23000' opacity='0.03'/%3E%3Crect x='2' y='1' width='1' height='1' fill='%23000' opacity='0.05'/%3E%3Crect x='1' y='2' width='1' height='1' fill='%23000' opacity='0.04'/%3E%3Crect x='3' y='3' width='1' height='1' fill='%23000' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: '4px 4px',
          opacity: 0.6,
        }}
      />

      {/* PDF Viewer Toolbar */}
      <div 
        className="flex items-center gap-1 px-2 py-1 relative z-10"
        style={{
          backgroundColor: '#C0C0C0',
          borderBottom: '2px solid #808080',
          boxShadow: 'inset 0 1px 0 #fff',
        }}
      >
        <motion.a
          href={resumePdf}
          download="Resume_ThanhLambeets.pdf"
          className="flex items-center gap-1 px-2 py-0.5"
          style={{
            backgroundColor: '#C0C0C0',
            border: '2px outset #fff',
            fontSize: '9px',
            color: '#000',
            textDecoration: 'none',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-testid="button-download-resume"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" style={{ imageRendering: 'pixelated' }}>
            <rect x="2" y="1" width="8" height="10" fill="#fff" stroke="#000" strokeWidth="1"/>
            <line x1="4" y1="4" x2="8" y2="4" stroke="#000" strokeWidth="1"/>
            <line x1="4" y1="6" x2="8" y2="6" stroke="#000" strokeWidth="1"/>
            <line x1="4" y1="8" x2="6" y2="8" stroke="#000" strokeWidth="1"/>
          </svg>
          Save
        </motion.a>
        
        <motion.a
          href={resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2 py-0.5"
          style={{
            backgroundColor: '#C0C0C0',
            border: '2px outset #fff',
            fontSize: '9px',
            color: '#000',
            textDecoration: 'none',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-testid="button-open-resume-new-tab"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" style={{ imageRendering: 'pixelated' }}>
            <rect x="1" y="3" width="8" height="8" fill="none" stroke="#000" strokeWidth="1"/>
            <polyline points="5,1 11,1 11,7" fill="none" stroke="#000" strokeWidth="1"/>
            <line x1="11" y1="1" x2="5" y2="7" stroke="#000" strokeWidth="1"/>
          </svg>
          Open
        </motion.a>

        <div className="flex-1" />
        
        <span style={{ fontSize: '8px', color: '#666' }}>
          Adobe Acrobat Reader 3.0
        </span>
      </div>

      {/* PDF Document Area */}
      <div 
        className="flex-1 relative z-10 overflow-auto"
        style={{
          backgroundColor: '#808080',
          boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        {/* Inner document frame */}
        <div className="p-3 min-h-full flex items-start justify-center">
          <div 
            className="bg-white relative"
            style={{
              boxShadow: '2px 2px 8px rgba(0,0,0,0.4)',
              maxWidth: '100%',
            }}
          >
            {/* Resume Image */}
            <img
              src={resumeImage}
              alt="Resume - Thành Lambeets"
              className="block"
              style={{
                backgroundColor: '#fff',
                imageRendering: 'auto',
                width: '100%',
                height: 'auto',
                maxWidth: '850px',
              }}
            />
            
            {/* Scanline overlay on document */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div 
        className="flex items-center justify-between px-2 py-0.5 relative z-10"
        style={{
          backgroundColor: '#C0C0C0',
          borderTop: '2px solid #fff',
          boxShadow: 'inset 0 -1px 0 #808080',
          fontSize: '8px',
          color: '#000',
        }}
      >
        <span>Document: resume_thanhlambeets.pdf</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  );
}
