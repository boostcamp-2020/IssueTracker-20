export default (sequelize) => {
  const Assignee = sequelize.define(
    'Assignee',
    {},
    {
      tableName: 'Assignee',
    },
  );

  Assignee.associate = (models) => {
    Assignee.belongsTo(models.User, {
      as: 'assigneeId',
      foreignKey: 'id',
    });
    Assignee.belongsTo(models.Issue, {
      as: 'issueId',
      foreignKey: 'id',
    });
  };

  return Assignee;
};
