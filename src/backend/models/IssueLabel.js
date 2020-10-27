module.exports = (sequelize, DataTypes) => {
  const IssueLabel = sequelize.define('IssueLabel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: 'IssueLabel',
  });

  IssueLabel.associate = (models) => {
    IssueLabel.hasOne(models.Label);
  };

  return IssueLabel;
};
