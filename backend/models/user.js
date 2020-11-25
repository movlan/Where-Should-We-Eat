const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      // minlength: 8,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    favorites: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// clean up user before returning it
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// hash plain passwords before saving it to database
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }

  next();
});

// Generate token and save it
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);

  // Add token to user.tokens this will keep them logged
  user.tokens = user.tokens.concat({ token });
  user.save();

  return token;
};

// Check user credentials
userSchema.statics.findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  // See if user not found by id throw error
  if (!user) {
    throw new Error("Unable to login");
  }

  // if user found by email compare passwords
  const passwordMatched = await bcrypt.compare(password, user.password);

  // if no match throw error
  if (!passwordMatched) {
    throw new Error("Unable to login");
  }

  // else return user
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
