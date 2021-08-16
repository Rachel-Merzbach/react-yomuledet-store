const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    password: {
      type: String,
      required: [true, 'missing password'],
    },
    name: {
      type: String,
      required: [true, 'missing last name']
    },
    email: {
      type: String,
      required: [true, 'missing email address']
    },
    phone: {
      type: String,
      required: [true, 'missing phone']
    },
    isManager: {
      type: Boolean,
      required: [true, 'missing role']
    }
  },
    { timestamps: true })
);

module.exports = User;
