import { Router } from "express";
import {
  checkIsAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../Controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../Middleware/authMiddleware.js";

const router = Router();

// middleware
router.use(protectRoute, requireAdmin);

router.get("/check", checkIsAdmin);
router.post("/songs", createSong);
router.post("/songs/:id", deleteSong);
router.post("/albums", createAlbum);
router.delete("/albums:/id", deleteAlbum);

export default router;
    