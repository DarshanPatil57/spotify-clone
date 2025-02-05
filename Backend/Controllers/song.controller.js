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

export const getFeaturedSongs = async ()=>{
    try {
        //fetch 6 randoms songs uing monogdb aggregation pipline
        const songs = Song.aggregate([
            {
                $sample:{size:6}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])

        res.status(200).json(songs)

    } catch (error) {
        console.log("Error in getting Featured songs", error);
        res.status(500).json({
            message:"Interval server error"
        })
    }
}

export const getMadeForYouSongs = async ()=>{
    try {
        const songs = Song.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.status(200).json(songs)

    } catch (error) {
        console.log("Error in getting MadeForYou songs", error);
        res.status(500).json({
            message:"Interval server error"
        })
    }
}

export const getTrendingSongs = async ()=>{
    try {
        const songs = Song.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.status(200).json(songs)

    } catch (error) {
        console.log("Error in getting Trending songs", error);
        res.status(500).json({
            message:"Interval server error"
        })
    }
}