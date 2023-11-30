const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  firstname: { required: true, type: String },
  lastname: { required: true, type: String },
  username: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  email: { required: true, type: String },
  country: { required: true, type: String },
  state: { required: true, type: String },
  phone: { required: true, type: String },
  image: { required: true, type: String },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    if (!this.password.startsWith('$2b$')) {
      try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
      } catch (error) {
        return next(error);
      }
    } else {
      return next();
    }
  } else {
    return next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
