import React, { useState } from "react";
import axios from "axios";

const FAQCreate = () => {
  const [faq, setFAQ] = useState({
    question: "",
    answer: "",
    language: "en",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!faq.question || !faq.answer) {
      alert("Question and Answer are required.");
      return;
    }

    const faqData = {
      question: faq.question,
      answer: faq.answer,
      language: faq.language,
    };

    setIsSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_API_KEY}/api/faqs`,
        faqData
      );
      alert("FAQ Created Successfully!");
      setFAQ({ question: "", answer: "", language: "en" });
    } catch (error) {
      console.error("FAQ Creation Failed", error.response?.data || error);
      alert("Failed to create FAQ: " + (error.response?.data?.error || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      
      <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
        Create a new FAQ
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div>
          <label className="block text-gray-800 font-medium mb-1">Question</label>
          <input
            type="text"
            value={faq.question}
            onChange={(e) => setFAQ({ ...faq, question: e.target.value })}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg p-2 text-gray-900"
            placeholder="Enter the question"
            required
          />
        </div>

        
        <div>
          <label className="block text-gray-800 font-medium mb-1">Answer</label>
          <textarea
            value={faq.answer}
            onChange={(e) => setFAQ({ ...faq, answer: e.target.value })}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg p-2 text-gray-900"
            rows="4"
            placeholder="Enter the answer"
            required
          />
        </div>

        
        <div>
          <label className="block text-gray-800 font-medium mb-1">Language</label>
          <select
            value={faq.language}
            onChange={(e) => setFAQ({ ...faq, language: e.target.value })}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg p-2 text-gray-900"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
           
          </select>
        </div>

        
        <button
          type="submit"
          className={`w-full text-white py-2 rounded-lg text-lg font-semibold transition 
            ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating FAQ..." : "Create FAQ"}
        </button>
      </form>
    </div>
  );
};

export default FAQCreate;
