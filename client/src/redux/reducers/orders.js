export default (orders = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
      break;
    case "CREATE":
      return [...orders, action.payload];
      break;
    case "UPDATE":
      return orders.map(order =>
        order._id === action.payload._id ? action.payload : order
      );
    case "DELETE":
      return orders.filter(order => order._id !== action.payload);

    default:
      return orders;
      break;
  }
};
