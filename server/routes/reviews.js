const express =require( 'express')
const { getReviews, getReviewById, createReview, updateReview, deleteReview,likeReview } =require('../controllers/reviews.js');

var router = express.Router();

/* GET Reviews listing. */
router.get("/", getReviews);
router.get("/:id", getReviewById);
router.post("/", createReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);
router.patch('/:id/likeReview', likeReview);


module.exports= router;