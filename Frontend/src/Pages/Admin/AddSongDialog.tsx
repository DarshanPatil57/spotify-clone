import { useState, useRef } from "react";
import { useMusicStore } from "./../../store/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { axiosInstance } from "./../../lib/axios";
import toast from "react-hot-toast";

const AddSongDialog = () => {
  const { albums } = useMusicStore();
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "",
  });

  const [files, setFiles] = useState({ audio: null, image: null });

  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!files.audio || !files.image) {
        return toast.error("Please upload both audio and image files");
      }

      const formData = new FormData();
      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration);
      if (newSong.album && newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }
      formData.append("audioFile", files.audio);
      formData.append("imageFile", files.image);

      await axiosInstance.post("/admin/songs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewSong({ title: "", artist: "", album: "", duration: "0" });
      setFiles({ audio: null, image: null });
      toast.success("Song added successfully");
      setSongDialogOpen(false);
    } catch (error) {
      toast.error("Failed to add song: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setSongDialogOpen(true)}
        className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
      >
        <Plus className="size-3" />
        Add Song
      </button>

      {songDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-lg font-semibold">Add New Song</h2>
            <p className="text-sm text-zinc-400 mb-4">Add a new song to your music library</p>

            <div className="space-y-4">
              <input
                type="file"
                accept="audio/*"
                ref={audioInputRef}
                hidden
                onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0]}))}
              />
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                hidden
                onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0]}))}
              />

              <div
                className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
                onClick={() => imageInputRef.current?.click()}
              >
                <div className="text-center">
                  {files.image ? (
                    <p className="text-emerald-500">{files.image.name.slice(0, 20)}</p>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-zinc-400" />
                      <p className="text-sm text-zinc-400">Upload artwork</p>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => audioInputRef.current?.click()}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md"
              >
                {files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
              </button>

              <input
                type="text"
                placeholder="Title"
                value={newSong.title}
                onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-md"
              />

              <input
                type="text"
                placeholder="Artist"
                value={newSong.artist}
                onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-md"
              />

              <input
                type="number"
                min="0"
                placeholder="Duration"
                value={newSong.duration}
                onChange={(e) => setNewSong({ ...newSong, duration: e.target.value || "0" })}
                className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-md"
              />

              <select
                value={newSong.album}
                onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded-md"
              >
                <option value="none">No Album (Single)</option>
                {albums.map((album) => (
                  <option key={album._id} value={album._id}>
                    {album.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setSongDialogOpen(false)}
                className="bg-zinc-700 text-white px-4 py-2 rounded-md"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-emerald-500 text-black px-4 py-2 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Add Song"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddSongDialog;
