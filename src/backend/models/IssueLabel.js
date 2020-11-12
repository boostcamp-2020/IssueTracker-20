export default (sequelize) => {
  const IssueLabel = sequelize.define(
    'IssueLabel',
    {},
    {
      tableName: 'IssueLabel',
    },
  );

  return IssueLabel;
};
