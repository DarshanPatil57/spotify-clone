import React from "react";
import AddAlbumDialog from "../Pages/Admin/AddAlbumDialog";
import AlbumTable from "../Pages/Admin/AlbumTable";
import { Library } from "lucide-react";

const AlbumTabContent = () => {
  return (
    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 md:p-6 shadow-md flex flex-col min-h-[400px] md:h-[500px] max-h-[500px] md:max-h-[600px]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-zinc-700 pb-4 mb-4 space-y-3 md:space-y-0">
        <div>
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-white">
            <Library className="h-5 w-5 text-violet-500" />
            Albums Library
          </h2>
          <p className="text-xs md:text-sm text-zinc-400">Manage your album collection</p>
        </div>
        <AddAlbumDialog />
      </div>

      {/* Table Container with Scroll */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <AlbumTable />
      </div>
    </div>
  );
};

export default AlbumTabContent;
