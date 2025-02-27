import { useRef, useState } from "react";
import { Plus, Upload } from "lucide-react";
import { axiosInstance } from "./../../lib/axios";
import toast from "react-hot-toast";

const AddAlbumDialog = () => {
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!imageFile) {
        return toast.error("Please upload an image");
      }

      const formData = new FormData();
      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear.toString());
      formData.append("imageFile", imageFile);

      await axiosInstance.post("/admin/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewAlbum({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
      });
      setImageFile(null);
      setAlbumDialogOpen(false);
      toast.success("Album created successfully");
    } catch (error: any) {
      toast.error("Failed to create album: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setAlbumDialogOpen(true)}
        className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md"
      >
        <Plus className=" size-3" />
        Add Album
      </button>

      {albumDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-white">Add New Album</h2>
            <p className="text-sm text-zinc-400">Add a new album to your collection</p>

            <div className="space-y-4 mt-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <div
                className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center">
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">
                    {imageFile ? imageFile.name : "Upload album artwork"}
                  </div>
                  <button className="text-xs border border-zinc-600 px-3 py-1 rounded-md text-white">
                    Choose File
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Album Title</label>
                <input
                  value={newAlbum.title}
                  onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white"
                  placeholder="Enter album title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Artist</label>
                <input
                  value={newAlbum.artist}
                  onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white"
                  placeholder="Enter artist name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Release Year</label>
                <input
                  type="number"
                  value={newAlbum.releaseYear}
                  onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white"
                  placeholder="Enter release year"
                  min={1900}
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setAlbumDialogOpen(false)}
                disabled={isLoading}
                className="px-4 py-2 border border-zinc-600 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-md text-white disabled:opacity-50"
                disabled={isLoading || !imageFile || !newAlbum.title || !newAlbum.artist}
              >
                {isLoading ? "Creating..." : "Add Album"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAlbumDialog;
