'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Followers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FolloweeID: {
        type: Sequelize.INTEGER
      },
      FollowerID: {
        type: Sequelize.INTEGER
      },
      UserID: {
        type: Sequelize.INTEGER
      },
      Timestamp: {
        type: Sequelize.DATE
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending', 
        validate: {
          isIn: [['pending', 'accepted']], 
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Followers');
  }
};