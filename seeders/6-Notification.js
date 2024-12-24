'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      // Notifications cho Like
      { UserID: 1, Type: 'like', ActionUserID: 2 },
      { UserID: 1, Type: 'like', ActionUserID: 3 },
      { UserID: 2, Type: 'like', ActionUserID: 1 },
      { UserID: 2, Type: 'like', ActionUserID: 3 },

      // Notifications cho Comment
      { UserID: 1, Type: 'comment', ActionUserID: 2 },
      { UserID: 1, Type: 'comment', ActionUserID: 3 },
      { UserID: 2, Type: 'comment', ActionUserID: 1 },
      { UserID: 2, Type: 'comment', ActionUserID: 3 },

      // Notifications cho Follow
      { UserID: 1, Type: 'follow', ActionUserID: 2 },
      { UserID: 1, Type: 'follow', ActionUserID: 3 },
      { UserID: 2, Type: 'follow', ActionUserID: 1 },
      { UserID: 2, Type: 'follow', ActionUserID: 3 },
    ];

    // Thêm giá trị `createdAt` và `updatedAt`
    data.forEach((item) => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });

    // Chèn dữ liệu vào bảng Notifications
    await queryInterface.bulkInsert('Notifications', data, {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa toàn bộ dữ liệu trong bảng Notifications
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};