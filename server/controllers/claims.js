import Claim from '../models/Claim.js';
import mongoose from 'mongoose';

export const getClaims = async(req, res) => {
    try {
        const claimModels = await Claim.find();
        console.log('getting Claims');
        res.status(200).json(claimModels);
    } catch (error) {
        res.status(404).json({message: error.message}); 
    }
}

export const getClaimById = async (req, res) => { 
    const { id } = req.params;

    try {
        const claim = await Claim.findById(id);
        
        res.status(200).json(claim);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createClaim = async(req, res) => {
    console.log(`create claim in server ${req}`);
    
    const { userId, message} = req.body;
    const newclaim = await new Claim({userId, message });
    try {
        await newClaim.save();
        res.status(201).json(newClaim);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}
              

export const updateClaim = async (req, res) => {
    const { id } = req.params;
    const { userId, message} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Claim with id: ${id}`);


    const updatedClaim ={ userId, message};

    await Claim.findByIdAndUpdate(id, updatedClaim, { new: true });

    res.json(updatedClaim);
}

export const deleteClaim = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Claim with id: ${id}`);

    await Claim.findByIdAndRemove(id);

    res.json({ message: "Claim deleted successfully." });
}
