const axios = require("axios");

exports.translateText = async (text, targetLang) => {
  try {
    if (!text) throw new Error("Translation text is empty");

    const response = await axios.post(
      "https://translation.googleapis.com/language/translate/v2",
      {
        q: text,
        target: targetLang,
        key: process.env.GOOGLE_TRANSLATE_API_KEY,
      }
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error(`[Translation Error]: ${error.message}`);
    return text; // Fallback to original text
  }
};
