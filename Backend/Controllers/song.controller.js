import {Song} from "../Models/song.model.js"
import {Album} from "../Models/album.model.js"

export const getAllSongs = async (req,res) =>{
    try {
        const songs = Song.find().sort({createdAt:-1})
        res.status(200).json(songs)

    } catch (error) {
        console.log("Error in getting songs", error);
        res.status(500).json({
            message:"Interval server error"
        })
    }
}


exp