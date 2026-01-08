import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import winampLogo from "@assets/Screenshot_2026-01-07_144010_1767817428647.png";
import track1 from "@assets/08-voyager-possessions_instrumental_mix-z0ne_1767827346337.mp3";
import track2 from "@assets/02._source_direct_-_complexities_1767827373954.mp3";
import track3 from "@assets/02_The_Rise_1767827380707.mp3";
import track4 from "@assets/Science_Fiction_Jazz_Vol_3_-_04_-_Aquasky_-_Opaque_1767878405812.mp3";
import track5 from "@assets/01_-_Desire_(Original_Mix)_1767898941118.mp3";
import track6 from "@assets/01_-_Rantoul_-_System_Sylence_1767898949649.mp3";
import track7 from "@assets/01_Temptation_1767898981813.mp3";
import track8 from "@assets/01._source_direct_-_secret_liaisons_1767898984826.mp3";
import track9 from "@assets/01._JMJ_&_Flytronic-In_Too_Deep_1767898988644.mp3";
import track10 from "@assets/01._Blu_Mar_Ten_-_She_Moves_Through_1767899004603.mp3";
import track11 from "@assets/01_Richie_Jmj_Montana_Original_Mix_1767899016828.mp3";
import track12 from "@assets/02-alex_reece-feel_the_sunshine_(dj_pulse_remix)_1767899060349.mp3";
import track13 from "@assets/02-dj_trace-after_hours_1767899067003.mp3";
import track14 from "@assets/03_-_Hypersleep_(Voyager_Remix)_1767899069988.mp3";
import track15 from "@assets/03_For_All_Of_Us_1767899078658.mp3";
import track16 from "@assets/03_Language_1767899081781.mp3";
import track17 from "@assets/05_-_On_And_On_(Blu_Mar_Ten_Remix)_1767899093228.mp3";
import track18 from "@assets/05_Bringing_me_Down_1767899103543.mp3";
import track19 from "@assets/5_-_Big_Bud_-_Emotionography_1767899107008.mp3";
import track20 from "@assets/06_-_Alex_Reece_-_Candles_(Original_Mix)_1767899116454.mp3";
import track21 from "@assets/06_-_High_Times_1767899124955.mp3";
import track22 from "@assets/06_-_Jonny_L_-_Two_Of_Us_1767899127435.mp3";
import track23 from "@assets/06_-_Omni_Trio_-_Who_Are_You_(Aquasky_Remix)_1767899145263.mp3";
import track24 from "@assets/06_Seba_&_Lotek_-_So_Long_1767899152684.mp3";

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}

const playlistName = "Drums for the soul";

const playlist: Track[] = [
  { id: 1, title: "Possessions (Instrumental)", artist: "Voyager", src: track1 },
  { id: 2, title: "Complexities", artist: "Source Direct", src: track2 },
  { id: 3, title: "The Rise", artist: "Unknown", src: track3 },
  { id: 4, title: "Opaque", artist: "Aquasky", src: track4 },
  { id: 5, title: "Desire (Original Mix)", artist: "Unknown", src: track5 },
  { id: 6, title: "System Sylence", artist: "Rantoul", src: track6 },
  { id: 7, title: "Temptation", artist: "Unknown", src: track7 },
  { id: 8, title: "Secret Liaisons", artist: "Source Direct", src: track8 },
  { id: 9, title: "In Too Deep", artist: "JMJ & Flytronic", src: track9 },
  { id: 10, title: "She Moves Through", artist: "Blu Mar Ten", src: track10 },
  { id: 11, title: "Montana (Original Mix)", artist: "Richie JMJ", src: track11 },
  { id: 12, title: "Feel The Sunshine (DJ Pulse Remix)", artist: "Alex Reece", src: track12 },
  { id: 13, title: "After Hours", artist: "DJ Trace", src: track13 },
  { id: 14, title: "Hypersleep (Voyager Remix)", artist: "Unknown", src: track14 },
  { id: 15, title: "For All Of Us", artist: "Unknown", src: track15 },
  { id: 16, title: "Language", artist: "Unknown", src: track16 },
  { id: 17, title: "On And On (Blu Mar Ten Remix)", artist: "Unknown", src: track17 },
  { id: 18, title: "Bringing Me Down", artist: "Unknown", src: track18 },
  { id: 19, title: "Emotionography", artist: "Big Bud", src: track19 },
  { id: 20, title: "Candles (Original Mix)", artist: "Alex Reece", src: track20 },
  { id: 21, title: "High Times", artist: "Unknown", src: track21 },
  { id: 22, title: "Two Of Us", artist: "Jonny L", src: track22 },
  { id: 23, title: "Who Are You (Aquasky Remix)", artist: "Omni Trio", src: track23 },
  { id: 24, title: "So Long", artist: "Seba & Lotek", src: track24 },
];

