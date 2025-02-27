import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
  return (
    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg shadow-md p-4 md:p-6 flex flex-col min-h-[400px] md:h-[500px] max-h-[500px] md:max-h-[600px]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-3 md:space-y-0">
        <div>
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <Music className="size-5 text-emerald-500" />
            Songs Library
          </h2>
          <p className="text-xs md:text-sm text-zinc-400">Manage your music tracks</p>
        </div>
        <AddSongDialog />
      </div>

      {/* Table Container with Scroll */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <SongsTable />
      </div>
    </div>
  );
};

export default SongsTabContent;
