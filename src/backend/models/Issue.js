module.exports = (sequelize, DataTypes) => {
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
    Issue.hasMany(models.IssueLabel);
    Issue.hasMany(models.Comment);
    Issue.belongsToMany(models.User, {
      through: 'Assignee',
      as: 'Assignees',
      foreinKey: 'AssigneeId',
    });
  };

  return Issue;
};
