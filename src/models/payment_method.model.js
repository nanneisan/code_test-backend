module.exports = (sequelize, Sequelize) => {
  const PaymentMethod = sequelize.define(
    "payment_method",
    {
      name: {
        type: Sequelize.STRING,
      },
      discount: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      tableName: "payment_method",
    }
  );

  return PaymentMethod;
};
