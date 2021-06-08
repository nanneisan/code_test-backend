module.exports = (sequelize, Sequelize) => {
  const PurchaseHistory = sequelize.define(
    "purchase_history",
    {
      evoucher_buyer_id: {
        type: Sequelize.STRING,
      },
      promo_code: {
        type: Sequelize.STRING,
      },
      isused_promocode: {
        type: Sequelize.BOOLEAN,
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      freezeTableName: true,
      tableName: "purchase_history",
    }
  );

  return PurchaseHistory;
};
