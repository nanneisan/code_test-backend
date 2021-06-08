const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const http = require("http");

const db = require("./src/models/index");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

const limiter = rateLimit({
  windowMs: 1 * 60 * 10000,
  max: 1000000,
});

app.use(limiter);

db.sequelize.sync();

function normalizePort(val) {
  const _port = parseInt(val, 10);

  if (isNaN(_port)) return val;

  if (_port >= 0) return _port;

  return false;
}

require("./src/routes")(app);

const port = normalizePort(process.env.PORT || 5000);
const server = http.Server(app);

server.listen(port, () => {
  console.log(`App started on port ${port}`);
});
module.exports = app;
