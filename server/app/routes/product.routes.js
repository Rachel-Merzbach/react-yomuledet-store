const controller = require("../controllers/product.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/product/all", controller.findAll);
  app.post("/api/product/create", controller.create);
  app.get("/api/product/find", controller.findOne);
  app.put("/api/product/update", controller.update);
  app.delete("/api/product/delete", controller.delete);

};
