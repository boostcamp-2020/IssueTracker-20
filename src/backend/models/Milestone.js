module.exports = (sequelize, DataTypes) => {
  const MileStone = sequelize.define('milestone', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dueDate: {
      type: DataTypes.DATETIME,
      allowNull: true,
    },
    isOpened: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'milestone',
  });

  MileStone.associate = (models) => {
    MileStone.hasMany(models.transaction);
  };

  return MileStone;
};
