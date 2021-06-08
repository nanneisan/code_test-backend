const db = require("../models");
const User = db.user;
const auth = require("../utils/auth");

// Retrieve all Evouchers from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Get user token
exports.getToken = (req, res) => {
  const body = req.body;

  // check user is exist or not
  User.findAll({
    where: body,
  }).then((list) => {
    if (list.length > 0) {
      const token = auth.getToken(body); // generate token
      res.status(200).send({ token });
    } else {
      res.status(404).send({ message: "User is not found!" });
    }
  });
};
