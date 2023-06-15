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
    let text = result.data.text;
    console.log(text);
    text = introduceRandomErrors(text, 0.15);
    console.log("after");
    console.log(text);

    const encodedParams = new URLSearchParams();
    encodedParams.set("voice_code", "am-ET-2");
    encodedParams.set("text", text);
    encodedParams.set("speed", "1.00");
    encodedParams.set("pitch", "1.00");
    encodedParams.set("output_type", "audio_url");

    const options = {
      method: "POST",
      url: "https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "86678c00d8mshee0bbf6df3ff384p18dbb1jsne25d983306ac",
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

app.post("/English", upload.single("image"), async (req, res) => {
  const imagePath = req.file.path;

  try {
    const result = await Tesseract.recognize(imagePath, "eng");
    let text = result.data.text;
    text = introduceEnglishRandomErrors(text, 0.05);
    return res.json({englishText: text});
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error recognizing image");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function introduceRandomErrors(text, errorRate) {
  var modifiedText = "";

  for (var i = 0; i < text.length; i++) {
    if (Math.random() < errorRate) {
      // Introduce an error
      modifiedText += getRandomAmharicCharacter();
    } else {
      modifiedText += text.charAt(i);
    }
  }

  return modifiedText;
}

function getRandomAmharicCharacter() {
  var amharicCharacters = [
    "ሀ",
    "ሁ",
    "ሂ",
    "ሃ",
    "ሄ",
    "ህ",
    "ሆ",
    "ለ",
    "ሉ",
    "ሊ",
    "ላ",
    "ሌ",
    "ል",
    "ሎ",
    "ሏ",
    "ሐ",
    "ሑ",
    "ሒ",
    "ሓ",
    "ሔ",
    "ሕ",
    "ሖ",
    "ሗ",
    "መ",
    "ሙ",
    "ሚ",
    "ማ",
    "ሜ",
    "ም",
    "ሞ",
    "ሟ",
    "ሠ",
    "ሡ",
    "ሢ",
    "ሣ",
    "ሤ",
    "ሥ",
    "ሦ",
    "ሧ",
    "ረ",
    "ሩ",
    "ሪ",
    "ራ",
    "ሬ",
    "ር",
    "ሮ",
    "ሯ",
    "ሰ",
    "ሱ",
    "ሲ",
    "ሳ",
    "ሴ",
    "ስ",
    "ሶ",
    "ሷ",
    "ሸ",
    "ሹ",
    "ሺ",
    "ሻ",
    "ሼ",
    "ሽ",
    "ሾ",
    "ሿ",
    "ቀ",
    "ቁ",
    "ቂ",
    "ቃ",
    "ቄ",
    "ቅ",
    "ቆ",
    "ቈ",
    "ቊ",
    "ቋ",
    "ቌ",
    "ቍ",
    "በ",
    "ቡ",
    "ቢ",
    "ባ",
    "ቤ",
    "ብ",
    "ቦ",
    "ቧ",
    "ቨ",
    "ቩ",
    "ቪ",
    "ቫ",
    "ቬ",
    "ቭ",
    "ቮ",
    "ቯ",
    "ተ",
    "ቱ",
    "ቲ",
    "ታ",
    "ቴ",
    "ት",
    "ቶ",
    "ቷ",
    "ቸ",
    "ቹ",
    "ቺ",
    "ቻ",
    "ቼ",
    "ች",
    "ቾ",
    "ቿ",
    "ኀ",
    "ኁ",
    "ኂ",
    "ኃ",
    "ኄ",
    "ኅ",
    "ኆ",
    "ኈ",
    "ኊ",
    "ኋ",
    "ኌ",
    "ኍ",
    "ነ",
    "ኑ",
    "ኒ",
    "ና",
    "ኔ",
    "ን",
    "ኖ",
    "ኗ",
    "ኘ",
    "ኙ",
    "ኚ",
    "ኛ",
    "ኜ",
    "ኝ",
    "ኞ",
    "ኟ",
    "አ",
    "ኡ",
    "ኢ",
    "ኣ",
    "ኤ",
    "እ",
    "ኦ",
    "ኧ",
    "ከ",
    "ኩ",
    "ኪ",
    "ካ",
    "ኬ",
    "ክ",
    "ኮ",
    "ኰ",
    "ኲ",
    "ኳ",
    "ኴ",
    "ኵ",
    "ኸ",
    "ኹ",
    "ኺ",
    "ኻ",
    "ኼ",
    "ኽ",
    "ኾ",
    "ወ",
    "ዉ",
    "ዊ",
    "ዋ",
    "ዌ",
    "ው",
    "ዎ",
    "ዐ",
    "ዑ",
    "ዒ",
    "ዓ",
    "ዔ",
    "ዕ",
    "ዖ",
    "ዘ",
    "ዙ",
    "ዚ",
    "ዛ",
    "ዜ",
    "ዝ",
    "ዞ",
    "ዟ",
    "ዠ",
    "ዡ",
    "ዢ",
    "ዣ",
    "ዤ",
    "ዥ",
    "ዦ",
    "የ",
    "ዩ",
    "ዪ",
    "ያ",
    "ዬ",
    "ይ",
    "ዮ",
    "ደ",
    "ዱ",
    "ዲ",
    "ዳ",
    "ዴ",
    "ድ",
    "ዶ",
    "ዷ",
    "ዸ",
    "ዹ",
    "ዺ",
    "ዻ",
    "ዼ",
    "ዽ",
    "ዾ",
    "ጀ",
    "ጁ",
    "ጂ",
    "ጃ",
    "ጄ",
    "ጅ",
    "ጆ",
    "ገ",
    "ጉ",
    "ጊ",
    "ጋ",
    "ጌ",
    "ግ",
    "ጎ",
    "ጐ",
    "ጒ",
    "ጓ",
    "ጔ",
    "ጕ",
    "ጠ",
    "ጡ",
    "ጢ",
    "ጣ",
    "ጤ",
    "ጥ",
    "ጦ",
    "ጧ",
    "ጨ",
    "ጩ",
    "ጪ",
    "ጫ",
    "ጬ",
    "ጭ",
    "ጮ",
    "ጯ",
    "ጰ",
    "ጱ",
    "ጲ",
    "ጳ",
    "ጴ",
    "ጵ",
    "ጶ",
    "ጷ",
    "ጸ",
    "ጹ",
    "ጺ",
    "ጻ",
    "ጼ",
    "ጽ",
    "ጾ",
    "ጿ",
    "ፀ",
    "ፁ",
    "ፂ",
    "ፃ",
    "ፄ",
    "ፅ",
    "ፆ",
    "ፈ",
    "ፉ",
    "ፊ",
    "ፋ",
    "ፌ",
    "ፍ",
    "ፎ",
    "ፏ",
    "ፐ",
    "ፑ",
    "ፒ",
    "ፓ",
    "ፔ",
    "ፕ",
    "ፖ",
    "ፗ",
  ];
  return amharicCharacters[Math.floor(Math.random() * amharicCharacters.length)];
}

function introduceEnglishRandomErrors(text, errorRate) {
  var modifiedText = "";

  for (var i = 0; i < text.length; i++) {
    if (Math.random() < errorRate) {
      // Introduce an error
      modifiedText += EnglishRandomChar();
    } else {
      modifiedText += text.charAt(i);
    }
  }

  return modifiedText;
}

function EnglishRandomChar() {
  var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return characters.charAt(Math.floor(Math.random() * characters.length));
}
