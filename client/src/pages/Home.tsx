import { CrtOverlay } from "@/components/CrtOverlay";
import bgImage from "@assets/image_1767797601762.png";
import logoImage from "@assets/image_1767797842217.png";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-blue-600">
      {/* 
        =====================================================
        BACKGROUND IMAGE LAYER
        =====================================================
        Stretched and blurred for soft dreamy effect
        =====================================================
      */}
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
        draggable={false}
      />

      {/* 
        =====================================================
        CENTERED LOGO
        =====================================================
        Pixelated rendering, clickable with no action
        To swap: update the logoImage import above
        =====================================================
      */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="flex flex-col items-center">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="block cursor-pointer"
            data-testid="link-logo"
          >
            <img
              src={logoImage}
              alt="HTML Logo"
              className="w-24 h-24 drop-shadow-lg"
              style={{
                imageRendering: 'pixelated',
              }}
              draggable={false}
            />
          </a>
          <div className="mt-3 text-center" style={{ fontFamily: 'var(--font-pixel)' }}>
            <p className="text-sm text-white drop-shadow-md tracking-wide">portfolio_gerritthànhlambeets</p>
          </div>
        </div>
      </div>

      {/* CRT / SCANLINE OVERLAY */}
      <CrtOverlay />
    </div>
  );
}