export function MediaPlayer() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(3);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(5);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume > 0 ? previousVolume : 5);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  };

  useEffect(() => {
    if (audioRef.current && !isInitialized) {
      const randomTrackIndex = Math.floor(Math.random() * playlist.length);
      setCurrentTrack(randomTrackIndex);
      audioRef.current.src = playlist[randomTrackIndex].src;
      audioRef.current.volume = volume / 100;
      
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          const dur = audioRef.current.duration;
          if (dur && isFinite(dur) && dur > 0) {
            const randomTime = Math.random() * dur * 0.8;
            audioRef.current.currentTime = randomTime;
          }
        }
      };
      
      const handleCanPlayThrough = () => {
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            isPlayingRef.current = true;
          }).catch(() => {
            setIsPlaying(false);
            isPlayingRef.current = false;
          });
          audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        }
      };
      
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current.load();
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && isInitialized) {
      audioRef.current.src = playlist[currentTrack].src;
      audioRef.current.currentTime = 0;
      if (isPlayingRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack, isInitialized]);

  useEffect(() => {
    if (audioRef.current && isInitialized) {
      isPlayingRef.current = isPlaying;
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
          isPlayingRef.current = false;
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isInitialized]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration || 1;
      setCurrentTime(current);
      setProgress((current / dur) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev > 0 ? prev - 1 : playlist.length - 1));
    isPlayingRef.current = true;
    setIsPlaying(true);
  };
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev < playlist.length - 1 ? prev + 1 : 0));
    isPlayingRef.current = true;
    setIsPlaying(true);
  };
  const stopTrack = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 z-[100] cursor-pointer"
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
            className="flex items-center gap-1 px-2 py-0.5"
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
      className="fixed top-4 right-4 z-[100]"
    >
      <div
        className="flex flex-col relative"
        style={{
          backgroundColor: '#C0C0C0',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.5)',
          borderTop: '2px solid #fff',
          borderLeft: '2px solid #fff',
          borderBottom: '2px solid #808080',
          borderRight: '2px solid #808080',
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
        {/* Title Bar */}
        <div
          className="flex items-center justify-between px-1 py-0.5 relative z-10"
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
              className="w-4 h-4 flex items-center justify-center text-[10px]"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '1px solid #fff',
                borderLeft: '1px solid #fff',
                borderBottom: '1px solid #808080',
                borderRight: '1px solid #808080',
                color: '#000',
              }}
              data-testid="button-media-player-minimize"
            >
              _
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="w-4 h-4 flex items-center justify-center text-[10px]"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '1px solid #fff',
                borderLeft: '1px solid #fff',
                borderBottom: '1px solid #808080',
                borderRight: '1px solid #808080',
                color: '#000',
              }}
              data-testid="button-media-player-close"
            >
              X
            </button>
          </div>
        </div>

        {/* Main Content - Horizontal Layout */}
        <div className="flex items-stretch gap-1 p-1 relative z-10">
          {/* Left: Track Info & Visualizer */}
          <div
            className="flex flex-col p-1"
            style={{
              backgroundColor: '#fff',
              borderTop: '2px solid #808080',
              borderLeft: '2px solid #808080',
              borderBottom: '2px solid #fff',
              borderRight: '2px solid #fff',
              minWidth: '140px',
            }}
          >
            {/* Track Info */}
            <div className="flex justify-between items-center mb-1">
              <div>
                <div
                  className="text-[9px] text-[#000080] font-bold"
                  style={{ fontFamily: 'var(--font-pixel)' }}
                >
                  {playlist[currentTrack]?.title || "NO TRACK"}
                </div>
                <div
                  className="text-[7px]"
                  style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}
                >
                  {playlist[currentTrack]?.artist || ""}
                </div>
              </div>
              <div
                className="text-[8px] text-[#000080] font-bold"
                style={{ fontFamily: 'var(--font-pixel)' }}
              >
                {isPlaying ? "▶" : "■"}
              </div>
            </div>

            {/* Mini Visualizer */}
            <div className="flex items-end gap-[1px] h-4 mb-1">
              {Array.from({ length: 12 }).map((_, i) => {
                const height = isPlaying ? Math.random() * 100 : 10;
                return (
                  <div
                    key={i}
                    className="w-[8px] transition-all duration-75"
                    style={{
                      height: `${height}%`,
                      backgroundColor: height > 70 ? '#1084d0' : '#000080',
                    }}
                  />
                );
              })}
            </div>

            {/* Progress Bar - Clickable/Draggable */}
            <div
              className="h-2.5 relative cursor-pointer group"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '1px solid #808080',
                borderLeft: '1px solid #808080',
                borderBottom: '1px solid #fff',
                borderRight: '1px solid #fff',
              }}
              onClick={(e) => {
                if (audioRef.current && duration > 0) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = x / rect.width;
                  const newTime = percentage * duration;
                  audioRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                  setProgress(percentage * 100);
                }
              }}
              onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const handleMouseMove = (moveEvent: MouseEvent) => {
                  if (audioRef.current && duration > 0) {
                    const x = Math.max(0, Math.min(moveEvent.clientX - rect.left, rect.width));
                    const percentage = x / rect.width;
                    const newTime = percentage * duration;
                    audioRef.current.currentTime = newTime;
                    setCurrentTime(newTime);
                    setProgress(percentage * 100);
                  }
                };
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
              data-testid="progress-bar"
            >
              <div
                className="h-full bg-[#000080]"
                style={{ width: `${progress}%` }}
              />
              {/* Draggable handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-3"
                style={{
                  left: `calc(${progress}% - 4px)`,
                  backgroundColor: '#C0C0C0',
                  borderTop: '1px solid #fff',
                  borderLeft: '1px solid #fff',
                  borderBottom: '1px solid #808080',
                  borderRight: '1px solid #808080',
                }}
              />
            </div>

            {/* Time */}
            <div className="flex justify-between mt-0.5">
              <span
                className="text-[7px]"
                style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}
              >
                {formatTime(currentTime)}
              </span>
              <span
                className="text-[7px]"
                style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}
              >
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: Controls & Volume */}
          <div className="flex flex-col justify-between">
            {/* Controls */}
            <div className="flex items-center gap-0.5">
              {[
                { icon: '|◄', action: prevTrack, testId: 'button-prev-track' },
                { icon: isPlaying ? '||' : '►', action: togglePlay, testId: 'button-play-pause' },
                { icon: '■', action: stopTrack, testId: 'button-stop' },
                { icon: '►|', action: nextTrack, testId: 'button-next-track' },
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
            </div>

            {/* Volume */}
            <div className="flex items-center gap-1 mt-1">
              <button
                onClick={toggleMute}
                className="text-[7px] px-1"
                style={{
                  backgroundColor: '#C0C0C0',
                  borderTop: '1px solid #fff',
                  borderLeft: '1px solid #fff',
                  borderBottom: '1px solid #808080',
                  borderRight: '1px solid #808080',
                  fontFamily: 'var(--font-pixel)',
                  color: isMuted ? '#ff0000' : '#000',
                }}
                data-testid="button-mute"
              >
                {isMuted ? 'X' : 'VOL'}
              </button>
              <div
                className="w-12 h-2 relative cursor-pointer"
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
                  const newVol = Math.round((x / rect.width) * 100);
                  setVolume(newVol);
                  if (newVol > 0) setIsMuted(false);
                }}
              >
                <div
                  className="h-full bg-[#000080]"
                  style={{ width: isMuted ? '0%' : `${volume}%` }}
                />
              </div>
            </div>

            {/* Playlist Toggle */}
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="text-[7px] px-1 py-0.5 mt-1"
              style={{
                backgroundColor: '#C0C0C0',
                borderTop: '1px solid #fff',
                borderLeft: '1px solid #fff',
                borderBottom: '1px solid #808080',
                borderRight: '1px solid #808080',
                fontFamily: 'var(--font-pixel)',
                color: '#000',
              }}
              data-testid="button-toggle-playlist"
            >
              {showPlaylist ? '▲ HIDE' : '▼ PLAYLIST'}
            </button>
          </div>
        </div>

        {/* Playlist (collapsible) */}
        {showPlaylist && (
          <div className="mx-1 mb-1">
            <div
              className="px-1 py-0.5 text-[7px] font-bold"
              style={{
                backgroundColor: '#000080',
                color: '#fff',
                fontFamily: 'var(--font-pixel)',
              }}
            >
              {playlistName}
            </div>
            <div
              style={{
                backgroundColor: '#fff',
                borderTop: '2px solid #808080',
                borderLeft: '2px solid #808080',
                borderBottom: '2px solid #fff',
                borderRight: '2px solid #fff',
                maxHeight: '60px',
                overflowY: 'auto',
              }}
            >
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
                  className="text-[7px]"
                  style={{ fontFamily: 'var(--font-pixel)', color: 'inherit' }}
                >
                  {String(index + 1).padStart(2, '0')}. {track.artist} - {track.title}
                </span>
              </div>
            ))}
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div
          className="px-1 py-0.5"
          style={{
            backgroundColor: '#C0C0C0',
            borderTop: '1px solid #808080',
          }}
        >
          <span
            className="text-[7px]"
            style={{ fontFamily: 'var(--font-pixel)', color: '#000' }}
          >
            {playlist.length} tracks | {volume}%
          </span>
        </div>
      </div>

      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
    </motion.div>
  );
}
