'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Một Like thuộc về một User
      Like.belongsTo(models.User, { foreignKey: 'UserID', as: 'user' });

      // Một Like thuộc về một Post
      Like.belongsTo(models.Post, { foreignKey: 'PostID', as: 'post' });

      // Một Like thuộc về một Comment
      Like.belongsTo(models.Comment, { foreignKey: 'CommentID', as: 'comment' });
    }
  }
  Like.init({
    LikeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PostID: DataTypes.INTEGER,
    CommentID: DataTypes.INTEGER,
    UserID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};