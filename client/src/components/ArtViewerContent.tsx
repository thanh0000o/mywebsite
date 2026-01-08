import { useState, useRef, useEffect } from "react";

interface ArtViewerContentProps {
  type: "image" | "video";
  src: string;
  title: string;
}

export function ArtViewerContent({ type, src, title }: ArtViewerContentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const seekTime = (x / rect.width) * duration;
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col"
      style={{ backgroundColor: '#c0c0c0' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23999' /%3E%3Crect x='2' y='1' width='1' height='1' fill='%23bbb' /%3E%3Crect x='1' y='2' width='1' height='1' fill='%23888' /%3E%3Crect x='3' y='3' width='1' height='1' fill='%23aaa' /%3E%3C/svg%3E")`,
          backgroundSize: "4px 4px",
          imageRendering: "pixelated" as const,
          opacity: 0.4,
          zIndex: 0,
        }}
      />
      <div className="window-scanlines" aria-hidden="true" />

      <div 
        className="flex-1 p-2 relative z-10"
        style={{ backgroundColor: '#c0c0c0' }}
      >
        <div 
          className="w-full h-full flex flex-col"
          style={{
            borderTop: '2px solid #808080',
            borderLeft: '2px solid #808080',
            borderBottom: '2px solid #fff',
            borderRight: '2px solid #fff',
            backgroundColor: '#000',
          }}
        >
          {type === "image" ? (
            <img
              src={src}
              alt={title}
              className="w-full h-full object-contain"
              draggable={false}
            />
          ) : (
            <div className="flex flex-col h-full">
              <video
                ref={videoRef}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="flex-1 object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
              <div 
                className="p-1"
                style={{
                  backgroundColor: '#C0C0C0',
                  borderTop: '2px solid #fff',
                  borderLeft: '2px solid #fff',
                  borderBottom: '2px solid #808080',
                  borderRight: '2px solid #808080',
                }}
              >
                <div 
                  className="w-full h-3 mb-1 cursor-pointer"
                  style={{
                    backgroundColor: '#fff',
                    borderTop: '1px solid #808080',
                    borderLeft: '1px solid #808080',
                    borderBottom: '1px solid #fff',
                    borderRight: '1px solid #fff',
                  }}
                  onClick={handleSeek}
                  data-testid="art-video-progress-bar"
                >
                  <div 
                    className="h-full"
                    style={{ 
                      width: duration ? `${(currentTime / duration) * 100}%` : '0%',
                      backgroundColor: '#000080',
                    }}
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[
                      { icon: '|<', action: restart, testId: 'art-btn-restart' },
                      { icon: isPlaying ? '||' : '>', action: togglePlay, testId: 'art-btn-play-pause' },
                    ].map((btn, i) => (
                      <button
                        key={i}
                        onClick={btn.action}
                        className="w-6 h-5 flex items-center justify-center text-[9px]"
                        style={{
                          backgroundColor: '#C0C0C0',
                          borderTop: '2px solid #fff',
                          borderLeft: '2px solid #fff',
                          borderBottom: '2px solid #808080',
                          borderRight: '2px solid #808080',
                          fontFamily: 'var(--font-pixel)',
                          color: '#000',
                        }}
                        data-testid={btn.testId}
                      >
                        {btn.icon}
                      </button>
                    ))}
                    <span 
                      className="text-[9px] ml-1"
                      style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}
                    >
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="text-[8px]"
                      style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}
                    >
                      VOL
                    </span>
                    <div
                      className="w-12 h-2 cursor-pointer"
                      style={{
                        backgroundColor: '#fff',
                        borderTop: '1px solid #808080',
                        borderLeft: '1px solid #808080',
                        borderBottom: '1px solid #fff',
                        borderRight: '1px solid #fff',
                      }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        setVolume(Math.round((x / rect.width) * 100));
                      }}
                      data-testid="art-video-volume-bar"
                    >
                      <div
                        className="h-full"
                        style={{ width: `${volume}%`, backgroundColor: '#000080' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div 
        className="flex items-center justify-between px-2 py-0.5 text-[9px] relative z-10"
        style={{
          backgroundColor: '#C0C0C0',
          borderTop: '1px solid #808080',
          fontFamily: 'var(--font-pixel)',
          color: '#000',
        }}
      >
        <span>{type === "image" ? "Image Viewer" : "Media Player"}</span>
        <span>{title} - Ready</span>
      </div>
    </div>
  );
}
