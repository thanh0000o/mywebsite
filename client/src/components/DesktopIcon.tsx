import { motion } from "framer-motion";

interface DesktopIconProps {
  imageSrc: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export function DesktopIcon({ imageSrc, label, href, onClick }: DesktopIconProps) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer group flex flex-col items-center gap-2"
      onClick={onClick}
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
        <img 
          src={imageSrc} 
          alt={label}
          className="relative w-12 h-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] transition-all duration-300"
          style={{ imageRendering: 'pixelated' }}
          draggable={false}
        />
      </div>
      <p 
        className="text-[10px] text-white drop-shadow-md tracking-wide text-center transition-transform duration-300 group-hover:scale-105 max-w-[80px]"
        style={{ fontFamily: 'var(--font-pixel)' }}
      >
        {label}
      </p>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" data-testid={`link-icon-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {content}
      </a>
    );
  }

  return content;
}
