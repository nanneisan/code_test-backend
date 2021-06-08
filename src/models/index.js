const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.buyer = require("./buyer.model.js")(sequelize, Sequelize);

db.evoucher = require("./evoucher.model.js")(sequelize, Sequelize);

db.evoucher_buyer = require("./evoucher_buyer.model.js")(sequelize, Sequelize);

db.media = require("./media.model.js")(sequelize, Sequelize);

db.payment_method = require("./payment_method.model.js")(sequelize, Sequelize);

db.purchase_history = require("./purchase_history.model.js")(
  sequelize,
  Sequelize
);

module.exports = db;
