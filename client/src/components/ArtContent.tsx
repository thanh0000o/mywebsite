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

export interface Artwork {
  type: "image" | "video";
  src: string;
  title: string;
}

export const artworks: Artwork[] = [
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

interface ArtContentProps {
  onOpenArt?: (art: Artwork) => void;
}

export function ArtContent({ onOpenArt }: ArtContentProps) {
  return (
    <div 
        className="w-full h-full p-2 relative"
        style={{
          backgroundColor: '#c0c0c0',
        }}
      >
        {/* Pixelated noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23999' /%3E%3Crect x='2' y='1' width='1' height='1' fill='%23bbb' /%3E%3Crect x='1' y='2' width='1' height='1' fill='%23888' /%3E%3Crect x='3' y='3' width='1' height='1' fill='%23aaa' /%3E%3C/svg%3E")`,
            backgroundSize: "4px 4px",
            imageRendering: "pixelated" as const,
            opacity: 0.6,
            zIndex: 0,
          }}
        />
        {/* Moving scanlines overlay */}
        <div className="window-scanlines" aria-hidden="true" />
        <div 
          className="w-full h-full overflow-auto p-2 relative z-10"
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
                onClick={() => onOpenArt?.(art)}
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
  );
}
