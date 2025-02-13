import { Laptop2, ListMusic, Mic2, Pause, Play, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { usePlayerStore } from "../store/usePlayerStore";
import React, { useEffect, useRef, useState } from "react";

const PlayBackControl = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();
  
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      playNext(); // Auto-play next song when current song ends
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  // Seek function
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
      setCurrentTime(Number(event.target.value));
    }
  };

  // Format time helper
  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4 fixed bottom-0 left-0 right-0">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* Currently Playing Song */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>
                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-3 w-full max-w-md">
          {/* Control Buttons */}
          <div className="flex items-center gap-6">
            <button
              className="text-gray-400 hover:text-white transition disabled:opacity-50"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack  className="w-6 h-6 cursor-pointer" />
            </button>

            <button
              className="bg-white text-black rounded-full p-3 flex items-center justify-center shadow-lg hover:bg-gray-300 transition"
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? <Pause className="w-6 h-6 cursor-pointer" /> : <Play className="w-6 h-6 cursor-pointer" />}
            </button>

            <button
              className="text-gray-400 hover:text-white transition disabled:opacity-50"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className="w-6 h-6 cursor-pointer" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 w-full px-2">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full cursor-pointer appearance-none bg-gray-600 h-1 rounded-lg"
            />
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Extra Controls */}
        <PlayerExtras volume={volume} setVolume={setVolume} audioRef={audioRef} />
      </div>
    </footer>
  );
};

export default PlayBackControl;

export const PlayerExtras = ({ volume, setVolume, audioRef }) => {
  return (
    <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
      {/* Icons: Microphone, Playlist, Device */}
      <button className="text-gray-400 hover:text-white transition">
        <Mic2 className="h-5 w-5" />
      </button>
      <button className="text-gray-400 hover:text-white transition">
        <ListMusic className="h-5 w-5" />
      </button>
      <button className="text-gray-400 hover:text-white transition">
        <Laptop2 className="h-5 w-5" />
      </button>

      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <button className="text-gray-400 hover:text-white transition">
          <Volume1 className="h-5 w-5" />
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => {
            setVolume(Number(e.target.value));
            if (audioRef.current) {
              audioRef.current.volume = Number(e.target.value) / 100;
            }
          }}
          className="w-24 cursor-pointer appearance-none bg-gray-600 h-1 rounded-lg"
        />
      </div>
    </div>
  );
};
