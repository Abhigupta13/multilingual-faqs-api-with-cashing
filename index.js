const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const faqRoutes = require("./src/routes/faqRoutes");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");
const {connectRedis} = require("./src/config/redis");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/faqs", faqRoutes);

// Error Handling Middleware
app.use(errorHandler);


// Start Server
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  await connectDB(); 
  const redisClient = await connectRedis();

  // Attach Redis client to app for caching
  app.locals.redis = redisClient;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();

module.exports = app;
