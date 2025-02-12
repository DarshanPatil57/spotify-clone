import { usePlayerStore } from '../store/usePlayerStore'
import React, { useEffect, useRef } from 'react'

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const prevSongRef = useRef<string | null>(null)

  const {currentSong,isPlaying,playNext} = usePlayerStore() 

  // handle song play/pause
  useEffect(()=>{
    if(isPlaying) audioRef.current?.play()
      else audioRef.current?.pause()
  },[isPlaying])

  // handle song end

  useEffect(()=>{
    const audio = audioRef.current

    const handleEnded = () =>{
      playNext()
    }
    audio?.addEventListener("ended",handleEnded)

    return () => audio?.removeEventListener("ended",handleEnded)
  },[playNext])

  // handle song changes

  useEffect(()=>{
    if(!audioRef.current || !currentSong) return
    const audio = audioRef.current

    const isSongChaged = prevSongRef.current !== currentSong?.audioUrl
    if(isSongChaged){
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl

      if(isPlaying) audio.play()
    }
  },[currentSong,isPlaying])

  return (
    <audio ref={audioRef}/>
  )
}

export default AudioPlayer