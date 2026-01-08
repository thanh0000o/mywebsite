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

function FolderIcon() {
  return (
    <svg width="40" height="36" viewBox="0 0 40 36" style={{ imageRendering: 'pixelated' }}>
      {/* Folder back */}
      <path d="M2 8 L14 8 L16 4 L38 4 L38 32 L2 32 Z" fill="#ffd700" stroke="#cc9900" strokeWidth="1"/>
      {/* Folder front */}
      <rect x="2" y="10" width="36" height="22" fill="#ffcc00" stroke="#cc9900" strokeWidth="1"/>
      {/* Folder tab */}
      <rect x="4" y="4" width="10" height="6" fill="#ffd700" stroke="#cc9900" strokeWidth="1"/>
      {/* Photo icon inside */}
      <rect x="12" y="16" width="16" height="12" fill="#fff" stroke="#808080" strokeWidth="1"/>
      <rect x="14" y="18" width="12" height="8" fill="#87ceeb"/>
      <circle cx="17" cy="21" r="2" fill="#fff"/>
      <path d="M14 26 L18 22 L22 24 L26 20 L26 26 Z" fill="#228b22"/>
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
                <FolderIcon />
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
