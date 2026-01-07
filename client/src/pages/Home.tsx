import { CrtOverlay } from "@/components/CrtOverlay";
import bgImage from "@assets/image_1767797601762.png";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-blue-600">
      {/* 
        =====================================================
        BACKGROUND IMAGE LAYER
        =====================================================
        To swap the background image:
        1. Add your image to attached_assets/ folder
        2. Update the import above to point to your new image
        
        Current settings:
        - Stretched to fill entire viewport
        - Heavy blur filter for soft dreamy effect
        - Adjust blur-xl to blur-md, blur-lg, blur-2xl, blur-3xl as needed
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
        CRT / SCANLINE OVERLAY (optional - can be removed)
        =====================================================
      */}
      <CrtOverlay />
    </div>
  );
}
