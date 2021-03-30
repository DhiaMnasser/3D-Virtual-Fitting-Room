import React, { useEffect } from "react";
import Review from "../Review/Review";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, createReview, updateReview, deleteReview } from '../../../redux/slices/reviews';


const Reviews = () => {
  
  const reviews = useSelector((state) => state.reviews.reviews)
console.log(JSON.stringify(useSelector((state) => state), null, 4));

  return (
    <>
      <h1>Review list</h1>
      <div class="col-lg-9 col-md-9">
        <div class="row">
        {reviews.map((review)=>{ 
           return<Review key={review._id} review={review} class="col-lg-3 col-md-4 col-sm-6 mix cosmetic" stars="5"/> 

        })}
          
        </div>
      </div>

    </>
  );
};

export default Reviews;