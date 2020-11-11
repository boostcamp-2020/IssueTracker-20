export default (sequelize) => {
  const IssueLabel = sequelize.define(
    'IssueLabel',
    {},
    {
      tableName: 'IssueLabel',
    },
  );

  IssueLabel.associate = (models) => {
    IssueLabel.belongsTo(models.Issue, {
      as: 'issued',
      foreignKey: 'id',
    });
    IssueLabel.belongsTo(models.Label, {
      as: 'labelId',
      foreignKey: 'id',
    });
  };

  return IssueLabel;
};
