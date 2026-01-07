import { Link } from "wouter";
import { CrtOverlay } from "@/components/CrtOverlay";

export default function NotFound() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center font-mono">
      <CrtOverlay />
      
      <div className="relative z-10 text-center p-4">
        <h1 className="text-6xl md:text-8xl font-display text-destructive mb-4 glitch" data-text="404">
          404
        </h1>
        <p className="text-xl text-destructive/80 mb-8 uppercase tracking-widest">
          Signal Lost
        </p>

        <Link 
          href="/" 
          className="inline-block px-6 py-2 border border-destructive/50 text-destructive hover:bg-destructive/20 hover:border-destructive transition-all duration-300 uppercase text-sm tracking-wider"
        >
          Return to Source
        </Link>
      </div>
    </div>
  );
}
