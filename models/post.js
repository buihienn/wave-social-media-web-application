'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Một Post thuộc về một User
      Post.belongsTo(models.User, { foreignKey: 'UserID', as: 'user' });

      // Một Post có nhiều Comments
      Post.hasMany(models.Comment, { foreignKey: 'PostID', as: 'comments' });

      // Một Post có nhiều Likes
      Post.hasMany(models.Like, { foreignKey: 'PostID', as: 'likes' });
    }
  }
  Post.init({
    PostID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: DataTypes.INTEGER,
    Content: DataTypes.TEXT,
    PictureURL: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};