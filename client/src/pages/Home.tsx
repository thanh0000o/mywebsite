import { CrtOverlay } from "@/components/CrtOverlay";
import { DesktopIcon } from "@/components/DesktopIcon";
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
        DESKTOP ICONS
        =====================================================
        Retro styled icons with hover effects
        =====================================================
      */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="flex flex-col items-center">
          <DesktopIcon
            imageSrc={logoImage}
            label="portfolio_gerritthànhlambeets"
          />
        </div>
      </div>

      {/* CRT / SCANLINE OVERLAY */}
      <CrtOverlay />
    </div>
  );
}
