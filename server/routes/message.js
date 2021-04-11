const express =require('express')
const { getMessages, getMessageById, createMessage, updateMessage, deleteMessage } =require( '../controllers/messages.js');

var router = express.Router();

/* GET Message listing. */
router.get("/", getMessages);
router.get("/:id", getMessageById);
router.post("/", createMessage);
router.patch("/:id", updateMessage);
router.delete("/:id", deleteMessage);

module.exports= router