const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, 
  },
  email_verified: Boolean,
  name: String,
  nickname: String,
  picture: String,
  sub: {
    type: String,
    required: true, 
  },
  updated_at: Date,
}, { 
  timestamps: { createdAt: 'created_at' },
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
