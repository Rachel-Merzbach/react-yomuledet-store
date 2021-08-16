const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yomuledet4us@gmail.com',
    pass: '0556787923'
  }
});


//sign in to app
exports.signin = (req, res) => {
  //check if user exists
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "עדיין לא נרשמת" });
      }

      //check if password match email
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "המייל לא מתאים לסיסמה"
        });
      }

      //update the token
      var token = jwt.sign({
        id: user._id,
        name: user.name
      }, config.secret, {
        expiresIn: 43200 // 12 hours
      });

      //return user details
      res.status(200).send({
        id: user._id,
        name: user.name,
        password: user.password,
        email: user.email,
        phone: user.phone,
        role: user.role,
        accessToken: token
      });
    });
};

//sign up to app
exports.signup = (req, res) => {
  //check if user is not exist
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        return res.status(404).send({ message: "נרשמת כבר עם כתובת אימייל זו" });
      }

      if (!req.body) {
        return res.status(400).send({
          message: "user content must be full"
        });
      }

      //create a user Schema
      const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 8),
        role: "customer"
      });
      
      //save the new user
      newuser.save((err) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }
        res.status(200).send({ message: ""});
        return;
      });

      //send an email after successful sign-up
      var mailOptions = {
        from: "yomuledet4us@gmail.com",
        to: req.body.email,
        subject: 'email from YOMULEDET',
        text: 'Hi ' + req.body.name + ', \nwelcome to our site!'
      };

      // transporter.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });
    })
};
