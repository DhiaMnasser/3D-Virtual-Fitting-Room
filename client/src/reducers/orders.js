export default (orders = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
      break;
    case "CREATE":
      console.log("reducer products" + JSON.stringify(orders, null, 4));
      console.log("reducer action" + JSON.stringify(action, null, 4));

      return [...orders, action.payload];
      break;
    case "UPDATE":
      return orders.map((order) => (order._id === action.payload._id ? action.payload : order));
    case "DELETE":
      return orders.filter((order) => order._id !== action.payload);

    default:
      console.log("reducer default" + JSON.stringify(action, null, 4));
      return orders;
      break;
  }
};
