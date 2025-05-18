const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  totalSolved: Number,
  easy: Number,
  medium: Number,
  hard: Number,

  
  rank: {
    raw: Number,      
    display: String   
  },
  skills: [String], 
 college: String,
department: String,
year: Number,

}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
