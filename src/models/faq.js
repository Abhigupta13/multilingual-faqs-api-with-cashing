const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    hi: {
      question: String,
      answer: String,
    },
    bn: {
      question: String,
      answer: String,
    },
  },
});

// Instance Method to get translated FAQ
faqSchema.methods.getTranslatedFAQ = function (lang) {
  return {
    _id: this._id,
    question: this.translations?.[lang]?.question || this.question,
    answer: this.translations?.[lang]?.answer || this.answer,
  };
};

const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;
