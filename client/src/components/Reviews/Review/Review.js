import React from 'react'


import './product.css'
<<<<<<< HEAD
import { deleteReview} from '../../../redux/slices/reviews'
import { useDispatch } from 'react-redux'
import {   Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
function Review(props) {
  const dispatch = useDispatch()
  
=======
import { deleteReview,likeReview} from '../../../redux/slices/reviews'
import { useDispatch } from 'react-redux'
import {   Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
function Review(props) {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));
  const Likes = () => {
    if (props.review.likes.length > 0) {
      return props.review.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{props.review.likes.length> 2 ? `You and ${props.review.likes.length - 1} others` : `${props.review.likes.length} like${props.review.likes.length> 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{props.review.likes.length} {props.review.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };
>>>>>>> hajer3
    return (
        <div className={props.class}>
                <div className="product__item">   
                        
                    
<<<<<<< HEAD
                    <div className="product__item__text">
                        <h6><a href="#">{props.review.creator}</a></h6>
                       
                        <div className="product__price">${props.review.message}</div>
                        <div className="product__price">${props.review.productId}</div>
                        <div className="product__price">${props.review.reviewDate}</div>
                       {/*  <div className="product__price">$ 49.0 <span>$ 59.0</span></div> */}
                    </div>
                </div>
=======
                    < div className="product__item__text">
                        <h6><a href="#">{props.review.creator}</a></h6>
                       
                        <div className="product__price">{props.review.message}</div>
                        
                        
                       {/*  <div className="product__price">$ 49.0 <span>$ 59.0</span></div> */}
                    
                
>>>>>>> hajer3
                <Button color="primary"  fullWidth variant="contained"  onClick={()=>{dispatch(deleteReview(props.review._id))}}>delete</Button>
                <br/>
                <Link to={{pathname: "/updatereview/"+props.review._id, review: props.review}}> <Button type="button" color="danger" fullWidth variant="contained"  > update </Button></Link>
                
                {/* <Button component={Link} to={"/updatereview/"+props.review._id} variant="contained" color="primary"> Updatee</Button> */}
<<<<<<< HEAD
                
=======
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeReview(props.review._id))}>
          <Likes />
           {props.review.likeCount} 
          </Button>
>>>>>>> hajer3
                <script> 

                </script>
            </div>
<<<<<<< HEAD
=======
            </div>
            </div>
>>>>>>> hajer3
    )
}

export default Review