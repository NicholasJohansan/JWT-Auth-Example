const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.default = async function(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.get(decoded.username);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};