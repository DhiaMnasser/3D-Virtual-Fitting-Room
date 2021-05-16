class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      // State represents the chatbot state and is passed 
      // in at initalization. You can use it to read chatbot state
      // inside the messageParser
      this.state = state
    }
  
    parse = (message) => {
      const lowerCase = message.toLowerCase();
  
      if (
        lowerCase.includes("messageparser") ||
        lowerCase.includes("parse") ||
        lowerCase.includes("parser") ||
        lowerCase.includes("message parser")
      ) {
        return this.actionProvider.handleMessageParser();
      }
      return this.actionProvider.handleDefault();
    };
  }
  
  export default MessageParser;