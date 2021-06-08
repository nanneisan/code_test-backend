const payment_method = require("../controllers/paymentmethod.controller.js");

var router = require("express").Router();

// Retrieve all payment_method
router.get("/", payment_method.findAll);

module.exports = router;
