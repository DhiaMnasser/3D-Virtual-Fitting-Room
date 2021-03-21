import express from 'express'
import { getAvatars, getAvatarById, createAvatar, updateAvatar, deleteAvatar } from '../controllers/avatars.js';

var router = express.Router();

/* GET products listing. */
router.get("/", getAvatars);
router.get("/:id", getAvatarById);
router.post("/", createAvatar);
router.patch("/:id", updateAvatar);
router.delete("/:id", deleteAvatar);



export default router;
