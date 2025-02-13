import { Pause, Play } from 'lucide-react'
import { usePlayerStore } from '../store/usePlayerStore'
import { Song } from '../types'
import React from 'react'

const PlayButton = ({songs}:{songs:Song}) => {
    const {isPlaying,currentSong,setCurrentSong,togglePlay} = usePlayerStore()

    const isCurrentSong = currentSong?._id === songs._id

    const handlePLay = () =>{
        if(isCurrentSong){
            togglePlay()
        }
        else{
            setCurrentSong(songs)
        }
    }
  return (
    <button onClick={handlePLay} key={songs._id} className={` absolute bottom-3 right-2 h-7 w-7 flex items-center justify-center rounded-md bg-green-500 hover:bg-green-400 hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0 ${ isCurrentSong ? "opacity-100" : " opacity-0 group-hover:opacity-100"}`}>
        {
            isCurrentSong && isPlaying ? (
                <Pause className='size-4 text-black cursor-pointer'/>
            ) : (<Play className='size-4 text-black cursor-pointer' />)
        }
    </button>
  )
}

export default PlayButton