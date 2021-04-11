import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './Speech.css'
function Speech() {
    const [message, setMessage] = useState('')
  const commands = [
    {
            command: 'I would like to order *',
            callback: (food) => setMessage(`Your order is for: ${food}`)
          },
          {
            command: 'The weather is :condition today',
            callback: (condition) => setMessage(`Today, the weather is ${condition}`)
          },
          {
            command: 'My top sports are * and *',
            callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
          },
          {
            command: 'Pass the salt (please)',
            callback: () => setMessage('My pleasure')
          },
          {
            command: ['Hello', 'Hi'],
            callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
            matchInterim: true
          },
          {
            command: 'Beijing',
            callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
            // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2
          },
          {
            command: ['eat', 'sleep', 'leave'],
            callback: (command) => setMessage(`Best matching command: ${command}`),
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2,
            bestMatchOnly: true
          },
          {
            command: 'clear',
            callback: ({ resetTranscript }) => resetTranscript()
          },
          {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      },
    },
    {
      command: "change background colour to *",
      callback: (color) => {
        document.body.style.background = color;
      },
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    ,
    {
      command: "reset background colour",
      callback: () => {
        document.body.style.background = `rgba(0, 0, 0, 0.8)`;
      },
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
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
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <img src={faMicrophone} className="microphone-icon" alt="Micro"/>
        </div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
export default Speech;