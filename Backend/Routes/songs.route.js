
import { Router } from "express"
import { getAllSongs } from "../Controllers/song.controller"
import { protectRoute, requireAdmin } from "../Middleware/authMiddleware.js";


const router = Router()

router.get("/", protectRoute,requireAdmin , getAllSongs)

export default router