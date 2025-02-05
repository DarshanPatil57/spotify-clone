
import { Router } from "express"
import { protectRoute, requireAdmin } from "../Middleware/authMiddleware"
import { getStats } from "../Controllers/stats.controller"

const router = Router()

router.get("/", protectRoute, requireAdmin, getStats)

export default router