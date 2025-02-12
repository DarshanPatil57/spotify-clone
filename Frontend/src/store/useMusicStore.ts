import { Album, Song } from '../types/index';
import { axiosInstance } from '../lib/axios'
import {create} from 'zustand'

interface MusicStore {
    songs: Song[],
    albums: Album[],
    isLoading: boolean,
    error: string | null,
    currentAlbum: Album | null,
    feturedSongs:Song[]
    madeForYouSongs:Song[],
    trendingSong:Song[]

    fetchAlbums: ()=>Promise<void>,
    fetchAlbumById: (id:string) => Promise<void>,
    fetchFeturedSongs: ()=> Promise<void>
    fetchMadeForYouSongs: ()=>Promise<void>,
    fetchTrendingSong:()=>Promise<void>
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