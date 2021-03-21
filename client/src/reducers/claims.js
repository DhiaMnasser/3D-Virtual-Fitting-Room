export default (products = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
      break;
    case "CREATE":
      console.log("reducer products" + JSON.stringify(products, null, 4));
      console.log("reducer action" + JSON.stringify(action, null, 4));

      return [...products, action.payload];
      break;

    default:
      console.log("reducer default" + JSON.stringify(action, null, 4));

      return products;
      break;
  }
};
