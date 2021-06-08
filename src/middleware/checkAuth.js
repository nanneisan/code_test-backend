//jwt
const jwt = require("jsonwebtoken");

//config
const { secretKey } = require("../config");

const isValid = (req, res, next) => {
  let token = "";
  if (
    req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    token = req.headers["authorization"].split(" ")[1];
  } else {
    token = req.headers["x-access-token"] || req.headers["x_access_token"];
  }
  if (token && token !== "null") {
    try {
      const decoded = jwt.verify(token, secretKey);
      if (decoded) {
        next();
      } else
        return res.status(200).json({
          meta: {
            success: false,
            code: 403,
            message: "You don't have permission.",
          },
        });
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        meta: { success: false, code: 403, message: err.message },
      });
    }
  } else {
    return res.status(200).json({
      meta: {
        success: false,
        code: 401,
        message: "Access denied. No token provided.",
      },
    });
  }
};

module.exports = {
  isValid,
};
