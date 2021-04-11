import ReactStars from "react-rating-stars-component";
function Stars() {
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
    <>
<ReactStars
    count={5}
    onChange={ratingChanged} 
    size={24}
    activeColor="#ffd700"
    />,
    </>
    return (null);
    }
export default Stars;

