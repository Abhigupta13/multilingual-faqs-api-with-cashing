const { connectRedis, getClient } = require("../config/redis");

const cacheFAQ = async (lang, faqs) => {
  try {
    const client = getClient() || (await connectRedis()); 
    const uniqueFAQs = faqs.filter(
      (faq, index, self) => index === self.findIndex((t) => t._id === faq._id)
    );
    await client.setEx(`faqs_${lang}`, 1800, JSON.stringify(uniqueFAQs));
    console.log(`[Cache Success]: FAQs cached for language ${lang}`);
  } catch (error) {
    console.error(`[Cache Error]: ${error.message}`);
  }
};

const getCachedFAQ = async (lang) => {
  try {
    const client = getClient() || (await connectRedis()); // Ensure Redis client is available
    const data = await client.get(`faqs_${lang}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`[Cache Fetch Error]: ${error.message}`);
    return null;
  }
};


module.exports = { cacheFAQ, getCachedFAQ };
