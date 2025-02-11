import { Clock, Loader, Play } from 'lucide-react';
import { useMusicStore } from '../store/useMusicStore';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const formateDuration = (seconds:number)=>{
    const minutes = Math.floor(seconds/60)
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2,"0")}`
}

const AlbumPage = () => {
    const { albumId } = useParams();
    const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();

    useEffect(() => {
        if (albumId) fetchAlbumById(albumId);
    }, [fetchAlbumById, albumId]);

    if (isLoading) return <Loader className="size-8 flex items-center justify-center text-emerald-500 animate-spin" />

    return (
        <div className="h-screen w-full flex flex-col items-center text-white overflow-y-auto custom-scrollbar">
            {/* Background Section */}
            <div className="relative w-full h-72 md:h-96 ">
                <div className="absolute inset-0 pointer-events-none" />
            </div>

            {/* Album Details */}
            <div className="z-10 w-full max-w-5xl px-6 py-8">
                <div className="flex p-6 gap-6 pb-8">
                    <img 
                        src={currentAlbum?.imageUrl} 
                        alt={currentAlbum?.title} 
                        className="w-[240px] h-[240px] shadow-xl rounded-lg object-cover"
                    />
                    <div className="flex flex-col justify-end">
                        <p className="text-sm font-medium">Album</p>
                        <h2 className="text-7xl font-bold my-4">{currentAlbum?.title}</h2>
                        <div className="flex items-center gap-2 text-sm text-zinc-100">
                            <span className="font-medium text-white">{currentAlbum?.artist}</span>
                            <span>• {currentAlbum?.songs?.length} songs</span>
                            <span>• {currentAlbum?.releaseYear}</span>
                        </div>
                    </div>
                </div>

                {/* Play Button */}
                <div className="flex px-5 pb-4 items-center gap-6">
                    <button className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all cursor-pointer">
                        <Play className="h-7 text-black flex w-full" />
                    </button>
                </div>

                {/* Songs List */}
                <div className="mt-6 max-h-[calc(100vh-320px)] overflow-y-auto custom-scrollbar cursor-pointer">
                    {currentAlbum?.songs?.length ? (
                        <ul className="space-y-4">
                            {currentAlbum.songs.map((song, index) => (
                                <li key={song._id} className="flex items-center p-4 bg-zinc-800 rounded-lg shadow-md gap-4">
                                    {/* Song Image */}
                                    <img 
                                        src={song.imageUrl} 
                                        alt={song.title} 
                                        className="w-16 h-16 object-cover rounded-lg shadow"
                                    />
                                    
                                    {/* Song Info */}
                                    <div className="flex flex-col flex-grow">
                                       <div className="flex justify-between">
                                           <p className="text-lg font-medium">{index + 1}. {song.title}</p>
                                           <p className="text-sm text-gray-400 flex items-center gap-1">
                                               <Clock className="h-3 w-3 text-gray-400"/> {formateDuration(song.duration)}
                                           </p>
                                       </div>
                                        <p className="text-sm text-gray-400">{song.artist}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-center mt-4">No songs available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlbumPage;
