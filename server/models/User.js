
const deta = require("../db").default;
const db = deta.Base("users");

const bcrypt = require("bcrypt");


exports.create = async (username, password) => {
  return await db.put({
    username,
    password: await bcrypt.hash(password, 10)
  }, username);
};

exports.get = async (username) => {
  return await db.get(username);
};

exports.delete = async (username) => {
  return await db.delete(username);
};

exports.verify = async (username, password) => {
  const user = await exports.get(username);
  if (!user) return false;
  return await bcrypt.compare(password, user.password);
};