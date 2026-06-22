import mongoose from 'mongoose';
import Designer from './models/Designer.js';
import dotenv from 'dotenv';

dotenv.config();

const designersData = [
  {
    name: 'אחמד - עיצוב קלאסי',
    email: 'ahmad@classic.com',
    password: 'designer123',
    style: 'עיצוב קלאסי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=900',
  },
  {
    name: 'עומר - עיצוב מודרני',
    email: 'omer@modern.com',
    password: 'designer123',
    style: 'עיצוב מודרני',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=900',
  },
  {
    name: 'שרה - עיצוב נורדי',
    email: 'sara@nordic.com',
    password: 'designer123',
    style: 'עיצוב נורדי/סקנדינבי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=900',
  },
  {
    name: 'דוד - עיצוב תעשייתי',
    email: 'david@industrial.com',
    password: 'designer123',
    style: 'עיצוב תעשייתי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=900',
  },
  {
    name: 'נועה - עיצוב בוהו-שיק',
    email: 'noa@boho.com',
    password: 'designer123',
    style: 'עיצוב בוהו-שיק',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=900',
  },
  {
    name: 'מריה - עיצוב אקלטי',
    email: 'maria@eclectic.com',
    password: 'designer123',
    style: 'עיצוב אקלטי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=900',
  },
  {
    name: 'ליאור - עיצוב כפרי',
    email: 'lior@rustic.com',
    password: 'designer123',
    style: 'עיצוב כפרי (רוסטיק)',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900',
  },
  {
    name: 'דינה - עיצוב מינימליסטי',
    email: 'dina@minimal.com',
    password: 'designer123',
    style: 'עיצוב מינימליסטי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=900',
  },
  {
    name: 'מיכל - עיצוב אקולוגי',
    email: 'michal@eco.com',
    password: 'designer123',
    style: 'עיצוב אקלטי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=900',
  },
  {
    name: 'איתי - עיצוב יוקרה',
    email: 'itai@luxury.com',
    password: 'designer123',
    style: 'עיצוב קלאסי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=900',
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('🚀 Connected to MongoDB');

    await Designer.deleteMany({});

    for (const designer of designersData) {
      await Designer.create(designer);
    }

    console.log('✅ Designers inserted successfully');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
    process.exit(0);
  }
};

seedDB();