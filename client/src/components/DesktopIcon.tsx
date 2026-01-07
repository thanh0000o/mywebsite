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
      className="cursor-pointer group flex flex-col items-center gap-1"
      onClick={onClick}
    >
      <div className="
        relative overflow-hidden
        border-2 border-blue-400/80
        shadow-[0_0_10px_rgba(100,150,255,0.4)]
        group-hover:shadow-[0_0_20px_rgba(100,150,255,0.7),0_0_30px_rgba(255,255,255,0.3)]
        group-hover:border-blue-300
        transition-all duration-300
        w-20 h-20
        bg-black/20
      ">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <img 
          src={imageSrc} 
          alt={label}
          className="w-full h-full object-cover"
          style={{ imageRendering: 'pixelated' }}
          draggable={false}
        />
      </div>
      <div 
        className="text-center mt-1 transition-transform duration-300 group-hover:scale-105"
        style={{ fontFamily: 'var(--font-pixel)' }}
      >
        <p className="text-[10px] text-blue-200 drop-shadow-md">[particle]</p>
        <p className="text-xs text-white drop-shadow-md">{label}</p>
      </div>
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
