import express from "express"
import { clerkMiddleware } from '@clerk/express'

import { connectDb } from "./Db/db.js"

import dotenv from "dotenv"
dotenv.config()

// routes
import userRoute from "./Routes/user.route.js"
import authRoute from "./Routes/auth.route.js"
import adminRoute from "./Routes/admin.route.js"
import songsRoute from "./Routes/songs.route.js"
import albumRoute from "./Routes/albums.route.js"
import statsRoute from "./Routes/stats.route.js"

import fileUpload from "express-fileupload"
import path from "path"

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(clerkMiddleware()) // add auth to req obj => req.auth.userId
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,"temp"),
    createParentPath:true,
    limits:{
        fileSize: 10 * 1024 * 1024 //filesize
    }
}))

app.use("/api/users",userRoute )
app.use("/api/auth", authRoute )
app.use("/api/admin",adminRoute )
app.use("/api/songs",songsRoute )
app.use("/api/albums",albumRoute )
app.use("/api/stats",statsRoute )



app.listen(PORT, ()=> console.log("Server listning to port 3000"),
// connectDb()
)