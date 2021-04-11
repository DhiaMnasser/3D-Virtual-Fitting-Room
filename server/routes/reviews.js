const express =require( 'express')
<<<<<<< HEAD
const { getReviews, getReviewById, createReview, updateReview, deleteReview } =require('../controllers/reviews.js');
=======
const { getReviews, getReviewById, createReview, updateReview, deleteReview,likeReview } =require('../controllers/reviews.js');
>>>>>>> hajer3

var router = express.Router();

/* GET Reviews listing. */
router.get("/", getReviews);
router.get("/:id", getReviewById);
router.post("/", createReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);
<<<<<<< HEAD
=======
router.patch('/:id/likeReview', likeReview);
>>>>>>> hajer3


module.exports= router;