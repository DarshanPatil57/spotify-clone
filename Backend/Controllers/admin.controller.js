import {Song} from "../Models/song.model.js"
import {Album} from "../Models/album.model.js"
import cloudinary from "../Db/cloudinary.js"

const uploadToCloudinary = async (file)=>{
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type:"auto"
        })
        return result.secure_url
    } catch (error) {
        console.log("Error in uploadToCloudinary", error);
        throw new Error("Error uploading to cloudinary")
        
    }
}

export const createSong = async (req,res)=>{

    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({
                message:"Please uplaod all the files"
            })
        }

        const {title,artist,albumId,duration} = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = await uploadToCloudinary(audioFile)
        const imageUrl = await uploadToCloudinary(imageFile)

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId:albumId || null
        })

        await song.save()

        // update the album if the songs belong to that album 
        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push:{songs:song._id}
            })
        }

        re.status(201).json(song)
    } catch (error) {
        console.log("Error in creating Song", error);
        res.status(500).json({
            message:"Internal server error", error
        })
    }
}

export const deleteSong = async (req,res)=>{
    try {
        const {id} = req.params

        const song = await Song.findById(id)

        // if song belongs to an album update the album

        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull:{
                    songs:song._id
                }
            })
        }

        await Song.findByIdAndDelete(id)
        res.status(200).json({
            message:"Song deleted successfully"
        })
    } catch (error) {
        console.log("Error in deleting Song", error);
        res.status(500).json({
            message:"Internal server error", error
        })
    }
}

export const createAlbum = async (req,res)=>{
    try {
        const {title,artist,releaseYear} = req.body
        const {imageFile} = req.files

        const imageUrl = await uploadToCloudinary(imageFile)

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        })

        await album.save()

        res.status(200).json(album)
    } catch (error) {
        console.log("Error in creating Album",error);
        res.status(500).json({
            message:"Internal server error", error
        })
    }
}

export const deleteAlbum = async (req,res)=>{
    try {
        const {id} = req.params
        await Song.deleteMany({
            albumId:id
        })
        await Album.findByIdAndDelete(id)

        res.status(200).json({
            message:"Album deleted successfully"
        })
    } catch (error) {
        console.log("Error in deleting Album",error);
        res.status(500).json({
            message:"Internal server error", error
        })
    }
}

export const checkIsAdmin = async (req,res)=>{
    res.status(200).json({
        admin:true
    })
}