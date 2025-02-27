import { useEffect } from "react";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useMusicStore } from "./../../store/useMusicStore";

const AlbumTable = () => {
  const { albums, deleteAlbum, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-700">
      <table className="w-full min-w-[700px] border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="bg-zinc-800 text-white text-left text-sm md:text-base">
            <th className="p-3 border-b border-zinc-700"></th>
            <th className="p-3 border-b border-zinc-700 min-w-[150px]">Title</th>
            <th className="p-3 border-b border-zinc-700 min-w-[120px]">Artist</th>
            <th className="p-3 border-b border-zinc-700 min-w-[100px]">Release Year</th>
            <th className="p-3 border-b border-zinc-700 min-w-[100px]">Songs</th>
            <th className="p-3 border-b border-zinc-700 text-right min-w-[80px]">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {albums.map((album) => (
            <tr key={album._id} className="hover:bg-zinc-800/50 transition-colors">
              {/* Album Image */}
              <td className="p-3 border-b border-zinc-700">
                <img
                  src={album.imageUrl}
                  alt={album.title}
                  className="w-10 h-10 md:w-12 md:h-12 rounded object-cover border border-zinc-600"
                />
              </td>

              {/* Album Title */}
              <td className="p-3 border-b border-zinc-700 text-white font-medium text-sm md:text-base">
                {album.title}
              </td>

              {/* Artist */}
              <td className="p-3 border-b border-zinc-700 text-white text-sm md:text-base">
                {album.artist}
              </td>

              {/* Release Year */}
              <td className="p-3 border-b border-zinc-700 text-zinc-400 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {album.releaseYear}
                </div>
              </td>

              {/* Number of Songs */}
              <td className="p-3 border-b border-zinc-700 text-zinc-400 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <Music className="h-4 w-4" />
                  {album.songs.length} songs
                </div>
              </td>

              {/* Actions (Delete Button) */}
              <td className="p-3 border-b border-zinc-700 text-right">
                <button
                  onClick={() => deleteAlbum(album._id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-md transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumTable;
