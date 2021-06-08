const { isValid } = require("../middleware/checkAuth");

const user = require("./user_auth.route");
const evoucher = require("./evoucher.route");
const payment_method = require("./paymentmethod.route");
const history = require("./purchase_history.route");

module.exports = (app) => {
  app.use("/user", user);
  app.use("/evoucher", isValid, evoucher);
  app.use("/payment", isValid, payment_method);
  app.use("/history", isValid, history);
};
