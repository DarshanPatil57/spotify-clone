
import { Router } from "express"
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs,  getTrendingSongs } from "../Controllers/song.controller"
import { protectRoute, requireAdmin } from "../Middleware/authMiddleware.js";


const router = Router()

router.get("/", protectRoute,requireAdmin , getAllSongs)
router.get("/featured",  getFeaturedSongs)
router.get("/made-for-you",  getMadeForYouSongs)
router.get("/trending",  getTrendingSongs)

export default router