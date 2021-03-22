export default (reviews = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
      break;
    case "CREATE":
      return [...reviews, action.payload];
      break;
    case "UPDATE":
      return reviews.map(review =>
        review._id === action.payload._id ? action.payload : review
      );
    case "DELETE":
      return reviews.filter(review => review._id !== action.payload);
    default:
      return reviews;
      break;
  }
};
