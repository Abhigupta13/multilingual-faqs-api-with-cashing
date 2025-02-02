const { createClient } = require("redis");
require('dotenv').config();
const connectRedis=async()=>{
    try {
      const client = createClient({
        username: 'default',
        password: process.env.REDIS_PASS,
        socket: {
            host: process.env.REDIS_HOST,
            port: 17163
        }
    });
    
    client.on('error', err => console.log('Redis Client Error', err));
    
    await client.connect();
    console.log(`Redis cloud server is connected Successfully`);
    // await client.set('foo', 'bar');
    // const result = await client.get('foo');
    // console.log(result)  // >>> bar
    
    } catch (error) {
        console.log(error);
    }
    
}

module.exports= connectRedis