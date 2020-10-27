export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'Comment',
  });

  return Comment;
};
