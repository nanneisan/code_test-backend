const user = require("../controllers/user.controller.js");

var router = require("express").Router();

// Retrieve all user
router.get("/", user.findAll);

// Get Token by user
router.get("/getToken", user.getToken);

module.exports = router;
