'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Một Follower thuộc về một User (Followee - Người được theo dõi)
      Follower.belongsTo(models.User, { foreignKey: 'FolloweeID', as: 'followee' });

      // Một Follower thuộc về một User (Follower - Người theo dõi)
      Follower.belongsTo(models.User, { foreignKey: 'FollowerID', as: 'follower' });
    }
  }
  Follower.init({
    FolloweeID: DataTypes.INTEGER,
    FollowerID: DataTypes.INTEGER,
    UserID: DataTypes.INTEGER,
    Timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Follower',
  });
  return Follower;
};