import { CrtOverlay } from "@/components/CrtOverlay";
import bgImage from "@assets/image_1767797601762.png";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 
        =====================================================
        BACKGROUND IMAGE LAYER
        =====================================================
        To swap the background image:
        1. Add your image to attached_assets/ folder
        2. Update the import above to point to your new image
        
        Current settings:
        - Stretched to fill entire viewport (object-cover)
        - Blur filter applied for soft effect
        =====================================================
      */}
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover blur-sm"
        draggable={false}
      />

      {/* 
        =====================================================
        CRT / SCANLINE OVERLAY
        =====================================================
        Pure CSS effect layered on top.
        Edit CrtOverlay.tsx to adjust scanline intensity.
        =====================================================
      */}
      <CrtOverlay />
    </div>
  );
}
