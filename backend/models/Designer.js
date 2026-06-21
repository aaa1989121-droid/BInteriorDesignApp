import mongoose from 'mongoose';

const designerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    style: { type: String, required: true },
    image: { type: String }, // رابط الصورة الشخصية
    about: { type: String },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    isActive: { type: Boolean, default: true },
    
    // روابط صور أعماله
    works: [{ type: String }], 
    
    // تقييمات منظمة: كل تقييم يحتوي على اسم المستخدم والتعليق
    reviews: [{ 
        user: String,
        comment: String,
        date: { type: Date, default: Date.now }
    }], 
    
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] 
}, { timestamps: true }); // مهم جداً لمعرفة تاريخ إنشاء سجل المصمم

export default mongoose.model('Designer', designerSchema);