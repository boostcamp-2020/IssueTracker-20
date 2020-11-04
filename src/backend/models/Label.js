export default (sequelize, DataTypes) => {
  const Label = sequelize.define('Label', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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

  Label.associate = (models) => {
    Label.belongsToMany(models.Issue, {
      through: 'IssueLabel',
      as: 'issues',
      foreignKey: 'labelId',
    });
  };

  return Label;
};
