import Avatar from '../models/Avatar.js';
import mongoose from 'mongoose';

export const getAvatars = async(req, res) => {
    try {
        const avatarModels = await Avatar.find();
        console.log('getting Avatars');
        res.status(200).json(avatarModels);
    } catch (error) {
        res.status(404).json({message: error.message}); 
    }
}

export const getAvatarById = async (req, res) => { 
    const { id } = req.params;

    try {
        const avatar = await Avatar.findById(id);
        
        res.status(200).json(Avatar);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createAvatar = async(req, res) => {
    console.log(`create avatar in server ${req}`);
    
    const { userId, avatarFile} = req.body;
    const newAvatar = await new Avatar({userId, avatarFile });
    try {
        await newAvatar.save();
        res.status(201).json(newAvatar);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}
              

export const updateAvatar = async (req, res) => {
    const { id } = req.params;
    const { userId, avatarFile} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No avatar with id: ${id}`);


    const updatedAvatar ={ userId, avatarFile};

    await Avatar.findByIdAndUpdate(id, updatedAvatar, { new: true });

    res.json(updatedAvatar);
}

export const deleteAvatar = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No avatar with id: ${id}`);

    await Avatar.findByIdAndRemove(id);

    res.json({ message: "Avatar deleted successfully." });
}
