const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: { type: String, required: [true, "Question is required"] },
  answer: { type: String, required: [true, "Answer is required"] },
  translations: {
    hi: { question: String, answer: String },
    bn: { question: String, answer: String },
  },
});

// Method to get translated FAQ with fallback
faqSchema.methods.getTranslatedFAQ = function (lang) {
  return this.translations[lang] || { question: this.question, answer: this.answer };
};

const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;
