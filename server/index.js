import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/voice", async (req, res) => {

  const { text } = req.body;

  try {

    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID",
      {
        text: text
      },
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        responseType: "arraybuffer"
      }
    );

    res.set({
      "Content-Type": "audio/mpeg"
    });

    res.send(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "ElevenLabs failed" });
  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});