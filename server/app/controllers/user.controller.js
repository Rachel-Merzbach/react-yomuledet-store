const db = require("../models");
var bcrypt = require("bcryptjs");

const User = db.User;




exports.create = (req, res) => {
  //validate properties are not empty
  if (!req.body.name) {
    return res.status(400).send({
      message: "User can not be empty"
    });
  }

  //create the product Schema
  const user = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    isManager: false
  });

  //save the Schema into db
  user.save()
    .then(data => {
      res.send({_id: data._id});
    }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the city."
      });
    });
  return;
};


//return the whole users in db
exports.findAll = (req, res) => {
  User.find()
    .then(notes => {
      res.send(notes);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "some error occurred while retrieving Users."
      });
    });
};

//return user details by id
exports.findOne = (req, res) => {
  User.findById(req.query.id)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "user not found" });
      }

      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        isManager: user.isManager
      });
    });
};




//update user by id
exports.update = (req, res) => {
  if (!req.body.name || !req.body.phone || !req.body.email) {
    return res.status(400).send({
      message: "חסרים פרטי משתמש"
    });
  }
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      var idCompare = (req.query.id == user._id)
      if (!idCompare) {
        res.status(404).send({ message: "כבר קיים משתמש עם המייל הזה" })
        return;
      }
    }


    User.findByIdAndUpdate(req.query.id, req.body, { new: true })
      .then(note => {
        if (!note) {
          return res.status(404).send({
            message: "משתמש לא נמצא"
          });
        }
        res.send({ message: "" });

      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "משתמש לא נמצא"
          });
        }
      });

  })
};

