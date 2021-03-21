export default (avatars = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
      break;
    case "CREATE":
      console.log("reducer categories" + JSON.stringify(avatars, null, 4));
      console.log("reducer action" + JSON.stringify(action, null, 4));

      return [...avatars, action.payload];
      break;
    case "UPDATE":
      return avatars.map((avatar) => (avatar._id === action.payload._id ? action.payload : avatar));
    case "DELETE":
      return avatars.filter((avatar) => avatar._id !== action.payload);

    default:
      console.log("reducer default" + JSON.stringify(action, null, 4));
      return avatars;
      break;
  }
};
