import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const designerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    role: { type: String, default: 'designer' },
    style: { type: String, default: '' },
    image: { type: String, default: '' },
    about: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    experience: { type: String, default: '' },
    specialization: { type: String, default: '' },

    rating: { type: Number, default: 0, min: 0, max: 5 },
    isActive: { type: Boolean, default: true },

    gallery: [{ type: String }],
    works: [{ type: String }],

    reviews: [
      {
        user: { type: String, default: '' },
        comment: { type: String, default: '' },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

designerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

designerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Designer = mongoose.model('Designer', designerSchema);

export default Designer;