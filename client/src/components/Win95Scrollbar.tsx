import { useRef, useState, useEffect, useCallback, ReactNode } from "react";

interface Win95ScrollbarProps {
  children: ReactNode;
  className?: string;
}

export function Win95Scrollbar({ children, className = "" }: Win95ScrollbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [scrollTop, setScrollTop] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartScroll, setDragStartScroll] = useState(0);
  const [isHoldingUp, setIsHoldingUp] = useState(false);
  const [isHoldingDown, setIsHoldingDown] = useState(false);

  const scrollStep = 20;
  const buttonSize = 17;

  const maxScroll = Math.max(0, contentHeight - viewportHeight);
  const trackHeight = viewportHeight - buttonSize * 2;
  const thumbHeight = Math.max(20, (viewportHeight / contentHeight) * trackHeight) || 20;
  const thumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * (trackHeight - thumbHeight) : 0;
  const showScrollbar = contentHeight > viewportHeight;

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current && containerRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
        setViewportHeight(containerRef.current.clientHeight);
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (contentRef.current) resizeObserver.observe(contentRef.current);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [children]);

  const scrollTo = useCallback((newScrollTop: number) => {
    const clamped = Math.max(0, Math.min(newScrollTop, maxScroll));
    setScrollTop(clamped);
  }, [maxScroll]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    scrollTo(scrollTop + e.deltaY);
  }, [scrollTop, scrollTo]);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragStartScroll(scrollTop);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - dragStartY;
      const scrollRatio = deltaY / (trackHeight - thumbHeight);
      scrollTo(dragStartScroll + scrollRatio * maxScroll);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStartY, dragStartScroll, trackHeight, thumbHeight, maxScroll, scrollTo]);

  useEffect(() => {
    if (!isHoldingUp && !isHoldingDown) return;

    const interval = setInterval(() => {
      if (isHoldingUp) scrollTo(scrollTop - scrollStep);
      if (isHoldingDown) scrollTo(scrollTop + scrollStep);
    }, 50);

    return () => clearInterval(interval);
  }, [isHoldingUp, isHoldingDown, scrollTop, scrollTo]);

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current || e.target === thumbRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const clickRatio = clickY / trackHeight;
    scrollTo(clickRatio * maxScroll);
  };

  const buttonStyle: React.CSSProperties = {
    width: `${buttonSize}px`,
    height: `${buttonSize}px`,
    backgroundColor: "#c0c0c0",
    borderTop: "2px solid #ffffff",
    borderLeft: "2px solid #ffffff",
    borderBottom: "2px solid #808080",
    borderRight: "2px solid #808080",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  };

  const buttonActiveStyle: React.CSSProperties = {
    ...buttonStyle,
    borderTop: "2px solid #808080",
    borderLeft: "2px solid #808080",
    borderBottom: "2px solid #ffffff",
    borderRight: "2px solid #ffffff",
  };

  return (
    <div className={`flex h-full w-full ${className}`}>
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden relative"
        onWheel={handleWheel}
      >
        <div
          ref={contentRef}
          style={{
            transform: `translateY(-${scrollTop}px)`,
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>

      {showScrollbar && (
        <div
          className="flex flex-col"
          style={{
            width: `${buttonSize}px`,
            backgroundColor: "#c0c0c0",
            flexShrink: 0,
          }}
        >
          <div
            style={isHoldingUp ? buttonActiveStyle : buttonStyle}
            onMouseDown={() => {
              setIsHoldingUp(true);
              scrollTo(scrollTop - scrollStep);
            }}
            onMouseUp={() => setIsHoldingUp(false)}
            onMouseLeave={() => setIsHoldingUp(false)}
            data-testid="scrollbar-up"
          >
            <svg width="9" height="9" viewBox="0 0 9 9">
              <path d="M1 6 L4.5 2 L8 6 Z" fill="#000000" />
            </svg>
          </div>

          <div
            ref={trackRef}
            className="flex-1 relative"
            style={{
              backgroundColor: "#dfdfdf",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='2' height='2' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23808080'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23808080'/%3E%3C/svg%3E")`,
              backgroundSize: "2px 2px",
            }}
            onClick={handleTrackClick}
          >
            <div
              ref={thumbRef}
              style={{
                position: "absolute",
                top: `${thumbTop}px`,
                left: 0,
                right: 0,
                height: `${thumbHeight}px`,
                backgroundColor: "#c0c0c0",
                borderTop: "2px solid #ffffff",
                borderLeft: "2px solid #ffffff",
                borderBottom: "2px solid #808080",
                borderRight: "2px solid #808080",
                cursor: "pointer",
              }}
              onMouseDown={handleThumbMouseDown}
              data-testid="scrollbar-thumb"
            />
          </div>

          <div
            style={isHoldingDown ? buttonActiveStyle : buttonStyle}
            onMouseDown={() => {
              setIsHoldingDown(true);
              scrollTo(scrollTop + scrollStep);
            }}
            onMouseUp={() => setIsHoldingDown(false)}
            onMouseLeave={() => setIsHoldingDown(false)}
            data-testid="scrollbar-down"
          >
            <svg width="9" height="9" viewBox="0 0 9 9">
              <path d="M1 2 L4.5 6 L8 2 Z" fill="#000000" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
