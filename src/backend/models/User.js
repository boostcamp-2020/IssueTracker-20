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
      allowNull: false,
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
    User.hasMany(models.Issue);
    User.hasMany(models.Comment);
  };

  return User;
};
