import { useState } from "react";

interface ArchivedSite {
  id: string;
  name: string;
  year: string;
  description: string;
  thumbnail: string;
}

const archivedSites: ArchivedSite[] = [
  {
    id: "site1",
    name: "Project Alpha",
    year: "2023",
    description: "An experimental web concept that was never launched.",
    thumbnail: "",
  },
  {
    id: "site2", 
    name: "Project Beta",
    year: "2022",
    description: "Another creative exploration that stayed in the vault.",
    thumbnail: "",
  },
];

export function WebsiteArchiveContent() {
  const [selectedSite, setSelectedSite] = useState<ArchivedSite | null>(null);

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
                onClick={() => setSelectedSite(null)}
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
                className="flex-1 flex items-center justify-center"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "2px solid #808080",
                }}
              >
                {selectedSite.thumbnail ? (
                  <img 
                    src={selectedSite.thumbnail} 
                    alt={selectedSite.name}
                    className="max-w-full max-h-full object-contain"
                    style={{ imageRendering: "pixelated" }}
                  />
                ) : (
                  <div 
                    className="text-center p-4"
                    style={{ fontFamily: "var(--font-pixel)", color: "#666" }}
                  >
                    <p className="text-[10px]">[ Image placeholder ]</p>
                    <p className="text-[8px] mt-1">Add your screenshot here</p>
                  </div>
                )}
              </div>
              
              {/* Info bar */}
              <div 
                className="mt-2 p-2 text-[9px]"
                style={{
                  backgroundColor: "#c0c0c0",
                  borderTop: "1px solid #fff",
                  borderLeft: "1px solid #fff",
                  borderBottom: "1px solid #808080",
                  borderRight: "1px solid #808080",
                  fontFamily: "var(--font-pixel)",
                  color: "#000",
                }}
              >
                <p><strong>{selectedSite.name}</strong> ({selectedSite.year})</p>
                <p className="mt-1 text-[8px]" style={{ color: "#666" }}>{selectedSite.description}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {archivedSites.map((site) => (
                <button
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className="flex flex-col items-center p-3 hover-elevate"
                  style={{
                    backgroundColor: "#c0c0c0",
                    borderTop: "1px solid #fff",
                    borderLeft: "1px solid #fff",
                    borderBottom: "1px solid #808080",
                    borderRight: "1px solid #808080",
                  }}
                  data-testid={`archive-site-${site.id}`}
                >
                  {/* File icon */}
                  <svg width="32" height="32" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
                    <rect x="4" y="2" width="24" height="28" fill="#fff"/>
                    <rect x="4" y="2" width="24" height="6" fill="#000080"/>
                    <rect x="6" y="10" width="20" height="2" fill="#ccc"/>
                    <rect x="6" y="14" width="16" height="2" fill="#ccc"/>
                    <rect x="6" y="18" width="18" height="2" fill="#ccc"/>
                    <rect x="6" y="22" width="12" height="2" fill="#ccc"/>
                  </svg>
                  <span
                    className="mt-2 text-[9px] text-center"
                    style={{ fontFamily: "var(--font-pixel)", color: "#000" }}
                  >
                    {site.name}
                  </span>
                  <span
                    className="text-[8px]"
                    style={{ fontFamily: "var(--font-pixel)", color: "#666" }}
                  >
                    {site.year}
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
