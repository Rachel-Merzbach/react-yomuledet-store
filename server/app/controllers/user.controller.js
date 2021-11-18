const db = require("../models");
var bcrypt = require("bcryptjs");
const User = db.User;


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yomuledet4us@gmail.com',
    pass: ''
}
});




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
      
      //send an email after successful sign-up
      var mailOptions = {
        from: "yomuledet4us@gmail.com",
        to: req.body.email,
        subject: 'יומולדת - לאירועים ברמה! 🎈🎈',
        attachments: [{ filename: "logo.png", path: "./app/controllers/logo192.png", cid:'logo' }, { filename: "border.png", path: "./app/controllers/border.png", cid:'border'}],
        html: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
          <div style="background-color: #dadbdc; width: 500px; dir: 'rtl'; text-align: center; font-family: 'Abir Regular'; margin-right: 25%; margin-left: 5%;">
<p>&nbsp;</p>
<h2>היי ${req.body.name},</h2>
<h3>אנחנו שמחים שאתה פה איתנו! 😀</h3>
<p><strong>אצלנו ב</strong><img style="height: 6vh;" src="cid:logo" /><br />תוכלו להנות ממגוון אטרקציות ופעילויות<br />שנועדו במיוחד עבור מסיבת יומולדת נהדרת עבור הילדים שלכם!<br />כאן תוכלו לקבל עד אליכם הביתה אביזרים ואטרקציות<br />שיהפכו את חגיגת היומולדת שלכם<br />לוואו אמיתי</p>
<p>&nbsp;</p>
<p><img src="cid:logo" height="70" /></p>
<p><span style="color: #0000ff;">יומולדת - לאירועים ברמה!</span></p>
<p>&nbsp;</p>
<div class="footer" style="font-size: smaller; background-color: #ffffff;"><img class="myBorder" src="cid:border" width="500px" height="12" />
<h3>יצירת קשר:</h3>
<p><strong>כתובת מחסן לוגיסטי (לאיסוף הזמנות): </strong><a style="color: black; font-weight: bold;" href="https://www.google.com/maps/place/%D7%94%D7%A1%D7%93%D7%A0%D7%94+86,+%D7%90%D7%95%D7%A8+%D7%99%D7%94%D7%95%D7%93%D7%94%E2%80%AD/@32.0341334,34.8552896,17z/data=!4m5!3m4!1s0x151d4a9741718be1:0x9d952b70643d3ec5!8m2!3d32.0339424!4d34.850526" target="_blank ">הסדנה 86, אור יהודה</a></p>
<p><strong>טלפון: </strong><a style="color: black;" href="tel://0525378635" target="_blank ">0525378635</a></p>
<p><strong>אימייל:  </strong><a style="color: black; font-weight: bold;" href="https://mail.google.com/mail/u/0/?fs=1&amp;tf=cm&amp;to=yomuledet4us@gmail.com#inbox" target="_blank ">yomuledet4us@gmail </a> </p>
</div>
</div>
          </body>
        </html>`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
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

