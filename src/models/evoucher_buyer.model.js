module.exports = (sequelize, Sequelize) => {
  const EvoucherBuyer = sequelize.define(
    "evoucher_buyer",
    {
      code: {
        type: Sequelize.STRING,
      },
      evoucher_id: {
        type: Sequelize.STRING,
      },
      buyer_id: {
        type: Sequelize.STRING,
      },
      evoucher_limit: {
        type: Sequelize.INTEGER,
      },
      used_count: {
        type: Sequelize.INTEGER,
      },
      used_amount: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      freezeTableName: true,
      tableName: "evoucher_buyer",
    }
  );

  return EvoucherBuyer;
};
