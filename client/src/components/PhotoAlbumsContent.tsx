import { motion } from "framer-motion";

interface PhotoAlbum {
  id: number;
  name: string;
  year: string;
  url: string;
}

const photoAlbums: PhotoAlbum[] = [
  { id: 1, name: "Nisramont0001", year: "2025", url: "https://photos.app.goo.gl/kGwj2teWLqTnMvRj9" },
  { id: 2, name: "Adventures0001", year: "2025", url: "https://photos.app.goo.gl/7sMG6CvVPRtHAzV77" },
  { id: 3, name: "Adventures0002", year: "2024", url: "https://photos.app.goo.gl/BXVSEyk1eL9gaqbZ7" },
  { id: 4, name: "Vietnam", year: "2025", url: "https://photos.app.goo.gl/QywY3S1kiwUhMkmNA" },
  { id: 5, name: "Schwarzwald", year: "2025", url: "https://photos.app.goo.gl/tVwSuGMDT4FWxp4E8" },
  { id: 6, name: "Swiss", year: "2025", url: "https://photos.app.goo.gl/th9VsrySG5VXqspr5" },
  { id: 7, name: "France0001", year: "2025", url: "https://photos.app.goo.gl/QFzcRiTBRgviKVCi9" },
  { id: 8, name: "Nisramont0002", year: "2021", url: "https://photos.app.goo.gl/XUndRER9crjrFP1v5" },
];

const pastelColors = [
  '#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', 
  '#bae1ff', '#e0bbff', '#ffc8dd', '#bde0fe'
];

function PolaroidIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="52" viewBox="0 0 44 52" style={{ imageRendering: 'pixelated' }}>
      {/* Polaroid frame */}
      <rect x="2" y="2" width="40" height="48" fill="#fffef5" stroke="#ddd" strokeWidth="2" rx="1"/>
      {/* Photo area */}
      <rect x="6" y="6" width="32" height="28" fill={color} stroke="#ccc" strokeWidth="1"/>
      {/* Cute camera icon in photo */}
      <circle cx="22" cy="18" r="8" fill="rgba(255,255,255,0.5)"/>
      <circle cx="22" cy="18" r="5" fill="#fff"/>
      <circle cx="22" cy="18" r="3" fill={color}/>
      <rect x="14" y="12" width="16" height="2" fill="rgba(255,255,255,0.4)"/>
      {/* Decorative tape on corner */}
      <rect x="30" y="0" width="10" height="6" fill="#ffd700" opacity="0.7" transform="rotate(15, 35, 3)"/>
    </svg>
  );
}

function Sparkle({ delay }: { delay: number }) {
  return (
    <motion.svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className="absolute"
      style={{ top: '-4px', right: '-4px' }}
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
      }}
    >
      <path d="M6 0 L7 4 L6 3 L5 4 Z M6 12 L5 8 L6 9 L7 8 Z M0 6 L4 5 L3 6 L4 7 Z M12 6 L8 7 L9 6 L8 5 Z" fill="#ffd700"/>
    </motion.svg>
  );
}

export function PhotoAlbumsContent() {
  const handleAlbumClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="h-full p-3 flex flex-col"
      style={{
        background: "linear-gradient(135deg, #e8f4f8 0%, #f0e6f6 50%, #fce4ec 100%)",
      }}
    >
      {/* Cute header with decorative elements */}
      <div 
        className="mb-3 p-2 flex items-center gap-2"
        style={{
          backgroundColor: "#fffef5",
          borderTop: "2px solid #fff",
          borderLeft: "2px solid #fff",
          borderBottom: "2px solid #ddd",
          borderRight: "2px solid #ddd",
          boxShadow: "2px 2px 0 rgba(0,0,0,0.1)",
        }}
      >
        <span style={{ fontSize: '14px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <rect x="2" y="4" width="12" height="10" fill="#ffd700" stroke="#cc9900" strokeWidth="1" rx="1"/>
            <circle cx="8" cy="9" r="3" fill="#333"/>
            <circle cx="8" cy="9" r="1.5" fill="#666"/>
            <rect x="5" y="2" width="6" height="3" fill="#888"/>
          </svg>
        </span>
        <p 
          className="text-[9px]"
          style={{ fontFamily: "var(--font-pixel)", color: "#666" }}
        >
          Click to open album in new tab
        </p>
      </div>

      {/* Album grid with polaroid-style cards */}
      <div className="grid grid-cols-4 gap-4 flex-1 content-start">
        {photoAlbums.map((album, index) => (
          <motion.button
            key={album.id}
            onClick={() => handleAlbumClick(album.url)}
            className="flex flex-col items-center group"
            style={{ background: 'transparent' }}
            whileHover={{ scale: 1.05, rotate: [-1, 1][index % 2] }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 15, rotate: (index % 2 === 0 ? -2 : 2) }}
            animate={{ opacity: 1, y: 0, rotate: (index % 2 === 0 ? -1 : 1) }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
            data-testid={`button-album-${album.id}`}
          >
            <div className="relative">
              <Sparkle delay={index * 0.3} />
              <div 
                className="transition-all duration-300 group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.15))' }}
              >
                <PolaroidIcon color={pastelColors[index % pastelColors.length]} />
              </div>
            </div>
            <div 
              className="mt-1 px-2 py-1 text-center rounded-sm"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.8)',
                boxShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              <span
                className="block text-[7px] leading-tight font-bold"
                style={{ fontFamily: 'var(--font-pixel)', color: '#444' }}
              >
                {album.name}
              </span>
              <span
                className="block text-[6px] leading-tight"
                style={{ 
                  fontFamily: 'var(--font-pixel)', 
                  color: pastelColors[index % pastelColors.length].replace('#ff', '#99').replace('#ba', '#77'),
                }}
              >
                ~ {album.year}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer with cute styling */}
      <div 
        className="mt-auto p-2 flex items-center justify-between"
        style={{
          backgroundColor: "#fffef5",
          borderTop: "2px solid #fff",
          borderLeft: "2px solid #fff",
          borderBottom: "2px solid #ddd",
          borderRight: "2px solid #ddd",
          boxShadow: "2px 2px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M6 1 L7 4 L10 4 L7.5 6 L8.5 9 L6 7 L3.5 9 L4.5 6 L2 4 L5 4 Z" fill="#ffd700"/>
          </svg>
          <p 
            className="text-[8px]"
            style={{ fontFamily: "var(--font-pixel)", color: "#888" }}
          >
            {photoAlbums.length} albums
          </p>
        </div>
        <p 
          className="text-[7px]"
          style={{ fontFamily: "var(--font-pixel)", color: "#aaa" }}
        >
          Google Photos
        </p>
      </div>
    </div>
  );
}
