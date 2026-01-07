import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import winampLogo from "@assets/Screenshot_2026-01-07_144010_1767817428647.png";

interface Track {
  id: number;
  title: string;
  artist: string;
  src?: string;
}

const mockPlaylist: Track[] = [
  { id: 1, title: "TRACK_01", artist: "UNKNOWN" },
  { id: 2, title: "TRACK_02", artist: "UNKNOWN" },
  { id: 3, title: "TRACK_03", artist: "UNKNOWN" },
];

export function MediaPlayer() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [playlist] = useState<Track[]>(mockPlaylist);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 300);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const prevTrack = () => setCurrentTrack((prev) => (prev > 0 ? prev - 1 : playlist.length - 1));
  const nextTrack = () => setCurrentTrack((prev) => (prev < playlist.length - 1 ? prev + 1 : 0));
  const stopTrack = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 z-40 cursor-pointer"
        onClick={() => setIsMinimized(false)}
        data-testid="button-media-player-restore"
      >
        <div
          className="flex flex-col"
          style={{
            backgroundColor: '#C0C0C0',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderBottom: '2px solid #808080',
            borderRight: '2px solid #808080',
          }}
        >
          <div
            className="flex items-center gap-1 px-1 py-0.5"
            style={{
              background: 'linear-gradient(90deg, #000080, #1084d0)',
            }}
          >
            <img 
              src={winampLogo} 
              alt="Media Player" 
              className="w-4 h-4"
              style={{ imageRendering: 'pixelated' }}
            />
            <span
              className="text-[8px] text-white font-bold"
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              MEDIA
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 right-4 z-40"
      style={{ width: '280px' }}
    >
      <div
        className="flex flex-col"
        style={{
          backgroundColor: '#C0C0C0',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.5)',
          borderTop: '2px solid #fff',
          borderLeft: '2px solid #fff',
          borderBottom: '2px solid #808080',
          borderRight: '2px solid #808080',
        }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center justify-between px-1 py-0.5"
          style={{
            background: 'linear-gradient(90deg, #000080, #1084d0)',
            color: 'white',
          }}
        >
          <div className="flex items-center gap-1">
            <img 
              src={winampLogo} 
              alt="Media Player" 
              className="w-4 h-4"
              style={{ imageRendering: 'pixelated' }}
            />
            <span
              className="text-[10px] text-white font-bold"
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              MEDIA_PLAYER.EXE
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="w-4 h-4 flex items-center justify-center text-[10px] text-black"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '1px solid #fff',
                borderLeft: '1px solid #fff',
                borderBottom: '1px solid #808080',
                borderRight: '1px solid #808080',
              }}
              data-testid="button-media-player-minimize"
            >
              _
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="w-4 h-4 flex items-center justify-center text-[10px] text-black"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '1px solid #fff',
                borderLeft: '1px solid #fff',
                borderBottom: '1px solid #808080',
                borderRight: '1px solid #808080',
              }}
              data-testid="button-media-player-close"
            >
              X
            </button>
          </div>
        </div>

        {/* Display Panel */}
        <div
          className="mx-1 mt-1 p-2"
          style={{
            backgroundColor: '#fff',
            borderTop: '2px solid #808080',
            borderLeft: '2px solid #808080',
            borderBottom: '2px solid #fff',
            borderRight: '2px solid #fff',
          }}
        >
          {/* Track Info */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <div
                className="text-[10px] text-[#000080] tracking-wider font-bold"
                style={{ fontFamily: 'var(--font-pixel)' }}
              >
                {playlist[currentTrack]?.title || "NO TRACK"}
              </div>
              <div
                className="text-[8px] text-black"
                style={{ fontFamily: 'var(--font-pixel)' }}
              >
                {playlist[currentTrack]?.artist || ""}
              </div>
            </div>
            <div
              className="text-[10px] text-[#000080] font-bold"
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              {isPlaying ? "PLAYING" : "STOPPED"}
            </div>
          </div>

          {/* Visualizer bars */}
          <div className="flex items-end gap-[2px] h-6 mb-2">
            {Array.from({ length: 20 }).map((_, i) => {
              const height = isPlaying 
                ? Math.random() * 100 
                : 10;
              return (
                <div
                  key={i}
                  className="w-[10px] transition-all duration-75"
                  style={{
                    height: `${height}%`,
                    backgroundColor: height > 70 ? '#1084d0' : '#000080',
                  }}
                />
              );
            })}
          </div>

          {/* Progress Bar */}
          <div
            className="h-2 relative"
            style={{
              backgroundColor: '#C0C0C0',
              borderTop: '1px solid #808080',
              borderLeft: '1px solid #808080',
              borderBottom: '1px solid #fff',
              borderRight: '1px solid #fff',
            }}
          >
            <div
              className="h-full bg-[#000080]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Time Display */}
          <div className="flex justify-between mt-1">
            <span
              className="text-[8px] text-black"
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              00:{String(Math.floor(progress * 0.6)).padStart(2, '0')}
            </span>
            <span
              className="text-[8px] text-black"
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              01:00
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-1 p-2">
          {[
            { icon: '|◄', action: prevTrack, testId: 'button-prev-track' },
            { icon: isPlaying ? '||' : '►', action: togglePlay, testId: 'button-play-pause' },
            { icon: '■', action: stopTrack, testId: 'button-stop' },
            { icon: '►|', action: nextTrack, testId: 'button-next-track' },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className="w-8 h-6 flex items-center justify-center text-[10px] text-black"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderBottom: '2px solid #808080',
                borderRight: '2px solid #808080',
                fontFamily: 'var(--font-pixel)',
              }}
              data-testid={btn.testId}
            >
              {btn.icon}
            </button>
          ))}
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-2 px-2 pb-1">
          <span
            className="text-[8px] text-black"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            VOL
          </span>
          <div
            className="flex-1 h-3 relative cursor-pointer"
            style={{
              backgroundColor: '#fff',
              borderTop: '2px solid #808080',
              borderLeft: '2px solid #808080',
              borderBottom: '2px solid #fff',
              borderRight: '2px solid #fff',
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              setVolume(Math.round((x / rect.width) * 100));
            }}
          >
            <div
              className="h-full bg-[#000080]"
              style={{ width: `${volume}%` }}
            />
            <div
              className="absolute top-0 h-full w-2"
              style={{
                left: `calc(${volume}% - 4px)`,
                backgroundColor: '#C0C0C0',
                borderTop: '1px solid #fff',
                borderLeft: '1px solid #fff',
                borderBottom: '1px solid #808080',
                borderRight: '1px solid #808080',
              }}
            />
          </div>
          <span
            className="text-[8px] text-black w-6 text-right"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            {volume}%
          </span>
        </div>

        {/* Playlist */}
        <div
          className="mx-1 mb-1"
          style={{
            backgroundColor: '#fff',
            borderTop: '2px solid #808080',
            borderLeft: '2px solid #808080',
            borderBottom: '2px solid #fff',
            borderRight: '2px solid #fff',
            maxHeight: '80px',
            overflowY: 'auto',
          }}
        >
          <div
            className="text-[8px] text-black px-1 py-0.5 border-b border-gray-300"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            PLAYLIST [{playlist.length} TRACKS]
          </div>
          {playlist.map((track, index) => (
            <div
              key={track.id}
              onClick={() => setCurrentTrack(index)}
              className="flex items-center gap-1 px-1 py-0.5 cursor-pointer"
              style={{
                backgroundColor: currentTrack === index ? '#000080' : 'transparent',
                color: currentTrack === index ? '#fff' : '#000',
              }}
              data-testid={`playlist-item-${track.id}`}
            >
              <span
                className="text-[8px]"
                style={{ fontFamily: 'var(--font-pixel)' }}
              >
                {String(index + 1).padStart(2, '0')}.
              </span>
              <span
                className="text-[8px]"
                style={{ fontFamily: 'var(--font-pixel)' }}
              >
                {track.artist} - {track.title}
              </span>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div
          className="px-1 py-0.5"
          style={{
            backgroundColor: '#C0C0C0',
            borderTop: '1px solid #808080',
          }}
        >
          <span
            className="text-[8px] text-black"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            READY - {playlist.length} files in playlist
          </span>
        </div>
      </div>

      <audio ref={audioRef} />
    </motion.div>
  );
}
