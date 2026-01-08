import { motion } from "framer-motion";

interface PhotoAlbum {
  id: number;
  name: string;
  url: string;
}

const photoAlbums: PhotoAlbum[] = [
  { id: 1, name: "Nisramont0001 ~ 2025", url: "https://photos.app.goo.gl/kGwj2teWLqTnMvRj9" },
  { id: 2, name: "Adventures0001 ~ 2025", url: "https://photos.app.goo.gl/7sMG6CvVPRtHAzV77" },
  { id: 3, name: "Adventures0002 ~ 2024", url: "https://photos.app.goo.gl/BXVSEyk1eL9gaqbZ7" },
  { id: 4, name: "Vietnam ~ 2025", url: "https://photos.app.goo.gl/QywY3S1kiwUhMkmNA" },
  { id: 5, name: "Schwarzwald ~ 2025", url: "https://photos.app.goo.gl/tVwSuGMDT4FWxp4E8" },
  { id: 6, name: "Swiss ~ 2025", url: "https://photos.app.goo.gl/th9VsrySG5VXqspr5" },
  { id: 7, name: "France0001 ~ 2025", url: "https://photos.app.goo.gl/QFzcRiTBRgviKVCi9" },
  { id: 8, name: "Nisramont0002 ~ 2021", url: "https://photos.app.goo.gl/XUndRER9crjrFP1v5" },
];

function InternetExplorerIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
      <circle cx="16" cy="16" r="14" fill="#0078d4" stroke="#005a9e" strokeWidth="1"/>
      <ellipse cx="16" cy="16" rx="12" ry="6" fill="none" stroke="#fff" strokeWidth="2"/>
      <ellipse cx="16" cy="16" rx="8" ry="4" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="16" cy="16" r="3" fill="#fff"/>
      <path d="M4 16 Q8 8, 16 8 Q24 8, 28 16" fill="none" stroke="#ffd700" strokeWidth="2"/>
    </svg>
  );
}

export function PhotoAlbumsContent() {
  const handleAlbumClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="h-full p-3 overflow-auto"
      style={{
        backgroundColor: "#c0c0c0",
      }}
    >
      <div 
        className="mb-3 p-2"
        style={{
          backgroundColor: "#fff",
          borderTop: "2px solid #808080",
          borderLeft: "2px solid #808080",
          borderBottom: "2px solid #fff",
          borderRight: "2px solid #fff",
        }}
      >
        <p 
          className="text-[9px]"
          style={{ fontFamily: "var(--font-pixel)", color: "#000" }}
        >
          &gt; Click on an album to open in new tab
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {photoAlbums.map((album, index) => (
          <motion.button
            key={album.id}
            onClick={() => handleAlbumClick(album.url)}
            className="flex flex-col items-center p-2 group"
            style={{ background: 'transparent', minWidth: '100px' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            data-testid={`button-album-${album.id}`}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-[#0078d4]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
              <div className="relative drop-shadow-[0_0_8px_rgba(0,120,212,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(0,120,212,1)] transition-all duration-300">
                <InternetExplorerIcon />
              </div>
            </div>
            <span
              className="mt-2 text-[7px] text-center transition-all duration-300 group-hover:text-[#0078d4] leading-tight"
              style={{ fontFamily: 'var(--font-pixel)', color: '#000', maxWidth: '90px', wordBreak: 'break-word' }}
            >
              {album.name}
            </span>
          </motion.button>
        ))}
      </div>

      <div 
        className="mt-4 p-2"
        style={{
          backgroundColor: "#fff",
          borderTop: "2px solid #808080",
          borderLeft: "2px solid #808080",
          borderBottom: "2px solid #fff",
          borderRight: "2px solid #fff",
        }}
      >
        <p 
          className="text-[8px]"
          style={{ fontFamily: "var(--font-pixel)", color: "#666" }}
        >
          {photoAlbums.length} album(s) | Google Photos
        </p>
      </div>
    </div>
  );
}
