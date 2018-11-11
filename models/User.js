const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const bcrypt = require('bcrypt');

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

//generating auth token for a given user
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
};

//hashing password before saving to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  console.log(this);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

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
