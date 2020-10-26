module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define('label', {
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
    tableName: 'label',
  });

  Label.associate = (models) => {
    Label.hasMany(models.transaction);
  };

  return Label;
};
