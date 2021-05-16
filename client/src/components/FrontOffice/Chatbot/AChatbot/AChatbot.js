import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./CChatbot";
import actionProvider from "./ActionProvider.js";
import messageParser from "./MessageParser.js";


function AChatbot() {
    const [showBot, toggleBot] = useState(false);
  
    const saveMessages = (messages) => {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    };
  
    const loadMessages = () => {
      const messages = JSON.parse(localStorage.getItem("chat_messages"));
      return messages;
    };
  
    return (
      <div className="App">
          {showBot && (
            <Chatbot
              config={config}
              actionProvider={actionProvider}
              messageHistory={loadMessages()}
              messageParser={messageParser}
              saveMessages={saveMessages}
            />
          )}
          <button onClick={() => toggleBot((prev) => !prev)}>Bot</button>
      </div>
    );
  }

export default AChatbot;