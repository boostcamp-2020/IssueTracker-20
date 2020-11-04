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
      as: 'assignees',
      foreignKey: 'issueId',
    });
    Issue.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'issueId',
    });
    Issue.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'authorId',
    });
    Issue.belongsTo(models.Milestone, {
      as: 'milestone',
      foreignKey: 'milestoneId',
    });
    Issue.belongsToMany(models.Label, {
      through: 'IssueLabel',
      as: 'labels',
      foreignKey: 'issueId',
    });
  };

  return Issue;
};
