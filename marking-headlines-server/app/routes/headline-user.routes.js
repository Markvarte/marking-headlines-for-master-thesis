module.exports = app => {
  const user = require("../controllers/headline-user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", user.create);

  // Retrieve all Tutorials
  router.get("/:number", user.findByNumber);

  app.use('/api/headlines', router);
};