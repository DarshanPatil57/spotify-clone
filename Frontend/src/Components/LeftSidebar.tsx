import React from "react";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "./skeleton/PlaylistSkeleton";

const LeftSidebar = () => {
  const isLoading = false;
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
              {isLoading ? <PlaylistSkeleton /> : <div>""Helo</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
