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

function PhotoFolderIcon() {
  return (
    <svg width="48" height="44" viewBox="0 0 48 44" style={{ imageRendering: 'auto' }}>
      <defs>
        <linearGradient id="folderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffe566"/>
          <stop offset="50%" stopColor="#ffd700"/>
          <stop offset="100%" stopColor="#e6c200"/>
        </linearGradient>
        <linearGradient id="photoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff"/>
          <stop offset="100%" stopColor="#e0e0e0"/>
        </linearGradient>
      </defs>
      {/* Folder shadow */}
      <ellipse cx="24" cy="42" rx="18" ry="2" fill="rgba(0,0,0,0.15)"/>
      {/* Folder back */}
      <path d="M4 12 L16 12 L18 8 L44 8 L44 38 L4 38 Z" fill="url(#folderGrad)" stroke="#b8960a" strokeWidth="1"/>
      {/* Folder front face */}
      <rect x="4" y="14" width="40" height="24" rx="1" fill="url(#folderGrad)" stroke="#b8960a" strokeWidth="1"/>
      {/* Folder highlight */}
      <rect x="6" y="15" width="36" height="3" fill="rgba(255,255,255,0.4)" rx="1"/>
      {/* Photo stack effect */}
      <rect x="14" y="19" width="20" height="14" fill="#f5f5f5" stroke="#999" strokeWidth="0.5" transform="rotate(-3, 24, 26)"/>
      <rect x="14" y="19" width="20" height="14" fill="url(#photoGrad)" stroke="#888" strokeWidth="0.5"/>
      {/* Photo image preview */}
      <rect x="16" y="21" width="16" height="10" fill="#3a7ca5"/>
      {/* Sun */}
      <circle cx="27" cy="24" r="2" fill="#ffd54f"/>
      {/* Mountains */}
      <path d="M16 31 L22 25 L26 28 L32 23 L32 31 Z" fill="#2e7d32" opacity="0.9"/>
      <path d="M16 31 L20 27 L24 31 Z" fill="#388e3c"/>
    </svg>
  );
}

export function PhotoAlbumsContent() {
  const handleAlbumClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="h-full p-2 flex flex-col"
      style={{
        backgroundColor: "#c0c0c0",
      }}
    >
      {/* Windows 95 style address bar */}
      <div 
        className="mb-2 p-1 flex items-center gap-2"
        style={{
          backgroundColor: "#fff",
          borderTop: "2px solid #808080",
          borderLeft: "2px solid #808080",
          borderBottom: "2px solid #fff",
          borderRight: "2px solid #fff",
        }}
      >
        <span 
          className="text-[9px]"
          style={{ fontFamily: "var(--font-pixel)", color: "#000" }}
        >
          Address:
        </span>
        <span 
          className="text-[9px] flex-1"
          style={{ fontFamily: "var(--font-pixel)", color: "#000080" }}
        >
          C:\Users\Thanh\Photos\
        </span>
      </div>

      {/* Album grid - classic Windows Explorer style */}
      <div 
        className="flex-1 p-2 overflow-auto"
        style={{
          backgroundColor: "#fff",
          borderTop: "2px solid #808080",
          borderLeft: "2px solid #808080",
          borderBottom: "2px solid #fff",
          borderRight: "2px solid #fff",
        }}
      >
        <div className="grid grid-cols-4 gap-4">
          {photoAlbums.map((album, index) => (
            <motion.button
              key={album.id}
              onClick={() => handleAlbumClick(album.url)}
              className="flex flex-col items-center p-2 group"
              style={{ background: 'transparent' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              data-testid={`button-album-${album.id}`}
            >
              <div className="relative group-hover:brightness-110 transition-all">
                <PhotoFolderIcon />
              </div>
              <div className="mt-1 text-center">
                <span
                  className="block text-[8px] leading-tight"
                  style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}
                >
                  {album.name}
                </span>
                <span
                  className="block text-[7px] leading-tight"
                  style={{ fontFamily: 'var(--font-pixel)', color: '#666' }}
                >
                  ~ {album.year}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Windows 95 style status bar */}
      <div 
        className="mt-1 p-1 flex items-center justify-between"
        style={{
          backgroundColor: "#c0c0c0",
          borderTop: "1px solid #fff",
        }}
      >
        <span 
          className="text-[8px]"
          style={{ fontFamily: "var(--font-pixel)", color: "#000" }}
        >
          {photoAlbums.length} object(s)
        </span>
        <span 
          className="text-[8px]"
          style={{ fontFamily: "var(--font-pixel)", color: "#000" }}
        >
          Google Photos
        </span>
      </div>
    </div>
  );
}
