const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'missing product name']
    },
    description: {
      type: String,
      required: [true, 'missing product description']
    },
    picture: {
      type: String,
      required: [true, 'missing product picture']
    },
    price: {
      type: String,
      required: [true, 'missing product price']
    },
    sale: {
      type: String,
      required: [true, 'missing product price']
    }
  })
);

module.exports = Product;
