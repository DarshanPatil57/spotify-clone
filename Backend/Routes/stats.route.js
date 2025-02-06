
import { Router } from "express"
import { protectRoute, requireAdmin } from "../Middleware/authMiddleware.js"
import { getStats } from "../Controllers/stats.controller.js"

const router = Router()

router.get("/", protectRoute, requireAdmin, getStats)

export default router