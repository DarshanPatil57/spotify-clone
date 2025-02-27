import { useMusicStore } from "../../store/useMusicStore";
import { Trash2 } from "lucide-react";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse border border-zinc-700/50">
        <thead>
          <tr className="bg-zinc-800/50 text-left text-sm md:text-base">
            <th className="w-[50px] p-3"></th>
            <th className="p-3">Title</th>
            <th className="p-3">Artist</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(songs) && songs.length > 0 ? (
            songs.map((song) => (
              <tr key={song._id} className="border-t border-zinc-700 hover:bg-zinc-800/50">
                <td className="p-3">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-8 h-8 md:w-10 md:h-10 rounded object-cover"
                  />
                </td>
                <td className="p-3 text-sm md:text-base font-medium">{song.title}</td>
                <td className="p-3 text-sm md:text-base">{song.artist}</td>
                <td className="p-3 text-right">
                  <button
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-md transition"
                    onClick={() => deleteSong(song._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-400">
                No songs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SongsTable;
