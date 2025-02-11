import { Album, Song } from '../types/index';
import { axiosInstance } from '../lib/axios'
import {create} from 'zustand'

interface MusicStore {
    songs: Song[],
    albums: Album[],
    isLoading: boolean,
    error: string | null,
    currentAlbum: Album | null,

    fetchAlbums: ()=>Promise<void>,
    fetchAlbumById: (id:string) => Promise<void>,
}

export const useMusicStore = create<MusicStore>((set) =>({
    albums:[],
    songs:[],
    isLoading:false,
    error:null,
    currentAlbum:null,
    
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
    }
    
}))