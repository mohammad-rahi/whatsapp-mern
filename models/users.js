const mongoose = require("mongoose");

const userFields = new mongoose.Schema({
  displayName: String,
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  bio: String,
  photoURL: String,
});

module.exports = users = mongoose.model("users", userFields);
