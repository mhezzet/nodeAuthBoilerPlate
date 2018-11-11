const bycrypt = require('bcrypt');
const express = require('express');
const Router = express.Router();
const { User, userValidation } = require('../models/User');

Router.post('/', async (req, res) => {
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('invalid email or password');

  const validPassword = await bycrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('invalid email or password');

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = Router;
