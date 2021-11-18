const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/create", controller.create);
  app.get("/api/user/all", controller.findAll);
  app.get("/api/user/find", controller.findOne);
  app.put("/api/user/update", controller.update);

};

