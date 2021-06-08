module.exports = (sequelize, Sequelize) => {
  const Buyer = sequelize.define(
    "buyer",
    {
      name: {
        type: Sequelize.STRING,
      },
      phone_no: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      tableName: "buyer",
    }
  );

  return Buyer;
};
