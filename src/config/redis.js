const { createClient } = require('redis');

require('dotenv').config();
const connectRedis = async () => {
    const client = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });
  
    client.on("error", (err) => console.error(`Redis Error: ${err.message}`));
  
    try {
      await client.connect();
      console.log("Redis Connected");
      return client;
    } catch (err) {
      console.error(`Redis Connection Failed: ${err.message}`);
      process.exit(1);
    }
  };
   
  module.exports= connectRedis;