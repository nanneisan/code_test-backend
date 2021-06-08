const history = require("../controllers/purchase_history.controller.js");

var router = require("express").Router();

// Retrieve all history
router.get("/", history.getHistory);

// Get Token by history
router.post("/checkout", history.checkout);

module.exports = router;
