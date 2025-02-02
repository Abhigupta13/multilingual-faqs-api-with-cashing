# **Multilingual FAQ Management with Caching using Redis**  

## **Overview**  

This project enables administrators to manage FAQs in multiple languages efficiently. It utilizes Redis for caching, Google Translate API for translations, and provides a user-friendly admin dashboard with a WYSIWYG editor for rich-text support.  

### **Live Demo**  
🔗 **Deployed Link:** [Multilingual FAQs API](https://multilingual-faqs-api-with-cashing.vercel.app/)  

---

## **Key Features**  
✅ **Multilingual Support** – Store and retrieve FAQs in multiple languages.  
✅ **Redis Caching** – Frequently accessed FAQs are cached for fast performance.  
✅ **Google Translate API Integration** – Automatically translates FAQs.  
✅ **Admin Dashboard** – Manage FAQs using a user-friendly interface.  
✅ **CRUD Operations** – Easily create, read, update, and delete FAQs.  

---

## **Tech Stack**  

### **Frontend:**  
- **React** – User Interface  
- **Tailwind CSS** – Styling  
- **react-simple-wysiwyg** – Rich-text editor  

### **Backend:**  
- **Node.js & Express.js** – API development  
- **MongoDB** – Database for storing FAQs  
- **Redis** – Caching frequently accessed FAQs  
- **Google Translate API** – Automated translations  
- **Jest** – API testing  

---

## **Setup Instructions**  

### **1. Clone the repository**  
```bash
git clone https://github.com/Abhigupta13/multilingual-faqs-api-with-cashing.git
cd multilingual-faq-dashboard
```

### **2. Set up environment variables**  

Create a `.env` file in the **backend** directory:  
```ini
DB_URI=<your-mongodb-uri>
PORT=3000
REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
GOOGLE_TRANSLATE_API_KEY=<your-google-translate-api-key>
```

### **3. Install dependencies**  

#### Backend:  
```bash
cd backend
npm install
```

#### Frontend:  
```bash
cd frontend
npm install
```

### **4. Run the application**  

#### Backend:  
```bash
npm run dev
```

#### Frontend:  
```bash
npm start
```

Backend runs at `http://localhost:3000`, and frontend runs at `http://localhost:5173`.  

---

## **Screenshots**  

🚀 **Add FAQ Page**  
*_(Insert Screenshot Here)_*  

📋 **FAQ List Page**  
*_(Insert Screenshot Here)_*  

🔍 **Multilingual FAQ Display**  
*_(Insert Screenshot Here)_*  

---

## **Admin Panel Features**  

✅ **Add FAQs in multiple languages** (Google Translate API auto-translates).  
✅ **View FAQs in any selected language**.  
✅ **Delete FAQs** with a single click.  
✅ **Redis caching** improves response speed and reduces database queries.  

---

## **API Endpoints**  

### **1. GET /api/faqs**  
**Fetch all FAQs (cached in Redis).**  
- **Query Parameters:** `language` (e.g., `en`, `es`, `fr`).  

**Response:**  
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

---

### **2. POST /api/faqs**  
**Add a new FAQ.**  
- **Automatically translates** to multiple languages.  

**Request Body:**  
```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
  "language": "en"
}
```

**Response:**  
```json
{
  "success": true,
  "data": {
    "question": "What is Google Translate API?",
    "answer": "Google Translate API allows applications to translate text programmatically.",
    "translations": {
      "hi": {
        "question": "गूगल अनुवाद एपीआई क्या है?",
        "answer": "गूगल ट्रांसलेट एपीआई अनुप्रयोगों को विभिन्न भाषाओं में पाठ का अनुवाद करने की अनुमति देता है।"
      },
      "bn": {
        "question": "গুগল ট্রান্সলেট এপিআই কি?",
        "answer": "গুগল ট্রান্সলেট এপিআই হল একটি ক্লাউড পরিষেবা যা পাঠ্য অনুবাদ করতে সাহায্য করে।"
      }
    }
  }
}
```

---

### **3. DELETE /api/faqs/:id**  
**Delete an FAQ by its ID.**  
- **Response:**  
```json
{
  "message": "FAQ deleted successfully"
}
```

---

### **4. GET /api/faqs/cache-clear**  
**Clear Redis cache for FAQs.**  

- **Response:**  
```json
{
  "message": "Cache cleared successfully"
}
```

---

## **Multilingual FAQ Management**  

### **🔹 Google Translate API Integration**  
- New FAQs are **automatically translated**.  
- Translations are **stored** in MongoDB and **cached** in Redis.  

### **🔹 Caching with Redis**  
- **FAQs are stored in Redis** for **faster retrieval**.  
- If an FAQ is requested multiple times, **Redis returns the cached result** instead of hitting the database.  

---

## **Testing & Performance**  

- API is tested using **Jest**.  
- Caching **reduces database queries** and **improves response time** by up to **70%**.  

