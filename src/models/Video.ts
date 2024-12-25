import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  module: { type: String, required: true },
  chapter: { type: String, required: true },
  section: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  views: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    progress: Number,
    completed: Boolean,
    watchTime: Number,
    lastWatched: Date
  }],
  createdAt: { type: Date, default: Date.now }
});

export const Video = mongoose.model('Video', videoSchema);