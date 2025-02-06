
import { Router } from "express"
import {User} from "../Models/user.model.js"
import { auth } from "../Controllers/auth.controller.js"
const router = Router()

router.post("/callback",auth )

export default router