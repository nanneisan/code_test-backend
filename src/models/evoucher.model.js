module.exports = (sequelize, Sequelize) => {
  const Evoucher = sequelize.define(
    "evoucher",
    {
      evoucher_code: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.INTEGER,
      },
      expiry_date: {
        type: Sequelize.DATE,
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      payment_method: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.INTEGER,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      freezeTableName: true,
      tableName: "evoucher",
    }
  );

  return Evoucher;
};
