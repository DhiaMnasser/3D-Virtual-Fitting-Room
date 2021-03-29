const Review =require('../models/Review.js');
const mongoose =require('mongoose');

 const getReviews = async(req, res) => {
    try {
        const reviewModels = await Review.find();
        console.log('getting Reviews');
        res.status(200).json(reviewModels);
    } catch (error) {
        res.status(404).send({message: error.message}); 
    }
}

 const getReviewById = async (req, res) => { 
    const { id } = req.params;

    try {
        const review = await Review.findById(id);
        
        res.status(200).json(review);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

 const createReview = async(req, res) => {
    console.log(`create review in server ${req}`);
    
    const {creator_id, creator, message,productId,reviewDate} = req.body;
    const newReview = await new Review({creator_id,creator, message,productId,reviewDate: new Date().toISOString()});
    try {
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(409).send({message: error.message});
    }
}
              

 const updateReview = async (req, res) => {
    const { id } = req.params;
    const { userId, message} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Review with id: ${id}`);


    const updatedReview ={ userId, message};

    await Review.findByIdAndUpdate(id, updatedReview, { new: true });

    res.status(200).json(updatedReview);
}
 const deleteReview = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Review with id: ${id}`);

    await Review.findByIdAndRemove(id);

    res.status(200).json({ message: "Review deleted successfully." });
}
module.exports= {deleteReview,updateReview,createReview,getReviewById,getReviews }