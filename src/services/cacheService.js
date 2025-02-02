
const cacheFAQ = async (lang, faqs) => {
  try {
    await client.setEx(`faqs_${lang}`, 3600, JSON.stringify(faqs));
    console.log(`[Cache Success]: FAQs cached for language ${lang}`);
  } catch (error) {
    console.error(`[Cache Error]: ${error.message}`);
  }
};

const getCachedFAQ = async (lang) => {
  try {
    const data = await client.get(`faqs_${lang}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`[Cache Fetch Error]: ${error.message}`);
    return null;
  }
};

module.exports = { cacheFAQ, getCachedFAQ };
