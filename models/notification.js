'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Một Notification thuộc về một User nhận thông báo
      Notification.belongsTo(models.User, { foreignKey: 'UserID', as: 'user' });

      // Một Notification thuộc về một User thực hiện hành động
      Notification.belongsTo(models.User, { foreignKey: 'ActionUserID', as: 'actionUser' });
    }
  }
  Notification.init({
    NotificationID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: DataTypes.INTEGER,
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['like', 'comment', 'follow']], // Chỉ chấp nhận 'like', 'comment', 'follow'
      },
    },
    IsRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ActionUserID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};