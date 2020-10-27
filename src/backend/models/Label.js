export default (sequelize, DataTypes) => {
  const Label = sequelize.define('Label', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Label',
  });

  return Label;
};
