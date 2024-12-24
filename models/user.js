'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Một User có nhiều Posts
      User.hasMany(models.Post, { foreignKey: 'UserID', as: 'posts' });

      // Một User có nhiều Comments
      User.hasMany(models.Comment, { foreignKey: 'UserID', as: 'comments' });

      // Một User có nhiều Likes
      User.hasMany(models.Like, { foreignKey: 'UserID', as: 'likes' });

      // Người dùng được nhiều người theo dõi
      User.belongsToMany(models.User, {
        through: models.Follower,
        as: 'followers', // Những người đang theo dõi mình
        foreignKey: 'FolloweeID', // Khóa ngoại trong bảng Follower
        otherKey: 'FollowerID',   // Khóa liên kết ngược
      });

      // Người dùng theo dõi nhiều người khác
      User.belongsToMany(models.User, {
        through: models.Follower,
        as: 'following', // Những người mình đang theo dõi
        foreignKey: 'FollowerID', // Khóa ngoại trong bảng Follower
        otherKey: 'FolloweeID',   // Khóa liên kết ngược
      });

      // Một User có nhiều Notifications
      User.hasMany(models.Notification, { foreignKey: 'UserID', as: 'notifications' });

      // Một User là người thực hiện hành động trong Notifications
      User.hasMany(models.Notification, { foreignKey: 'ActionUserID', as: 'actionNotifications' });
    }
  }
  User.init({
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Username: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    Name: DataTypes.STRING,
    Bio: DataTypes.TEXT,
    Link: DataTypes.STRING,
    ProfilePicture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};