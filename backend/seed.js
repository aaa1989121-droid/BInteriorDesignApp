import mongoose from 'mongoose';
import Designer from './models/Designer.js';
import dotenv from 'dotenv';

dotenv.config();

const designersData = [
  {
    name: 'אחמד - עיצוב קלאסי',
    style: 'עיצוב קלאסי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=900',
  },
  {
    name: 'עומר - עיצוב מודרני',
    style: 'עיצוב מודרני',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=900',
  },
  {
    name: 'שרה - עיצוב נורדי',
    style: 'עיצוב נורדי/סקנדינבי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=900',
  },
  {
    name: 'דוד - עיצוב תעשייתי',
    style: 'עיצוב תעשייתי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=900',
  },
  {
    name: 'נועה - עיצוב בוהו-שיק',
    style: 'עיצוב בוהו-שיק',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=900',
  },
  {
    name: 'מריה - עיצוב אקלטי',
    style: 'עיצוב אקלטי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=900',
  },
  {
    name: 'ליאור - עיצוב כפרי',
    style: 'עיצוב כפרי (רוסטיק)',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900',
  },
  {
    name: 'דינה - עיצוב מינימליסטי',
    style: 'עיצוב מינימליסטי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=900',
  },
  {
    name: 'מיכל - עיצוב אקולוגי',
    style: 'עיצוב אקלטי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=900',
  },
  {
    name: 'איתי - עיצוב יוקרה',
    style: 'עיצוב קלאסי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=900',
  },
  {
    name: 'נופר - עיצוב מודרני',
    style: 'עיצוב מודרני',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=900',
  },
  {
    name: 'יוסי - עיצוב תעשייתי',
    style: 'עיצוב תעשייתי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=900',
  },
  {
    name: 'גלית - עיצוב כפרי',
    style: 'עיצוב כפרי (רוסטיק)',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=900',
  },
  {
    name: 'אורן - עיצוב מינימליסטי',
    style: 'עיצוב מינימליסטי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=900',
  },
  {
    name: 'מאיה - עיצוב בוהו',
    style: 'עיצוב בוהו-שיק',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1606744824163-985d3d668345?q=80&w=900',
  },
  {
    name: 'דני - עיצוב סקנדינבי',
    style: 'עיצוב נורדי/סקנדינבי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=900',
  },
  {
    name: 'טלי - עיצוב רטרו',
    style: 'עיצוב אקלטי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1593696140826-c58b02137a23?q=80&w=900',
  },
  {
    name: 'רון - עיצוב מודרני',
    style: 'עיצוב מודרני',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1507643179773-3e9a5d754ce5?q=80&w=900',
  },
  {
    name: 'ליאת - עיצוב קלאסי',
    style: 'עיצוב קלאסי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=900',
  },
  {
    name: 'יואב - עיצוב תעשייתי',
    style: 'עיצוב תעשייתי',
    rating: 5,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=900',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🚀 Connected to database...');

    await Designer.deleteMany({});
    await Designer.insertMany(designersData);

    console.log('✅ Designers with images seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Connection closed.');
    process.exit(0);
  }
};

seedDB();