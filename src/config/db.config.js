const env = process.env;

const config = {
  HOST: env.DB_HOST || "localhost",
  USER: env.DB_USER || "root",
  PASSWORD: env.DB_PASSWORD || "",
  DB: env.DB_NAME || "evoucher_ms",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
