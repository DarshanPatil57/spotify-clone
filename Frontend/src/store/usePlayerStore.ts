import { create } from "zustand";
import {Song} from "../types/index"

interface PlayerStore {
    currentSong: Song | null,
    isPlaying:boolean,
    queue:Song[],
    currentIndex: number,

    initialQueue:(songs:Song[]) =>void;
    playAlbum:(songs:Song[], startIndex?:number) =>void;
    setCurrentSong:(songs:Song | null) =>void;
    togglePlay:() =>void;
    playNext:()=>void;
    playPrevious:()=>void
}

export const usePlayerStore = create<PlayerStore>((set,get)=>({
    currentSong:null,
    isPlaying:false,
    queue:[],
    currentIndex:-1,

    initialQueue:(songs:Song[])=> {
        set({
            queue:songs,
            currentSong:get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        })
    },

    playAlbum: (songs: Song[] | undefined, startIndex = 0) => {
        if (!songs || songs.length === 0) {
            console.error("No songs available to play.");
            return;
        }
    
        const song = songs[startIndex];
        if (!song) {
            console.error("Invalid start index.");
            return;
        }
    
        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true
        });
    },
    

    setCurrentSong:(song:Song | null) => {
        if(!song) return;

        const songIndex  = get().queue.findIndex(s => s._id === song._id);
        set({
            currentSong:song,
            isPlaying:true,
            currentIndex:songIndex !== -1 ? songIndex:get().currentIndex
        })
    },

    togglePlay:()=> {
        const willStartPlaying = !get().isPlaying;
        set({
            isPlaying:willStartPlaying
        })
    },

    playNext:()=> {
        const {currentIndex,queue} = get()
        const nextIndex = currentIndex +1

        if(nextIndex < queue.length){
            const nextSong = queue[nextIndex]

            set({
                currentSong:nextSong,
                currentIndex:nextIndex,
                isPlaying:true
            })
        } else{
            set({isPlaying:false})
        }
    },

    playPrevious:()=>{
        const {currentIndex,queue} = get()
        const prevIndex = currentIndex - 1;

        if(prevIndex >= 0){
            const prevSong = queue[prevIndex]
            set({
                currentIndex:prevIndex,
                currentSong:prevSong,
                isPlaying:true
            })
        } else{
            set({isPlaying:false})
        }
    }
}))