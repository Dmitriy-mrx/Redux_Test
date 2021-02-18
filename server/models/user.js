import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Email
  email: {
    type: String,
    required: true,
    minlength: 3,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  // Имя пользователя
  login: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    match: /^[A-Z]\w+$/i,
  },
  // Мы не храним пароль, а только его хэш
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  score: {
    total: Number,
    games: [{
      title: String,
      score: Number,
    }],
  },
});

export default mongoose.model('User', UserSchema);
