module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    issueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createData: {
      type: DataTypes.DATETIME,
      allowNull: false,
    },
  },
  {
    tableName: 'comment',
  });

  Comment.associate = (models) => {
    Comment.hasMany(models.transaction);
  };
};
