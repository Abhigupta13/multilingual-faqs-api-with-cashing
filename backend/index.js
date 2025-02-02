import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import faqRoutes from './src/routes/faqRoutes.js';
import {redisClient} from './src/utils/redis.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/faqs', faqRoutes);

app.get('/api', (req, res) => {
    res.send('API is running...');
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

process.on('SIGINT', async () => {
    console.log('Closing connections...');
    try {
        if (redisClient) {
            await redisClient.quit();
            console.log('Redis connection closed');
        }
    } catch (error) {
        console.error('Error during shutdown:', error);
    }
    process.exit(0);
});

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("Server Error: ", error);
            throw error;
        });

        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running at port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed", err);
    });

export default app;
