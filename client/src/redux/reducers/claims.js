export default (claims = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
      break;
    case "CREATE":
      return [...claims, action.payload];
      break;
    case "UPDATE":
      return claims.map(claim =>
        claim._id === action.payload._id ? action.payload : claim
      );
    case "DELETE":
      return claims.filter(claim => claim._id !== action.payload);
    default:
      return claims;
      break;
  }
};
