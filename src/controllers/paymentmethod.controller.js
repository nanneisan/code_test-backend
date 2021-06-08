const db = require("../models");
const PaymentMethod = db.payment_method;
const Op = db.Sequelize.Op;

// Create and Save a new Evoucher
exports.create = (req, res) => {};

// Retrieve all payment method from the database.
exports.findAll = (req, res) => {
  PaymentMethod.findAll()
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payment lists.",
      });
    });
};

// Find a single Evoucher with an id
exports.findOne = (req, res) => {};

// Update a Evoucher by the id in the request
exports.update = (req, res) => {};

// Delete a Evoucher with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Evouchers from the database.
exports.deleteAll = (req, res) => {};

// Find all published Evouchers
exports.findAllPublished = (req, res) => {};
