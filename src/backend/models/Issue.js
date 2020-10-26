module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('issue', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isOpened: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createDate: {
      type: DataTypes.DATETIME,
      allowNull: false,
    },
  },
  {
    tableName: 'issue',
  });

  return Issue;
};
