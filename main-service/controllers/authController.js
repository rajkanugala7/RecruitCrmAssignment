const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { createSecretToken } = require('../util/SecretToken');
require("dotenv").config();

const generateApiKey = () => {
  return crypto.randomBytes(20).toString('hex');
};

const register = async (req, res) => {
    const { first_name, last_name, email, password_hash } = { ...req.body };
  const api_key = generateApiKey();

  const user = new User({ first_name, last_name, email, password_hash, api_key });
  await user.save();

  res.status(201).json({ message: 'User registered successfully', api_key });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password_hash)) {
      const token = createSecretToken(user._id);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid Username or password' });
  }
};

const verifyApiKey = async (req, res) => {
  const { api_key } = req.query;
  const user = await User.findOne({ api_key });
  if (!user) {
    return res.status(403).json({ message: 'Invalid API key' });
  }
  res.json({ user: { id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, api_key: user.api_key } });
};


module.exports = { login, register, verifyApiKey };