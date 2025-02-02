const FAQ = require("../models/faq");
const { translateText } = require("../services/translationService");
const { cacheFAQ, getCachedFAQ } = require("../services/cacheService");

exports.getFAQs = async (req, res, next) => {
  try {
    const lang = req.query.lang || "en";

    let faqs = await getCachedFAQ(lang);
    if (!faqs) {
      faqs = await FAQ.find();
      if (!faqs.length) throw { status: 404, message: "No FAQs found" };

      cacheFAQ(lang, faqs);
    }

    const translatedFAQs = faqs.map((faq) => faq.getTranslatedFAQ(lang));
    res.status(200).json({ success: true, data: translatedFAQs });
  } catch (error) {
    next(error);
  }
};

exports.createFAQ = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) throw { status: 400, message: "Question and Answer are required" };

    const translations = {
      hi: {
        question: await translateText(question, "hi"),
        answer: await translateText(answer, "hi"),
      },
      bn: {
        question: await translateText(question, "bn"),
        answer: await translateText(answer, "bn"),
      },
    };

    const newFAQ = await FAQ.create({ question, answer, translations });
    res.status(201).json({ success: true, data: newFAQ });
  } catch (error) {
    next(error);
  }
};
