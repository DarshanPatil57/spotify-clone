import React, { useEffect } from "react";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "./skeleton/PlaylistSkeleton";
import { useMusicStore } from "../store/useMusicStore";

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);


  return (
    <div className="flex flex-col h-screen">
      {/* Navigation */}
      <div className="flex-none p-4 bg-zinc-900 rounded-t-lg">
        <nav className="flex flex-col space-y-2">
          <Link
            to="/"
            className="flex items-center p-2 text-white hover:bg-zinc-800 rounded-md"
          >
            <HomeIcon className="size-5 mr-2" />
            <span className="md:inline">Home</span>
          </Link>

          <SignedIn>
            <Link
              to="/chat"
              className="flex items-center p-2 text-white hover:bg-zinc-800 rounded-md"
            >
              <MessageCircleIcon className="size-5 mr-2" />
              <span className="md:inline">Message</span>
            </Link>
          </SignedIn>
        </nav>
      </div>
      <div className="w-full border border-zinc-700/10"></div>

      {/* Library */}
      <div className="flex-1 overflow-y-auto bg-zinc-900 p-2 rounded-b-lg">
        <div className="rounded-lg p-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-white px-2">
              <Library className="size-5 mr-2" />
              <span className="hidden md:inline">Playlist</span>
            </div>
          </div>
          <div className="overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-2">
              {isLoading ? <PlaylistSkeleton /> : 
              <div>
                {
                  albums.map((album)=>(
                    <Link to={`/albums/${album._id}`} key={album._id} className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer">
                      <img src={album.imageUrl} alt="playlist image" className="size-12 rounded-md flex shrink-0 object-cover" />
                      <div className="flex-1 min-w-0 hidden md:block">
                        <p className="font-medium truncate">
                          {album.title}
                        </p>
                        <p className="text-sm text-zinc-400 truncate">
                          Album • {album.artist}
                        </p>
                      </div>
                    </Link>
                  ))
                }
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
