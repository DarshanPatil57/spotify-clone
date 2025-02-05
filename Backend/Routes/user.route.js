
import { Router } from "express"
import { protectRoute } from "../Middleware/authMiddleware"
import { getAllUser } from "../Controllers/user.controller"

const router = Router()

router.get("/", protectRoute, getAllUser)

export default router