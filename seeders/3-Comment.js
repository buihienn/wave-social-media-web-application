'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      // Comments cho Post 1
      { PostID: 1, UserID: 2, Content: 'Amazing photo! Love it.' },
      { PostID: 1, UserID: 3, Content: 'Where is this place?' },

      // Comments cho Post 2
      { PostID: 2, UserID: 1, Content: 'Beautiful scenery!' },
      { PostID: 2, UserID: 3, Content: 'Wish I was there.' },

      // Comments cho Post 3
      { PostID: 3, UserID: 2, Content: 'That book is on my reading list!' },
      { PostID: 3, UserID: 1, Content: 'Sounds interesting!' },

      // Comments cho Post 4
      { PostID: 4, UserID: 3, Content: 'Your photography skills are incredible!' },
      { PostID: 4, UserID: 2, Content: 'Looking forward to seeing more!' },
    ];

    // Thêm giá trị `createdAt` và `updatedAt`
    data.forEach((item) => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });

    // Chèn dữ liệu vào bảng Comments
    await queryInterface.bulkInsert('Comments', data, {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa toàn bộ dữ liệu trong bảng Comments
    await queryInterface.bulkDelete('Comments', null, {});
  }
};