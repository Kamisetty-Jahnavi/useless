import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['course_completion', 'quiz_master', 'streak', 'engagement'],
    required: true 
  },
  level: { 
    type: String, 
    enum: ['bronze', 'silver', 'gold', 'platinum'],
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  earnedAt: { type: Date, default: Date.now },
  progress: { type: Number, default: 0 },
  requirements: {
    count: Number,
    threshold: Number
  }
});

export const Achievement = mongoose.model('Achievement', achievementSchema);