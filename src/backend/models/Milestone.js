export default (sequelize, DataTypes) => {
  const MileStone = sequelize.define('Milestone', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
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
    tableName: 'Milestone',
  });

  MileStone.associate = (models) => {
    MileStone.hasMany(models.Issue, {
      as: 'issues',
      foreignKey: 'milestoneId',
    });
  };

  return MileStone;
};
