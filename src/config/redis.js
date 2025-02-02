const { createClient } = require("redis");
require("dotenv").config();

let client;

const connectRedis = async () => {
  if (!client) {
    client = createClient({
      username: "default",
      password: process.env.REDIS_PASS,
      socket: {
        host: process.env.REDIS_HOST,
        port: 17163,
      },
    });

    client.on("error", (err) => console.error("Redis Client Error:", err));

    await client.connect();
    console.log("Redis cloud server connected successfully");
  }
  return client; 
};

module.exports = { connectRedis, getClient: () => client };
