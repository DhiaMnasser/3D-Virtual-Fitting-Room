export default (categories = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
      break;
    case "CREATE":
      console.log("reducer categories" + JSON.stringify(categories, null, 4));
      console.log("reducer action" + JSON.stringify(action, null, 4));

      return [...categories, action.payload];
      break;
    case "UPDATE":
      return categories.map((categorie) => (categorie._id === action.payload._id ? action.payload : categorie));
    case "DELETE":
      return categories.filter((categorie) => categorie._id !== action.payload);

    default:
      console.log("reducer default" + JSON.stringify(action, null, 4));
      return categories;
      break;
  }
};
