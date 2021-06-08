const jwt = require("jsonwebtoken");
const config = require("../config");

const getToken = (user) => {
  const token = jwt.sign({ ...user }, config.secretKey, {
    expiresIn: "24h",
  });

  return token;
};

module.exports = { getToken };
