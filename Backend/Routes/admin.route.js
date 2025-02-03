
import { Router } from "express"
import { createSong, deleteSong } from "../Controllers/admin.controller.js"
import { protectRoute, requireAdmin } from "../Middleware/authMiddleware.js"

const router = Router()

router.post("/songs",protectRoute,requireAdmin , createSong)
router.post("/songs/:id",protectRoute,requireAdmin , deleteSong)

export default router