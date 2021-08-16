const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    productId:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'},

    
  })
);

module.exports = Order;
