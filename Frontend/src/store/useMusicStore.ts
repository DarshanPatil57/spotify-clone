import { Album, Song, Stats } from '../types/index';
import { axiosInstance } from '../lib/axios'
import {create} from 'zustand'
import toast from 'react-hot-toast';

interface MusicStore {
    songs: Song[],
    albums: Album[],
    isLoading: boolean,
    error: string | null,
    currentAlbum: Album | null,
    feturedSongs:Song[]
    madeForYouSongs:Song[],
    trendingSong:Song[],
    stats:Stats

    fetchAlbums: ()=>Promise<void>,
    fetchAlbumById: (id:string) => Promise<void>,
    fetchFeturedSongs: ()=> Promise<void>
    fetchMadeForYouSongs: ()=>Promise<void>,
    fetchTrendingSong:()=>Promise<void>,
    fetchSongs:()=>Promise<void>,
    fetchStats:()=>Promise<void>,
    deleteSong:(id:string)=>Promise<void>,
    deleteAlbum:(id:string)=>Promise<void>,
}

export const useMusicStore = create<MusicStore>((set) =>({
    albums:[],
    songs:[],
    isLoading:false,
    error:null,
    currentAlbum:null,
    feturedSongs:[],
    madeForYouSongs:[],
    trendingSong:[],
    stats:{
        totalSongs:0,
        totalAlbums:0,
        totalArtists:0,
        totalUsers:0
    },

    deleteSong:async (id)=>{
        set({isLoading:true,error:null})
        try {
            await axiosInstance.delete(`/admin/songs/${id}`)
            set(state =>({
                songs:state.songs.filter(song => song._id !== id)
            }))
            toast.success("Song deleted successfully")
        } catch (error:any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
            toast.error("Error deleting song")
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAlbum:async (id)=>{
        set({isLoading:true,error:null})
        try {
            await axiosInstance.delete(`/admin/albums/${id}`)
            set((state) =>({
                albums:state.albums.filter(album => album._id !== id),
                songs:state.songs.map((song)=> song.albumId === state.albums.find((a)=> a._id ===id)?.title ? {...song,album:null} :song)
            }))
            toast.success("Album deleted successfully")
        } catch (error:any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
            toast.error("Error deleting Album")
        } finally {
            set({ isLoading: false });
        }
    },
  
    // for admin dashboard
    fetchSongs: async ()=>{
        set({isLoading:true,error:null})
        try {
            const response = await axiosInstance.get("/songs")
            set({songs:response.data})
        } catch (error:any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchStats: async ()=>{
        set({isLoading:true,error:null})
        try {
            const response = await axiosInstance.get("/stats")
            set({stats:response.data})
        } catch (error:any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    },
    
    fetchAlbums: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/albums");
            // console.log("API Response:", response); 
            set({ albums: response.data || [] });
        } catch (error: any) {
            // console.error("Error fetching albums:", error);
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbumById: async (id) =>{
        set({isLoading:true, error:null})

        try {
            const response = await axiosInstance.get(`/albums/${id}`)
            set({currentAlbum:response.data})
        } catch (error:any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally{
            set({isLoading:false})
        }
    },

    fetchFeturedSongs: async ()=>{
        set({isLoading:true,error:null})

        try {
            const response = await axiosInstance.get("/songs/featured")
            set({feturedSongs:response.data})

        } catch (error:any) {
             set({ error: error.response?.data?.message || "Something went wrong" });
        } finally{
            set({isLoading:false})
        }
    },

    fetchMadeForYouSongs: async ()=>{
        set({isLoading:true,error:null})
        
        try {
            const response = await axiosInstance.get("/songs/made-for-you")
            set({madeForYouSongs:response.data})   
        } catch (error:any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        }finally{
            set({isLoading:false})
        }
    },

    fetchTrendingSong:async ()=>{
        set({isLoading:true,error:null})
        try {
            const response = await axiosInstance.get("/songs/trending")
            set({trendingSong:response.data})
        } catch (error:any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        }finally{
            set({isLoading:false})
        }
    }
    
}))