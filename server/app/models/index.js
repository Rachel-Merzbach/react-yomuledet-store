const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require("./user.model");
db.Product = require("./product.model");
db.Order = require("./order.model");

module.exports = db;
