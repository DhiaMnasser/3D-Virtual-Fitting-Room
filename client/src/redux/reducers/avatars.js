export default (avatars = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
      break;
    case "CREATE":
      return [...avatars, action.payload];
      break;
    case "UPDATE":
      return avatars.map(avatar =>
        avatar._id === action.payload._id ? action.payload : avatar
      );
    case "DELETE":
      return avatars.filter(avatar => avatar._id !== action.payload);

    default:
      return avatars;
      break;
  }
};
