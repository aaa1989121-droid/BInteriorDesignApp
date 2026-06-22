/**
 * Main Server Entry Point - Interior Design API
 * Developed by: [اسمك هنا]
 * Purpose: Full Stack Backend with MongoDB Atlas, JWT Auth, and Logger Middleware
 */

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'; // حماية إضافية لهيدرات الأمان

// استيراد المسارات (Routes)
import authRoutes from './routes/authRoutes.js';
import designerRoutes from './routes/designerRoutes.js';
import messageRoutes from './routes/messageRoutes.js';  

// استيراد الميدل وير (Middleware)
import { errorHandler } from './middleware/errorHandler.js';

// تهيئة المتغيرات البيئية
dotenv.config();

const app = express();

// 1. الأمان الأساسي: استخدام Helmet
app.use(helmet()); 

// 2. Logger Middleware (شرط أساسي للمحاضر)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// 3. إعدادات الـ Middleware
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); 

// 4. ربط المسارات (Routes)
app.use('/api/auth', authRoutes);
app.use('/api/designers', designerRoutes); 
app.use('/api/messages', messageRoutes);    
// فحص المسار الرئيسي
app.get('/', (req, res) => {
    res.send('Interior Design API is active and secure!');
});

// 5. ربط معالج الأخطاء (يجب أن يكون دائماً بعد المسارات)
app.use(errorHandler);

// 6. الاتصال بقاعدة البيانات (MongoDB Atlas)
const DB_URI = process.env.MONGO_URI;

// التحقق من وجود المتغير في ملف .env
if (!DB_URI) {
    console.error('❌ FATAL ERROR: MONGO_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(DB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
  .catch((err) => {
      console.error('❌ Error connecting to MongoDB:', err.message);
      process.exit(1); 
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));