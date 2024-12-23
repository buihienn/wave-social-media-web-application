'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Một Comment thuộc về một User
      Comment.belongsTo(models.User, { foreignKey: 'UserID', as: 'user' });

      // Một Comment thuộc về một Post
      Comment.belongsTo(models.Post, { foreignKey: 'PostID', as: 'post' });

      // Một Comment có nhiều Likes
      Comment.hasMany(models.Like, { foreignKey: 'CommentID', as: 'likes' });
    }
  }
  Comment.init({
    CommentID: DataTypes.INTEGER,
    PostID: DataTypes.INTEGER,
    UserID: DataTypes.INTEGER,
    Content: DataTypes.TEXT,
    Timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};