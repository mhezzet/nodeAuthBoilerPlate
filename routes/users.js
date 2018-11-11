const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();
const { User, userValidation } = require('../models/User');
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  //validate the request body
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //validate email uniqueness
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('user is already exist');

  //create a new user instance
  user = new User({ ...req.body });

  //hashing password before saving
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  //saving user to database
  await user.save();
  //generating jwt for newuser
  const token = user.generateAuthToken();

  //response
  res.header('x-aut-token', token).send(_.pick(user, ['_id', 'email']));
});

module.exports = router;
