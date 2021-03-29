import React from 'react'


import './product.css'
import { deleteReview} from '../../../redux/slices/reviews'
import { useDispatch } from 'react-redux'
import {   Button } from '@material-ui/core';
import { Link} from 'react-router-dom';
function Review(props) {
  const dispatch = useDispatch()
  
    return (
        <div className={props.class}>
                <div className="product__item">   
                        
                    
                    <div className="product__item__text">
                        <h6><a href="#">{props.review.creator}</a></h6>
                       
                        <div className="product__price">${props.review.message}</div>
                        <div className="product__price">${props.review.productId}</div>
                        <div className="product__price">${props.review.reviewDate}</div>
                       {/*  <div className="product__price">$ 49.0 <span>$ 59.0</span></div> */}
                    </div>
                </div>
                <button onClick={()=>{dispatch(deleteReview(props.review._id))}}>delete</button>
                <Button component={Link} to={"/updatereview/"+props.review._id} variant="contained" color="primary">Sign In</Button>
                <button onClick={()=>{}}>update</button>
                <script> 

                </script>
            </div>
    )
}

export default Review