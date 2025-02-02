import React, { useState, useEffect } from "react";
import axios from "axios";

const FAQDashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [language, setLanguage] = useState("en");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_API_KEY}/api/faqs?lang=${language}`
        );

        if (Array.isArray(response.data)) {
          setFaqs(response.data);
          setError(null); 
        } else {
          console.error("Expected an array but got:", response.data);
          setError("Invalid data format received from the server.");
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        setError("Failed to fetch FAQs. Please try again later.");
      }
    };

    fetchFAQs();
  }, [language]);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-600">FAQ Dashboard</h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg p-2 text-gray-900"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="pa">Punjabi</option>
        </select>
      </div>

      
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : faqs.length > 0 ? (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {faq.translations?.[language]?.question || faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.translations?.[language]?.answer || faq.answer}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No FAQs available</p>
      )}
    </div>
  );
};

export default FAQDashboard;
