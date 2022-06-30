const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// create schema
const schema = new mongoose.Schema({
  firstName: { type: String, required: [true, "Please enter first name"] },
  lastName: { type: String, required: [true, "Please enter first name"] },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: 8,
  },
  company: {
    type: String,
    unique: true,
    required: [true, "Please enter a company name"],
  },
  isSeller: { type: Boolean, required: true },
});

// use pre to hash password before save
schema.pre("save", async function (next) {
  // add salt to password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// create static method to login user
schema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};
const Seller = mongoose.model("seller", schema);
module.exports = Seller;
