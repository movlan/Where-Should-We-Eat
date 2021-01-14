const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    // Get token form request header and strip out 'Bearer ' part
    const token = req.header("Authorization").replace("Bearer ", "");

    // Decode user information form token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Search user by id and token provided
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    // if user not found throw error
    if (!user) {
      throw new Error();
    }

    // if user found add token and user to request
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ Error: "Please authenticate!" });
  }
};

module.exports = auth;
