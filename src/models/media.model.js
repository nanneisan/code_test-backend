module.exports = (sequelize, Sequelize) => {
  const Media = sequelize.define(
    "media",
    {
      image: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      tableName: "media",
    }
  );

  return Media;
};
