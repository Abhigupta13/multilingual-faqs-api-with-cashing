const FAQ = require("../models/faq");
const translateText = require("../services/translationService");
const { cacheFAQ, getCachedFAQ } = require("../services/cacheService");

exports.getFAQs = async (req, res, next) => {
  try {
    const lang = req.query.lang || "en";

    let faqs = await getCachedFAQ(lang);
    if(faqs) {
      console.log("FAQs retrived from Redis Cache");
      faqs = faqs.map((faq) => new FAQ(faq));
    }
    if (!faqs) {
      faqs = await FAQ.find();
      if (!faqs.length) throw { status: 404, message: "No FAQs found" };

      await cacheFAQ(lang, faqs);
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
    let faqs = await FAQ.find();
    if (!faqs.length) throw { status: 404, message: "No FAQs found" };

    await cacheFAQ('en', faqs);  
    await cacheFAQ('hi', faqs);  
    await cacheFAQ('bn', faqs); 
    res.status(201).json({ success: true, data: newFAQ });
  } catch (error) {
    next(error);
  }
};

exports.deleteFAQ = async (req, res, next) => {
  try {
    const faqId = req.params.id;
    const deletedFAQ = await FAQ.findByIdAndDelete(faqId);
    if (!deletedFAQ) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }

    const languages = ['en', 'hi', 'bn'];

    for (let lang of languages) {
      const faqs = await getCachedFAQ(lang);

      if (faqs) {
        const faqIndex = faqs.findIndex(faq => faq._id.toString() === faqId);
        if (faqIndex !== -1) {
          faqs.splice(faqIndex, 1);
          await cacheFAQ(lang, faqs);
        }
      }
    }

    res.status(200).json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    next(error);
  }
};


exports.getFAQById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lang = "en" } = req.query; 

    let faq;
    
    let cachedFAQs = await getCachedFAQ(id);
    if (cachedFAQs) {
      faq = cachedFAQs.find((f) => f._id === id);
    }

    if (!faq) {
      faq = await FAQ.findById(id);
      if (!faq) throw { status: 404, message: "FAQ not found" };

      const allFAQs = await FAQ.find();
      await cacheFAQ(lang, allFAQs);
    }

    const translatedFAQ = {
      _id: faq._id,
      question: faq.translations?.[lang]?.question || faq.question,
      answer: faq.translations?.[lang]?.answer || faq.answer,
      createdAt: faq.createdAt,
      updatedAt: faq.updatedAt,
    };

    res.status(200).json({ success: true, data: translatedFAQ });
  } catch (error) {
    next(error);
  }
};

exports.updateFAQ = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    if (!question && !answer) throw { status: 400, message: "Question and Answer are required" };

    let faq = await FAQ.findById(id);
    if (!faq) throw { status: 404, message: "FAQ not found" };

    if (question) faq.question = question;
    if (answer) faq.answer = answer;

    if (question || answer) {
      faq.translations = {
        hi: {
          question: await translateText(question || faq.question, "hi"),
          answer: await translateText(answer || faq.answer, "hi"),
        },
        bn: {
          question: await translateText(question || faq.question, "bn"),
          answer: await translateText(answer || faq.answer, "bn"),
        },
      };
    }

    await faq.save();
    await cacheFAQ("en", await FAQ.find()); 

    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};