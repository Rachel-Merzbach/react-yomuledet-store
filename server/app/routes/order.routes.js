const controller = require("../controllers/order.controller");
const { authJwt } = require("../middlewares");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/order/all", controller.findAll);
  app.post("/api/order/create", controller.create);
  app.get("/api/order/find", controller.findOne);
  app.put("/api/order/update", controller.update);
  app.delete("/api/order/delete", controller.delete);

};
