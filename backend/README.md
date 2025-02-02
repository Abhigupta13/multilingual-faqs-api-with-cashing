
# Multilingual FAQ Management with Caching using Redis

## Overview

This project allows administrators to manage FAQs in multiple languages with caching support using Redis. The FAQ system is designed to:

- **Store FAQs** in multiple languages.
- Use **Redis** for caching to improve the performance of frequently accessed FAQ data.
- Use **Google Translate API** for translation between languages.
- Allow the admin to **add, view, delete, and update** FAQ entries.
- Implement **rich-text** editing for FAQ answers using a WYSIWYG editor.

### Key Features:
- **Multilingual support**: Store FAQs in multiple languages.
- **Caching with Redis**: Frequently accessed data is cached in Redis for fast retrieval.
- **Google Translate API integration**: Automatically translate FAQs into multiple languages.
- **Admin dashboard** for managing FAQs with WYSIWYG text editor support.
- **Backend API** with CRUD operations for FAQ management.

## Tech Stack

- **Frontend**:  
  - React (for building the user interface)
  - Tailwind CSS (for styling)
  - `react-simple-wysiwyg` (for the rich text editor)

- **Backend**:  
  - Node.js with Express (for the API)
  - MongoDB (for storing FAQ data)
  - Redis (for caching FAQ data)
  - Google Translate API (for language translation)
  - Jest (for API testing)


## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/Abhigupta13/multilingual-faqs-api-with-cashing.git
cd multilingual-faq-dashboard
```

###  Set Up Environment Variables:

For the backend, create a `.env` file and add your environment variables:

```bash
DB_URI=<your-database-uri>
PORT=3000
REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
GOOGLE_TRANSLATE_API_KEY=<your-google-translate-api-key>
```

###  Run the Application:

- **Backend**: In the backend directory, run:

    ```bash
    npm run dev
    ```

- **Frontend**: In the frontend directory, run:

    ```bash
    npm start
    ```

This will launch the frontend application on `http://localhost:3000` and the backend API on `http://localhost:3000/api/faqs`.

---

## Admin Panel Features

### **1. Add FAQ in Multiple Languages**

- The admin can add new FAQs and choose the language of the FAQ.
- The WYSIWYG editor allows rich-text formatting for both the question and answer fields.
- After the FAQ is added, the backend will automatically translate the content to other languages using Google Translate API.
- The translated FAQs are stored in the database and cached in Redis for faster retrieval.

### **2. View FAQ List in Multiple Languages**

- The FAQ list can be viewed in the selected language.
- FAQs that are already translated are cached in Redis for faster retrieval, reducing the need to hit the database frequently.

### **3. Delete FAQ**

- The admin can delete any FAQ by clicking the trash icon next to it.
- This sends a delete request to the backend, and the list is updated after the FAQ is successfully deleted.

### **4. Cache Management with Redis**

- Frequently accessed FAQs are cached in Redis. If the same FAQ is requested multiple times, Redis will return the cached result instead of querying the database.

---

## API Endpoints

### 1. **GET /api/faqs**
- **Description**: Fetch all FAQs from the database (considering language caching in Redis).
- **Query Parameters**: `language` (e.g., `en`, `es`, `fr`).
- **Response**: A list of FAQ objects in the specified language.

    **Sample Response**:
    ```json
    [
      {
        "question": "What is React?",
        "answer": "React is a JavaScript library for building user interfaces.",
        "language": "en"
      },
      {
        "question": "¿Qué es React?",
        "answer": "React es una biblioteca de JavaScript para construir interfaces de usuario.",
        "language": "es"
      }
    ]
    ```

### 2. **POST /api/faqs**
- **Description**: Add a new FAQ. The FAQ will be translated into other languages using the Google Translate API and stored in the database.
- **Request Body**:
    ```json
    {
      "question": "What is Node.js?",
      "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
      "language": "en"
    }
    ```
- **Response**:
    ```json
    {
    "success": true,
    "data": {
        "question": "What is Google Translate API?",
        "answer": "Google Translate API is a cloud service that allows applications to translate text between different languages programmatically.",
        "translations": {
            "hi": {
                "question": "गूगल अनुवाद एपीआई क्या है?",
                "answer": "गूगल ट्रांसलेट एपीआई एक क्लाउड सेवा है जो अनुप्रयोगों को प्रोग्रामेटिक रूप से विभिन्न भाषाओं के बीच पाठ का अनुवाद करने की अनुमति देती है।"
            },
            "bn": {
                "question": "গুগল ট্রান্সলেট এপিআই কি?",
                "answer": "গুগল ট্রান্সলেট এপিআই হল একটি ক্লাউড পরিষেবা যা অ্যাপ্লিকেশনগুলিকে প্রোগ্রামে বিভিন্ন ভাষার মধ্যে পাঠ্য অনুবাদ করতে দেয়।"
            }
        },
        "_id": "679fc7907689a2612ea37193",
        "__v": 0
    }
}
    ```

### 3. **DELETE /api/faqs/:id**
- **Description**: Delete an FAQ by its ID.
- **Sample URL**: `DELETE /api/faqs/1`
- **Response**:
    ```json
    {
      "message": "FAQ deleted successfully"
    }
    ```

### 4. **GET /api/faqs/cache-clear**
- **Description**: Clear the Redis cache for FAQs.
- **Response**:
    ```json
    {
      "message": "Cache cleared successfully"
    }
    ```

---

## Multilingual FAQ Management

### **Google Translate API Integration**

- When a new FAQ is added, it is automatically translated into other languages using the **Google Translate API**. The supported languages can be configured in the backend.
- Translations are stored in the database and cached in Redis to avoid repeated API calls.

### **Caching with Redis**

- Redis is used to cache frequently accessed FAQ data. When an FAQ is requested, the system first checks Redis for the data. If not found, it queries the database, stores the result in Redis, and returns the data to the user.
- Redis helps to significantly speed up the retrieval of FAQs and reduces the load on the database.

---

