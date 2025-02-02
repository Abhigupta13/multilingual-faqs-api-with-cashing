const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });

const translateText = async (text, targetLang) => {
  try {
    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error(`[Translation Error]: ${error.message}`);
    return text; 
  }
};

module.exports = translateText;
