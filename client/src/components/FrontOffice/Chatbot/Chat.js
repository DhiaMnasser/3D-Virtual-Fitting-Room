import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Messages from "./Messages";
import {  Avatar, Icon } from '@material-ui/core';
import Picker from 'emoji-picker-react';



const Chat = props => {
  const [message, setMessage] = useState('')
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  useEffect(() => {
    handleEventQuery("welcomeTo3DVFR");
  }, [])

  const handleMessageSubmit = message => {
    const data = {
      message
    };

    axios
      .post("http://localhost:5000/chatbot", data)
      .then(response => {
        // for (let content of response.data["message"]["fulfillmentMessages"]) {

        let responseData = {
          text:
            response.data["message"]["fulfillmentText"] != ""
              ? response.data["message"]["fulfillmentText"]
              : "Sorry, I can't get it. Can you please repeat once?",
          isBot: true
        };

        setResponses(responses => [...responses, responseData]);
      // };
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

const handleEventQuery = event => {
  const data = {
    "event" :event
    };

  axios
  .post("http://localhost:5000/chatbot/eventQuery", data)
  .then(response => {
    for (let content of response.data["message"]["fulfillmentMessages"]) {

      let responseData = {
        text:
          response.data["message"]["fulfillmentText"] != ""
            ? content.text.text
            : "Sorry, I can't get it. Can you please repeat once?",
        isBot: true
      };

      setResponses(responses => [...responses, responseData]);
    };
    })
  .catch(error => {
    console.log("Error: ", error);
  });
}

  const handleMessageChange = event => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = event => {
    const message = {
      text: currentMessage,
      isBot: false
    };
    if (event.key == "Enter") {
      setResponses(responses => [...responses, message]);
      handleMessageSubmit(message.text);
      setCurrentMessage("");
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      language:'en-US',
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };


  return (
    <>
    <div className="chatSection">
      <div className="botContainer">
        <div className="messagesContainer">
          <Messages messages={responses} />
        </div>

        {/*The input section is 👇*/}
        <div className="inputSection">
        {isListening && (
          <input
            type="text"
            value={transcript} 
            onChange={handleMessageChange}
            onKeyDown={handleSubmit}
            placeholder="Say something..."
            className="messageInputField"
          /> )}
          {!isListening && (
          <input
            type="text"
            value={currentMessage} 
            onChange={handleMessageChange}
            onKeyDown={handleSubmit}
            placeholder="Say something..."
            className="messageInputField"
            />)}
            
          <div onTap={handleSubmit}>
          <svg  
            style={{ marginRight: "10px" }}
            id="Capa_1"
            enableBackground="new 0 0 512.004 512.004"
            height="25"
            viewBox="0 0 512.004 512.004"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67-7.717-5.727-203.749-151.217-214.37-159.1l-142.1-54.96c-5.79-2.24-9.6-7.81-9.59-14.02.01-6.21 3.85-11.77 9.65-13.98l482-184c5.824-2.232 12.488-.626 16.67 4.17 3.37 3.87 4.55 9.24 3.03 14.22z"
                  fill="#94dfda"
                />
                <path
                  d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67l-190.05-141.05 332.31-280.84c3.37 3.87 4.55 9.24 3.03 14.22z"
                  fill="#61a7c5"
                />
                <path
                  d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59v-175.3c0-4.86 2.35-9.41 6.31-12.23l337-239.69c6.29-4.48 14.95-3.45 20.01 2.38 5.07 5.83 4.88 14.56-.43 20.16z"
                  fill="#eef4ff"
                />
                <path
                  d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59l31.01-144 332.31-280.84c5.07 5.83 4.88 14.56-.43 20.16z"
                  fill="#d9e6fc"
                />
              </g>
            </svg>
            {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
          )}
         {transcript && (
         <div className="microphone-result-container">
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
          </div>
         )}
            <svg  
            className="microphone-icon-container"
            circle cx='50' cy='25' r='20'
            ref={microphoneRef}
            onClick={handleListing}
            style={{ marginRight: "10px" }}
            id="Capa_1"
            enableBackground="new 0 0 512.004 512.004"
            height="25"
            viewBox="0 0 512.004 512.004"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67-7.717-5.727-203.749-151.217-214.37-159.1l-142.1-54.96c-5.79-2.24-9.6-7.81-9.59-14.02.01-6.21 3.85-11.77 9.65-13.98l482-184c5.824-2.232 12.488-.626 16.67 4.17 3.37 3.87 4.55 9.24 3.03 14.22z"
                  fill="#94dfda"
                />
                <path
                  d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67l-190.05-141.05 332.31-280.84c3.37 3.87 4.55 9.24 3.03 14.22z"
                  fill="#61a7c5"
                />
                <path
                  d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59v-175.3c0-4.86 2.35-9.41 6.31-12.23l337-239.69c6.29-4.48 14.95-3.45 20.01 2.38 5.07 5.83 4.88 14.56-.43 20.16z"
                  fill="#eef4ff"
                />
                <path
                  d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59l31.01-144 332.31-280.84c5.07 5.83 4.88 14.56-.43 20.16z"
                  fill="#d9e6fc"
                />
              </g>
            </svg>
            {/* <div>
            {chosenEmoji ? (
            <span>You chose: </span>
             ) : (
            <span>No emoji Chosen</span>
             )}
            <Picker onEmojiClick={onEmojiClick} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Chat;
