export default (products = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
      break;
    case "CREATE":
      return [...products, action.payload];
      break;
    case "UPDATE":
      return products.map((product) => (product._id === action.payload._id ? action.payload : product));
    case "DELETE":
      return products.filter((product) => product._id !== action.payload);
    default:
      return products;
      break;
  }
};
