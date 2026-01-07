import { motion } from "framer-motion";

interface TerminalTextProps {
  text: string;
  delay?: number;
  className?: string;
  glitch?: boolean;
}

export function TerminalText({ text, delay = 0, className = "", glitch = false }: TerminalTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, delay }}
      className={`font-display uppercase tracking-widest ${className} ${glitch ? 'glitch' : ''}`}
      data-text={glitch ? text : undefined}
    >
      {text}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="ml-1 inline-block w-2 h-4 bg-primary align-middle"
      />
    </motion.div>
  );
}
