export default (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isOpened: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'Issue',
  });

  Issue.associate = (models) => {
    Issue.belongsToMany(models.User, {
      through: 'Assignee',
      as: 'Assignees',
      foreinKey: 'AssigneeId',
    });
    Issue.hasMany(models.Comment);
    Issue.belongsToMany(models.Label, {
      through: 'IssueLabel',
      as: 'IssueLabels',
      foreinKey: 'IssueLabelId',
    });
  };

  return Issue;
};
