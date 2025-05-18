const mongoose = require('mongoose');

const authUserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

module.exports = mongoose.model('AuthUser', authUserSchema);
