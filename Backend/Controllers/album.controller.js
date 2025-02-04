import {Album} from "../Models/album.model.js"



export const getAlbums = async(req,res) =>{
    try {
        const albums = await Album.find({})
        res.status(200).json(albums)
    } catch (error) {
        console.log("Error in getting album", error);
        res.status(500).json({
            message:"Interval server error"
        })  
    }
}


export const getAlbumById = async(req,res) =>{
    try {
        const {albumId} = req.params
        const album = Album.findById(albumId).populate("songs")

        if(!album) return res.status(404).json({
            message:"Album not found"
        })

        res.status(200).json(album)
    } catch (error) {
        console.log("Error in getting album by id", error);
        res.status(500).json({
            message:"Interval server error"
        })  
    }
}
