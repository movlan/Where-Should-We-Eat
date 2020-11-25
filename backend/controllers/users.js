const User = require("../models/user");

const signup = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findUserByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const logout = async (req, res) => {
  try {
    // we will logout user by removing its current token from user.tokens array
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

const logoutAll = async (req, res) => {
  try {
    // we will logout user by removing its current token from user.tokens array
    req.user.tokens = [];

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

const myProfile = async (req, res) => {
  try {
    // since we pass auth we should have user available in request return it
    res.send(req.user);
  } catch (error) {
    req.send();
  }
};

const update = async (req, res) => {
  // set up which fields can be updated
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "favorites"];
  //get update fields from req.body
  //check if updates are in allowedUpdates
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ Error: "Invalid updates" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  login,
  signup,
  logout,
  logoutAll,
  myProfile,
  getUserById,
  update,
  delete: deleteUser,
};
