const express = require("express");
const Tesseract = require("tesseract.js");
const multer = require("multer");
const axios = require("axios");

const app = express();
const upload = multer({dest: "uploads/"});

app.post("/recognize", upload.single("image"), async (req, res) => {
  const imagePath = req.file.path;

  try {
    const result = await Tesseract.recognize(imagePath, "amh");
    const text = result.data.text;

    const encodedParams = new URLSearchParams();
    encodedParams.set("voice_code", "am-ET-1");
    encodedParams.set("text", text);
    encodedParams.set("speed", "1.00");
    encodedParams.set("pitch", "1.00");
    encodedParams.set("output_type", "audio_url");

    const options = {
      method: "POST",
      url: "https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "1f70ea6f93msh0111c418a4669d8p10d12ejsn48389d8fb625",
        "X-RapidAPI-Host": "cloudlabs-text-to-speech.p.rapidapi.com",
      },
      data: encodedParams,
    };

    const response = await axios.request(options);
    const audioUrl = response.data.result.audio_url;

    return res.json({audioUrl});
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error recognizing image");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
