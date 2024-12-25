import mongoose from 'mongoose';

const pointSchema = new mongoose.Schema({
  x: Number,
  y: Number
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['teacher', 'student'], required: true },
  section: { type: String, required: true },
  passPoints: [pointSchema],
  imageHash: String,
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);