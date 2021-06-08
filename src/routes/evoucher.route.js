const evoucher = require("../controllers/evoucher.controller.js");

var router = require("express").Router();

// Retrieve all evoucher
router.get("/", evoucher.findAll);

// create new evoucher
router.post("/create", evoucher.create);

// Retrieve evoucher detail
router.get("/detail", evoucher.findOne);

// delete evoucher
router.delete("/delete", evoucher.delete);

// update evoucher
router.put("/update", evoucher.update);

// change actiove status
router.get("/inactive", evoucher.inactive);

module.exports = router;
