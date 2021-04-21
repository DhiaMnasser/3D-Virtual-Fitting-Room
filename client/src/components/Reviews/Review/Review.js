import React from 'react'


import './Review.css'
import { deleteReview} from '../../../redux/slices/reviews'
import { useDispatch } from 'react-redux'
import {   Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
                <Button color="primary"  fullWidth variant="contained"  onClick={()=>{dispatch(deleteReview(props.review._id))}}>delete</Button>
                <br/>
                <Link to={{pathname: "/updatereview/"+props.review._id, review: props.review}}> <Button type="button" color="danger" fullWidth variant="contained"  > update </Button></Link>
                
                {/* <Button component={Link} to={"/updatereview/"+props.review._id} variant="contained" color="primary"> Updatee</Button> */}
                
                <script> 

                </script>
            </div>
    )
}

export default Review