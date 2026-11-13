import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, CloudRain } from 'lucide-react';
import { ambientAudio } from '../utils/audioEngine';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    return () => {
      ambientAudio.stop();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      ambientAudio.stop();
      setIsPlaying(false);
    } else {
      ambientAudio.start();
      ambientAudio.setVolume(volume);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    ambientAudio.setVolume(newVol);
  };

  return (
    <div className="fixed top-5 right-5 z-40 flex items-center gap-2">
      {/* Expanded mini-controls */}
      {showControls && isPlaying && (
        <div className="flex items-center gap-3 bg-[#fffaf5]/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#e8d5cb]/70 shadow-sm transition-all animate-fade-in text-xs text-[#725a54]">
          <span className="flex items-center gap-1 font-serif-elegant italic text-[13px]">
            <CloudRain className="w-3.5 h-3.5 text-[#bfa399]" />
            Soft Rain & Piano
          </span>
          <input
            type="range"
            min="0.05"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-[#edd7cf] rounded-lg appearance-none cursor-pointer accent-[#a37970]"
            aria-label="Volume slider"
          />
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={togglePlay}
        onMouseEnter={() => setShowControls(true)}
        className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-[#fffaf5]/90 hover:bg-[#fff7f0] border border-[#ecd9d0] shadow-sm hover:shadow-md transition-all duration-300 text-[#684f48] focus:outline-none focus:ring-2 focus:ring-[#deb8ad]/50 cursor-pointer"
        aria-label={isPlaying ? "Mute peaceful music" : "Play soft background music"}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-1 text-[#9b6f65]">
              <Volume2 className="w-4 h-4 animate-pulse" />
              {/* Animated subtle equalizer bars */}
              <span className="flex items-end gap-0.5 h-3 ml-0.5">
                <span className="w-0.5 bg-[#b88c82] h-2.5 rounded-full animate-bounce [animation-delay:0ms]"></span>
                <span className="w-0.5 bg-[#b88c82] h-3.5 rounded-full animate-bounce [animation-delay:200ms]"></span>
                <span className="w-0.5 bg-[#b88c82] h-2 rounded-full animate-bounce [animation-delay:400ms]"></span>
              </span>
            </div>
            <span className="text-xs font-serif-elegant tracking-wide italic text-[#725852] hidden sm:inline">
              Soft melody playing
            </span>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5 text-[#a89088] group-hover:text-[#886960] transition-colors">
              <Music className="w-3.5 h-3.5" />
              <VolumeX className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-serif-elegant tracking-wide italic text-[#998179] group-hover:text-[#725852] transition-colors">
              Play quiet music
            </span>
          </>
        )}

        {/* Delicate pulse ring when off to subtly hint it's available without being loud */}
        {!isPlaying && (
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#deb8ad] opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#deb8ad]/60"></span>
          </span>
        )}
      </button>
    </div>
  );
}
