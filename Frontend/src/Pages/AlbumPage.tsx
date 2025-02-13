import { Clock, Loader, Music, Pause, Play, PlayCircle } from "lucide-react";
import { useMusicStore } from "../store/useMusicStore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlayerStore } from "../store/usePlayerStore";

const formateDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();

  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading)
    return (
      <Loader className="size-8 flex items-center justify-center text-emerald-500 animate-spin" />
    );

    const handlePlayAlbum = () => {
      if (!currentAlbum) return;

      const isCurrentAlbumPlaying = currentAlbum.songs.some(song => song._id === currentSong?._id);
  
      if (isCurrentAlbumPlaying) {
          togglePlay(); 
      } else {
          playAlbum(currentAlbum.songs, 0); 
      }
  };
  

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;

    playAlbum(currentAlbum?.songs, index);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center text-white overflow-y-auto custom-scrollbar">
      {/* Background Section */}
      <div className="relative w-full h-72 md:h-96 ">
        <div className="absolute inset-0 pointer-events-none" />
      </div>

      {/* Album Details */}
      <div className="z-10 w-full max-w-5xl px-6 py-8">
        <div className="flex p-6 gap-6 pb-8">
          <img
            src={currentAlbum?.imageUrl}
            alt={currentAlbum?.title}
            className="w-[240px] h-[240px] shadow-xl rounded-lg object-cover"
          />
          <div className="flex flex-col justify-end">
            <p className="text-sm font-medium">Album</p>
            <h2 className="text-7xl font-bold my-4">{currentAlbum?.title}</h2>
            <div className="flex items-center gap-2 text-sm text-zinc-100">
              <span className="font-medium text-white">
                {currentAlbum?.artist}
              </span>
              <span>• {currentAlbum?.songs?.length} songs</span>
              <span>• {currentAlbum?.releaseYear}</span>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <div className="flex px-5 pb-4 items-center gap-6">
          <button
            onClick={handlePlayAlbum}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all cursor-pointer"
          >
            {isPlaying && currentSong && currentAlbum?.songs.some((song)=> song._id === currentSong?._id) ? (<Pause  className="h-7  text-black flex w-full" />) : (<Play className="h-7  text-black flex w-full" />) }
          </button>
        </div>

        {/* Songs List */}
        <ul className="space-y-4">
          {currentAlbum?.songs?.map((song, index) => {
            const isCurrentSong = currentSong?._id === song._id;

            return (
              <li
                key={song._id}
                className="flex items-center p-4 bg-zinc-800 rounded-lg shadow-md gap-4 group cursor-pointer"
                onClick={() => handlePlaySong(index)}
              >
                {/* Song Image */}
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-16 h-16 object-cover rounded-lg shadow"
                />

                {/* Song Info */}
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-center">
                    <div className="w-6">
                      {isCurrentSong && isPlaying ? (
                        <Music className="size-4 text-green-500" />
                      ) : (
                        <span className="relative">
                          <p className="text-lg font-medium group-hover:opacity-0 transition-opacity">
                            {index + 1}.
                          </p>
                          <PlayCircle className="size-5 text-gray-400 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </span>
                      )}
                    </div>

                    <p className="text-lg font-medium">{song.title}</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-400" />{" "}
                      {formateDuration(song.duration)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AlbumPage;
