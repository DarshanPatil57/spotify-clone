
import { Router } from "express"
import { protectRoute } from "../Middleware/authMiddleware.js"
import { getAllUser } from "../Controllers/user.controller.js"

const router = Router()

router.get("/", protectRoute, getAllUser)

export default router