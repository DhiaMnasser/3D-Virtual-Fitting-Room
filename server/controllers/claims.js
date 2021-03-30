const Claim =require( '../models/Claim.js');
const mongoose =require('mongoose');

 const getClaims = async(req, res) => {
    try {
        const claimModels = await Claim.find();
        console.log('getting Claims');
        res.status(200).json(claimModels);
    } catch (error) {
        res.status(404).send({message: error.message}); 
    }
}

 const getClaimById = async (req, res) => { 
    const { id } = req.params;

    try {
        const claim = await Claim.findById(id);
        
        res.status(200).json(claim);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

 const createClaim = async(req, res) => {
    console.log(`create claim in server ${req}`);
    console.log(req.userId);
    const {message,creator ,creator_id} = req.body;
    const newClaim = await new Claim({ message , creator, creator_id });
    try {
        await newClaim.save();
        res.status(201).json(newClaim);
    } catch (error) {
        res.status(409).send({message: error.message});
    }
}
              

 const updateClaim = async (req, res) => {
    const { id } = req.params;
    const { userId, message} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Claim with id: ${id}`);


    const updatedClaim ={ userId, message};

    await Claim.findByIdAndUpdate(id, updatedClaim, { new: true });

    res.status(200).json(updatedClaim);
}

 const deleteClaim = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Claim with id: ${id}`);

    await Claim.findByIdAndRemove(id);

    res.status(200).json({ message: "Claim deleted successfully." });
}
module.exports= {deleteClaim,updateClaim,createClaim,getClaimById,getClaims }