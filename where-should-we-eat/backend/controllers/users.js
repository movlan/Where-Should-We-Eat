const User = require("../models/user");

async function login(req, res) {
  try {
    req.body.updated = true;
    res.send(req.body);
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  login,
  signup,
};
