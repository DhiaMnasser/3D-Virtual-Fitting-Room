const express =require('express')
const { getAvatars, getAvatarById, createAvatar, updateAvatar, deleteAvatar } =require( '../controllers/avatars.js');

var router = express.Router();

/* GET products listing. */
router.get("/", getAvatars);
router.get("/:id", getAvatarById);
router.post("/", createAvatar);
router.patch("/:id", updateAvatar);
router.delete("/:id", deleteAvatar);



module.exports= router
