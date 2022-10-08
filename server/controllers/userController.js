const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.verify = async function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: "Missing username or password" });
    return;
  }
  res.json({
    valid: await User.verify(req.body.username, req.body.password)
  });
};

exports.register = async function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: "Missing username or password" });
    return;
  }
  const user = await User.get(req.body.username);
  if (user) {
    res.status(400).json({ error: "Username already exists" });
    return;
  }
  await User.create(req.body.username, req.body.password);
  res.json({
    success: true
  });
};

exports.login = async function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: "Missing username or password" });
    return;
  }
  const valid = await User.verify(req.body.username, req.body.password);
  if (!valid) {
    res.status(400).json({ error: "Invalid username or password" });
    return;
  }
  const token = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET, { expiresIn: '5m' });
  res.cookie('jwt', token, { httpOnly: true, maxAge: 1000*60*5 });
  res.json({
    success: true,
    user: {
      username: req.body.username
    }
  });
}

exports.info = async function(req, res) {
  res.json({
    username: req.user.username
  });
}

exports.logout = async function(req, res) {
  res.clearCookie('jwt');
  res.json({
    success: true
  });
}

exports.delete = async function(req, res) {
  await User.delete(req.user.username);
  res.clearCookie('jwt');
  res.json({
    success: true
  });
}