import {Song} from "../Models/song.model.js"
import {Album} from "../Models/album.model.js"
import { User } from "../Models/user.model.js"


export const getStats = async (req,res) =>{
    try {

        // const totalSongs = await Song.countDocuments()
        // const totalUsers = await User.countDocuments()
        // const totalAlbums = await Album.countDocuments()

        // efficient way 
        const [totalSongs,totalAlbums,totalUsers,uniqueArtists]  = Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),

            Song.aggregate([
                {
                    $unionWith:{ // merges albums and songs collection
                        coll:"albums",
                        pipeline:[]
                    }
                },
                {
                    $group:{ //groups dataset by artist filed
                        _id:"$artist"
                    }
                },
                {
                    $count:"count" //count the total number
                }
            ])
        ])

        res.status(200).json({
            totalSongs,totalAlbums,totalUsers,totalArtists:uniqueArtists[0]?.count || 0
        })
    } catch (error) {
        console.log("Error in getting stats " ,error);
        res.status(500).json({
            message:"Interval server error"
        })
    }
}