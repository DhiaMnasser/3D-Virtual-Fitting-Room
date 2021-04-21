export default (categories = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
      break;
    case "CREATE":
      return [...categories, action.payload];
      break;
    case "UPDATE":
      return categories.map(categorie =>
        categorie._id === action.payload._id ? action.payload : categorie
      );
    case "DELETE":
      return categories.filter(categorie => categorie._id !== action.payload);

    default:
      return categories;
      break;
  }
};
