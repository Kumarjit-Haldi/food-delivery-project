const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  isverified: {
    type: Boolean,
    default: false
  },
  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
}
});

module.exports = mongoose.model("user", userschema);