import React from "react";
import { useMusicStore } from "../store/useMusicStore";
import FeaturedSkeleton from "./skeleton/FeaturedSkeleton";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
  const { isLoading, feturedSongs, error } = useMusicStore();

  if (isLoading) return <FeaturedSkeleton />;

  if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {feturedSongs.map((songs) => (
        <>
          <div key={songs._id} className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative">
            <img
              src={songs.imageUrl}
              alt={songs.title}
              className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
            />
            <div className="flex-1 p-4">
              <p className="font-medium truncate">{songs.title}</p>
              <p className="text-sm text-zinc-400 truncate">{songs.artist}</p>
            </div>
          <PlayButton songs={songs}/>
          </div>
        </>
      ))}
    </div>
  );
};

export default FeaturedSection;
