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
    NotificationID: DataTypes.INTEGER,
    UserID: DataTypes.INTEGER,
    Type: DataTypes.STRING,
    Timestamp: DataTypes.DATE,
    IsRead: DataTypes.BOOLEAN,
    ActionUserID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};