import { CrtOverlay } from "@/components/CrtOverlay";
import bgImage from "@assets/thanh1000_layer_data_and_nature_and_invert_it_and_use_vietname_1767797246973.png";

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
        
        Pixel sharpness is controlled by image-rendering below.
        - 'pixelated' forces crisp pixel edges (no smoothing)
        - 'crisp-edges' is the CSS standard fallback
        =====================================================
      */}
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          imageRendering: 'pixelated',
        }}
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
