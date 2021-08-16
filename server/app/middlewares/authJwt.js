const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded._id;
    next();
  });
};

isManager = (req, res, next) => {
  User.findById(
    req.userId
).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user || user.role != 'manager') {
      res.status(400).send({ message: "אhis option is for managers only" });
      return;
    }
    next();
  });

}


const authJwt = {
  verifyToken,
  isManager
};

module.exports = authJwt;
