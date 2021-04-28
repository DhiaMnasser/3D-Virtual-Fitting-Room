export default (messages = [], action) => {
    switch (action.type) {
      case "FETCH_ALL":
        return action.payload;
        break;
      case "CREATE":
        return [...messages, action.payload];
        break;
      case "UPDATE":
        return messages.map(message =>
          message.id === action.payload._id ? action.payload : message
        );
      case "DELETE":
        return messages.filter(message => message.id !== action.payload);
      default:
        return messages;
        break;
    }
  };
  