import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface DesktopWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  width?: string;
  height?: string;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
}

export function DesktopWindow({
  id,
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  width = "500px",
  height = "400px",
  zIndex,
  onFocus,
  onClose,
}: DesktopWindowProps) {
  // Constrain initial position to viewport
  const constrainToViewport = (pos: { x: number; y: number }) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: Math.min(Math.max(10, pos.x), Math.max(10, vw - 100)),
      y: Math.min(Math.max(10, pos.y), Math.max(10, vh - 100)),
    };
  };
  
  const [position, setPosition] = useState(() => constrainToViewport(initialPosition));
  
  // Constrain position on window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => constrainToViewport(prev));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragRef.current) {
        const deltaX = e.clientX - dragRef.current.startX;
        const deltaY = e.clientY - dragRef.current.startY;
        setPosition({
          x: dragRef.current.startPosX + deltaX,
          y: dragRef.current.startPosY + deltaY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        width,
        height,
        zIndex,
      }}
      onClick={onFocus}
      data-testid={`window-${id}`}
    >
      <div
        className="flex flex-col h-full relative"
        style={{
          backgroundColor: "#C0C0C0",
          boxShadow: "5px 5px 20px rgba(0,0,0,0.5)",
          borderTop: "2px solid #fff",
          borderLeft: "2px solid #fff",
          borderBottom: "2px solid #808080",
          borderRight: "2px solid #808080",
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
            zIndex: 0,
          }}
        />
        {/* Moving scanlines overlay */}
        <div className="window-scanlines" aria-hidden="true" />
        {/* Title Bar - Draggable */}
        <div
          className="flex items-center justify-between px-1 py-0.5 cursor-move select-none relative z-10"
          style={{
            background: "linear-gradient(90deg, #000080, #1084d0)",
            color: "white",
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 flex items-center justify-center"
              style={{
                backgroundColor: "#C0C0C0",
                borderTop: "1px solid #fff",
                borderLeft: "1px solid #fff",
                borderBottom: "1px solid #808080",
                borderRight: "1px solid #808080",
              }}
            >
              <span className="text-[8px]" style={{ color: "#000" }}>
                W
              </span>
            </div>
            <span
              className="text-sm font-bold"
              style={{
                fontFamily: "var(--font-pixel)",
                textShadow: "1px 1px 0 #000",
              }}
            >
              {title}
            </span>
          </div>
          <div className="flex gap-0.5">
            <button
              className="w-5 h-5 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: "#C0C0C0",
                borderTop: "2px solid #fff",
                borderLeft: "2px solid #fff",
                borderBottom: "2px solid #808080",
                borderRight: "2px solid #808080",
                color: "#000",
              }}
              onMouseDown={(e) => e.stopPropagation()}
              data-testid={`button-${id}-minimize`}
            >
              _
            </button>
            <button
              className="w-5 h-5 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: "#C0C0C0",
                borderTop: "2px solid #fff",
                borderLeft: "2px solid #fff",
                borderBottom: "2px solid #808080",
                borderRight: "2px solid #808080",
                color: "#000",
              }}
              onMouseDown={(e) => e.stopPropagation()}
              data-testid={`button-${id}-maximize`}
            >
              □
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-5 h-5 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: "#C0C0C0",
                borderTop: "2px solid #fff",
                borderLeft: "2px solid #fff",
                borderBottom: "2px solid #808080",
                borderRight: "2px solid #808080",
                color: "#000",
              }}
              onMouseDown={(e) => e.stopPropagation()}
              data-testid={`button-${id}-close`}
            >
              X
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-hidden relative z-10">{children}</div>

        {/* Status Bar */}
        <div
          className="flex items-center justify-between px-2 py-0.5 text-[10px] relative z-10"
          style={{
            backgroundColor: "#C0C0C0",
            borderTop: "1px solid #808080",
            fontFamily: "var(--font-pixel)",
            color: "#000",
          }}
        >
          <span>&lt;body&gt;</span>
          <span>Ready</span>
        </div>
      </div>
    </motion.div>
  );
}
