import mongoose from 'mongoose';

const ThemeSchema = new mongoose.Schema({
  title: String,
  questions: [{
    title: String,
    price: Number,
    answer: String,
  }],
});

export default mongoose.model('Theme', ThemeSchema);
