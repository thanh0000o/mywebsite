import { useState } from "react";
import growSite1 from "@assets/Screenshot_2026-01-08_131054_1767874412181.png";
import growSite2 from "@assets/Screenshot_2026-01-08_131106_1767874412182.png";
import blenderSite from "@assets/Screenshot_2026-01-08_131205_1767874465574.png";

interface ArchivedSite {
  id: string;
  name: string;
  year: string;
  description: string;
  thumbnails: string[];
}

const archivedSites: ArchivedSite[] = [
  {
    id: "site1",
    name: "Grow Effect",
    year: "2024",
    description: "Interactive portfolio with animated grow effect. Elements bloom outward on scroll.",
    thumbnails: [growSite1, growSite2],
  },
  {
    id: "site2", 
    name: "Cloud Gallery",
    year: "2024",
    description: "3D portfolio made with Blender. Dreamy sky aesthetic with floating elements.",
    thumbnails: [blenderSite],
  },
];

export function WebsiteArchiveContent() {
  const [selectedSite, setSelectedSite] = useState<ArchivedSite | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div
      className="h-full relative"
      style={{
        backgroundColor: "#c0c0c0",
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
        }}
      />
      {/* Moving scanlines overlay */}
      <div className="window-scanlines" aria-hidden="true" />
      
      {/* Content area */}
      <div className="p-2 relative z-10 h-full flex flex-col">
        {/* Header */}
        <div 
          className="px-2 py-1 mb-2 flex items-center gap-2"
          style={{
            backgroundColor: "#000080",
            color: "#fff",
          }}
        >
          <svg width="16" height="14" viewBox="0 0 16 14" style={{ imageRendering: 'pixelated' }}>
            <rect x="0" y="2" width="16" height="12" fill="#ffd700"/>
            <rect x="0" y="0" width="6" height="4" fill="#ffd700"/>
            <rect x="1" y="3" width="14" height="10" fill="#e6c200"/>
          </svg>
          <span
            className="text-[10px]"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            Unreleased Website Designs
          </span>
        </div>

        {/* File list area */}
        <div
          className="flex-1 p-2"
          style={{
            backgroundColor: "#fff",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderBottom: "2px solid #fff",
            borderRight: "2px solid #fff",
          }}
        >
          {selectedSite ? (
            <div className="h-full flex flex-col">
              {/* Back button */}
              <button
                onClick={() => { setSelectedSite(null); setCurrentImageIndex(0); }}
                className="self-start mb-2 px-2 py-1 text-[9px]"
                style={{
                  backgroundColor: "#c0c0c0",
                  borderTop: "1px solid #fff",
                  borderLeft: "1px solid #fff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                  fontFamily: "var(--font-pixel)",
                  color: "#000",
                }}
                data-testid="button-back-archive"
              >
                &lt; Back
              </button>
              
              {/* Preview area */}
              <div 
                className="flex-1 flex items-center justify-center relative"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "2px solid #808080",
                }}
              >
                {selectedSite.thumbnails.length > 0 ? (
                  <>
                    <img 
                      src={selectedSite.thumbnails[currentImageIndex]} 
                      alt={`${selectedSite.name} - ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                    {selectedSite.thumbnails.length > 1 && (
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                        <button
                          onClick={() => setCurrentImageIndex(i => i > 0 ? i - 1 : selectedSite.thumbnails.length - 1)}
                          className="px-2 py-1 text-[9px]"
                          style={{
                            backgroundColor: "#c0c0c0",
                            borderTop: "1px solid #fff",
                            borderLeft: "1px solid #fff",
                            borderBottom: "1px solid #808080",
                            borderRight: "1px solid #808080",
                            fontFamily: "var(--font-pixel)",
                            color: "#000",
                          }}
                          data-testid="button-prev-image"
                        >
                          &lt;
                        </button>
                        <span
                          className="px-2 py-1 text-[9px]"
                          style={{
                            backgroundColor: "#000080",
                            color: "#fff",
                            fontFamily: "var(--font-pixel)",
                          }}
                        >
                          {currentImageIndex + 1} / {selectedSite.thumbnails.length}
                        </span>
                        <button
                          onClick={() => setCurrentImageIndex(i => i < selectedSite.thumbnails.length - 1 ? i + 1 : 0)}
                          className="px-2 py-1 text-[9px]"
                          style={{
                            backgroundColor: "#c0c0c0",
                            borderTop: "1px solid #fff",
                            borderLeft: "1px solid #fff",
                            borderBottom: "1px solid #808080",
                            borderRight: "1px solid #808080",
                            fontFamily: "var(--font-pixel)",
                            color: "#000",
                          }}
                          data-testid="button-next-image"
                        >
                          &gt;
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div 
                    className="text-center p-4"
                    style={{ fontFamily: "var(--font-pixel)", color: "#666" }}
                  >
                    <p className="text-[10px]">[ No images ]</p>
                  </div>
                )}
              </div>
              
              {/* Info bar */}
              <div 
                className="mt-2 p-3"
                style={{
                  backgroundColor: "#c0c0c0",
                  borderTop: "2px solid #fff",
                  borderLeft: "2px solid #fff",
                  borderBottom: "2px solid #808080",
                  borderRight: "2px solid #808080",
                  fontFamily: "var(--font-pixel)",
                  color: "#000",
                }}
              >
                <p className="text-[12px]"><strong>{selectedSite.name}</strong> ({selectedSite.year})</p>
                <p className="mt-1 text-[11px]" style={{ color: "#333" }}>{selectedSite.description}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {archivedSites.map((site) => (
                <button
                  key={site.id}
                  onClick={() => { setSelectedSite(site); setCurrentImageIndex(0); }}
                  className="flex flex-col items-center p-2 hover-elevate"
                  style={{
                    backgroundColor: "#c0c0c0",
                    borderTop: "2px solid #fff",
                    borderLeft: "2px solid #fff",
                    borderBottom: "2px solid #808080",
                    borderRight: "2px solid #808080",
                  }}
                  data-testid={`archive-site-${site.id}`}
                >
                  {/* Thumbnail preview */}
                  <div
                    className="w-full aspect-video mb-2 overflow-hidden"
                    style={{
                      backgroundColor: "#1a1a1a",
                      borderTop: "1px solid #808080",
                      borderLeft: "1px solid #808080",
                      borderBottom: "1px solid #fff",
                      borderRight: "1px solid #fff",
                    }}
                  >
                    {site.thumbnails[0] ? (
                      <img 
                        src={site.thumbnails[0]} 
                        alt={site.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
                          <rect x="4" y="2" width="24" height="28" fill="#fff"/>
                          <rect x="4" y="2" width="24" height="6" fill="#000080"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <span
                    className="text-[9px] text-center"
                    style={{ fontFamily: "var(--font-pixel)", color: "#000" }}
                  >
                    {site.name}
                  </span>
                  <span
                    className="text-[7px]"
                    style={{ fontFamily: "var(--font-pixel)", color: "#666" }}
                  >
                    {site.year} | {site.thumbnails.length} img
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div
          className="mt-2 px-2 py-1 text-[8px]"
          style={{
            backgroundColor: "#c0c0c0",
            borderTop: "1px solid #808080",
            fontFamily: "var(--font-pixel)",
            color: "#666",
          }}
        >
          {archivedSites.length} object(s) | Never published concepts
        </div>
      </div>
    </div>
  );
}
