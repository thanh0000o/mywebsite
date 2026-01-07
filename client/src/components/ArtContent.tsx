import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import artWeb from "@assets/WEB_1767822627014.png";
import artVietnam from "@assets/thanh1000_layer_data_and_nature_and_invert_it_and_use_vietname_1767822627015.png";
import artParticle15 from "@assets/15particle_1767822627015.png";
import artChrome1 from "@assets/1673002998232_1767822627015.jpg";
import artChrome2 from "@assets/1673003000193_1767822627016.jpg";
import artChrome3 from "@assets/1673003000368_1767822627016.jpg";
import artParticle88 from "@assets/particle_88_1767822627018.png";

import videoCanvas2 from "@assets/canvas-video_(2)_1767822669992.webm";
import videoCanvas1 from "@assets/canvas-video_(1)_1767822684883.webm";
import videoCanvas3 from "@assets/canvas-video_(3)_1767822688279.webm";
import videoCanvas from "@assets/canvas-video_1767822694226.webm";
import videoBlobs1 from "@assets/P1060462_with_blobs_1767822697970.webm";
import videoBlobs2 from "@assets/P1090131_with_blobs_1767822701208.webm";

interface Artwork {
  type: "image" | "video";
  src: string;
  title: string;
}

const artworks: Artwork[] = [
  { type: "image", src: artChrome1, title: "Chrome I" },
  { type: "video", src: videoCanvas, title: "Canvas" },
  { type: "image", src: artParticle15, title: "Particles" },
  { type: "video", src: videoBlobs1, title: "Blobs I" },
  { type: "image", src: artChrome2, title: "Chrome II" },
  { type: "video", src: videoCanvas1, title: "Flow I" },
  { type: "image", src: artWeb, title: "Web" },
  { type: "video", src: videoCanvas2, title: "Flow II" },
  { type: "image", src: artChrome3, title: "Chrome III" },
  { type: "video", src: videoBlobs2, title: "Blobs II" },
  { type: "image", src: artVietnam, title: "Vietnam" },
  { type: "video", src: videoCanvas3, title: "Flow III" },
  { type: "image", src: artParticle88, title: "Particles II" },
];

function ArtViewer({ art, onClose }: { art: Artwork; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div 
        className="max-w-3xl max-h-[80vh] flex flex-col"
        style={{
          backgroundColor: '#C0C0C0',
          boxShadow: '4px 4px 15px rgba(0,0,0,0.5)',
          borderTop: '2px solid #fff',
          borderLeft: '2px solid #fff',
          borderBottom: '2px solid #808080',
          borderRight: '2px solid #808080',
        }}
        onClick={(e) => e.stopPropagation()}
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
              <span className="text-[8px]" style={{ color: '#000' }}>
                {art.type === "image" ? "I" : "V"}
              </span>
            </div>
            <span 
              className="text-sm font-bold"
              style={{ fontFamily: 'var(--font-pixel)', textShadow: '1px 1px 0 #000' }}
            >
              {art.title}.{art.type === "image" ? "bmp" : "avi"}
            </span>
          </div>
          <div className="flex gap-0.5">
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
              data-testid="button-close-art-viewer"
            >
              X
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div 
          className="flex items-center gap-4 px-2 py-0.5 text-[10px]"
          style={{
            backgroundColor: '#C0C0C0',
            borderBottom: '1px solid #808080',
            fontFamily: 'var(--font-pixel)',
            color: '#000',
          }}
        >
          {['File', 'Edit', 'View', 'Help'].map((item) => (
            <span key={item} className="cursor-default">
              <span style={{ textDecoration: 'underline' }}>{item[0]}</span>{item.slice(1)}
            </span>
          ))}
        </div>

        {/* Content Area */}
        <div 
          className="p-2 flex-1"
          style={{
            backgroundColor: '#c0c0c0',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              borderTop: '2px solid #808080',
              borderLeft: '2px solid #808080',
              borderBottom: '2px solid #fff',
              borderRight: '2px solid #fff',
              backgroundColor: '#000',
            }}
          >
            {art.type === "image" ? (
              <img
                src={art.src}
                alt={art.title}
                className="w-full h-full object-contain"
                style={{ maxHeight: '60vh' }}
                draggable={false}
              />
            ) : (
              <video
                src={art.src}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-contain"
                style={{ maxHeight: '60vh' }}
              />
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div 
          className="flex items-center justify-between px-2 py-0.5 text-[9px]"
          style={{
            backgroundColor: '#C0C0C0',
            borderTop: '1px solid #808080',
            fontFamily: 'var(--font-pixel)',
            color: '#000',
          }}
        >
          <span>{art.type === "image" ? "Image Viewer" : "Media Player"}</span>
          <span>{art.title} - Ready</span>
        </div>
      </div>
    </motion.div>
  );
}

export function ArtContent() {
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);

  return (
    <>
      <div 
        className="w-full h-full p-2"
        style={{
          backgroundColor: '#c0c0c0',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      >
        <div 
          className="w-full h-full overflow-auto p-2"
          style={{
            backgroundColor: '#1a1a1a',
            borderTop: '2px solid #808080',
            borderLeft: '2px solid #808080',
            borderBottom: '2px solid #fff',
            borderRight: '2px solid #fff',
          }}
        >
          <div className="grid grid-cols-4 gap-2 p-1">
            {artworks.map((art, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                style={{
                  backgroundColor: '#c0c0c0',
                  borderTop: '2px solid #fff',
                  borderLeft: '2px solid #fff',
                  borderBottom: '2px solid #808080',
                  borderRight: '2px solid #808080',
                }}
                onClick={() => setSelectedArt(art)}
                data-testid={`art-item-${index}`}
              >
                <div 
                  className="w-full h-full p-1"
                  style={{
                    borderTop: '1px solid #808080',
                    borderLeft: '1px solid #808080',
                    borderBottom: '1px solid #fff',
                    borderRight: '1px solid #fff',
                  }}
                >
                  {art.type === "image" ? (
                    <img
                      src={art.src}
                      alt={art.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <video
                      src={art.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div 
                  className="absolute bottom-0 left-0 right-0 text-center py-0.5 text-[8px]"
                  style={{
                    backgroundColor: 'rgba(0,0,128,0.9)',
                    color: '#fff',
                    fontFamily: 'var(--font-pixel)',
                  }}
                >
                  {art.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedArt && (
          <ArtViewer art={selectedArt} onClose={() => setSelectedArt(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
