import { useState } from "react";
import axios from "axios";

function App() {

  const [transcript, setTranscript] = useState("");

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    console.log("Listening started...");

    recognition.start();

    recognition.onresult = async (event) => {

      const speechText = event.results[0][0].transcript;

      console.log("Speech detected:", speechText);

      setTranscript(speechText);

      try {

        const response = await axios.post(
          "http://localhost:5000/voice",
          { text: speechText },
          { responseType: "blob" }
        );

        const audioURL = URL.createObjectURL(response.data);
        const audio = new Audio(audioURL);
        audio.play();

      } catch (error) {
        console.error("Backend error:", error);
      }

    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>AI Voice Assistant</h1>

      <button onClick={startListening}>
        🎤 Start Speaking
      </button>

      <p>User said: {transcript}</p>
    </div>
  );
}

export default App;