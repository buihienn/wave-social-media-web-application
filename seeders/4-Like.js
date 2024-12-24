'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      { UserID: 2, PostID: 1 },
      { UserID: 3, PostID: 1 },
      { UserID: 1, PostID: 2 },
      { UserID: 3, PostID: 2 },
      { UserID: 2, PostID: 3 },
      { UserID: 1, PostID: 3 },
      { UserID: 3, PostID: 4 },
      { UserID: 2, PostID: 4 },
      
      { UserID: 2, CommentID: 1 },
      { UserID: 3, CommentID: 2 },
      { UserID: 1, CommentID: 3 },
      { UserID: 3, CommentID: 4 },
      { UserID: 2, CommentID: 5 },
      { UserID: 1, CommentID: 6 },
      { UserID: 3, CommentID: 7 },
      { UserID: 2, CommentID: 2 },
    ];

    // Thêm giá trị `createdAt` và `updatedAt`
    data.forEach((item) => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });

    // Chèn dữ liệu vào bảng Likes
    await queryInterface.bulkInsert('Likes', data, {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa toàn bộ dữ liệu trong bảng Likes
    await queryInterface.bulkDelete('Likes', null, {});
  }
};