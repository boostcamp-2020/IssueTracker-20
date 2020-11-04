export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePictureURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'User',
  });

  User.associate = (models) => {
    User.hasMany(models.Issue, {
      as: 'issues',
      foreignKey: 'authorId',
    });
    User.belongsToMany(models.Issue, {
      through: 'Assignee',
      as: 'assigned',
      foreignKey: 'assigneeId',
    });
    User.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'authorId',
    });
  };

  return User;
};
