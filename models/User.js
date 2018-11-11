const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 50
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 1024,
    required: true
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
};

const User = mongoose.model('user', userSchema);

function userValidation(user) {
  const validationSchema = {
    email: Joi.string()
      .email()
      .min(4)
      .max(50)
      .required(),
    password: Joi.string()
      .min(3)
      .max(1024)
      .required()
  };

  return Joi.validate(user, validationSchema);
}

module.exports = { User, userValidation };
