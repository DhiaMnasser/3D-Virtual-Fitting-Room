const Message =require('../models/Message.js');
const mongoose =require('mongoose');

 const getMessages = async(req, res) => {
    try {
        const MessageModels = await Message.find();
        console.log('getting Messages');
        res.status(200).json(MessageModels);
    } catch (error) {
        res.status(404).send({message: error.message}); 
    }
}

 const getMessageById = async (req, res) => { 
    const { id } = req.params;

    try {
        const Message = await Message.findById(id);
        
        res.status(200).json(Message);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

 const createMessage = async(req, res) => {
    console.log(`create Message in server ${req}`);
    
    const { userId, MessageFile} = req.body;
    const newMessage = await new Message({userId, MessageFile });
    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(409).send({message: error.message});
    }
}
              

 const updateMessage = async (req, res) => {
    const { id } = req.params;
    const { userId, MessageFile} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Message with id: ${id}`);


    const updatedMessage ={ userId, MessageFile};

    await Message.findByIdAndUpdate(id, updatedMessage, { new: true });

    res.status(200).json(updatedMessage);
}

 const deleteMessage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Message with id: ${id}`);

    await Message.findByIdAndRemove(id);

    res.status(200).json({ message: "Message deleted successfully." });
}
module.exports= {deleteMessage,updateMessage,createMessage,getMessageById,getMessages}