import SongTabContent from "./SongTabContent";
import { useAuthStore } from "../../store/useAuthStore";
import React, { useEffect, useState } from "react";
import AlbumTabContent from "../../Components/AlbumTabContent";
import { useMusicStore } from "../../store/useMusicStore";

import Header from "./HeaderComponent";
import DashBoardStatsComponent from "./DashBoardStatsComponent";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("songs");

  const { isAdmin, isLoading } = useAuthStore();
  const { fetchSongs, fetchAlbums, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchStats();
    fetchSongs();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && isLoading) return <div>Unauthorized</div>;

  return (
    <div className="min-h-screen h-screen overflow-auto bg-gradient-to-b from-zinc-900 via-zinc-800 to-black text-zinc-100 p-8">
      <Header />
      <DashBoardStatsComponent />

      <div className="space-y-6">
        {/* Tab Switcher */}
        <div className="flex p-1 bg-zinc-800/50 rounded-md">
          <button
            className={`px-4 py-2 rounded-md cursor-pointer ${
              activeTab === "songs" ? "bg-zinc-700" : ""
            }`}
            onClick={() => setActiveTab("songs")}
          >
            🎵 Songs
          </button>
          <button
            className={`px-4 py-2 rounded-md cursor-pointer ${
              activeTab === "albums" ? "bg-zinc-700" : ""
            }`}
            onClick={() => setActiveTab("albums")}
          >
            📀 Albums
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 bg-zinc-900 rounded-md min-h-[400px] max-h-[calc(100vh-200px)] overflow-auto">
          {activeTab === "songs" && <SongTabContent />}
          {activeTab === "albums" && <AlbumTabContent />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

