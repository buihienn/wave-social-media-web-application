'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [
      {
        UserID: 1,
        Content: 'Exploring the beauty of nature!',
        PictureURL: 'images/post1.jpg',
      },
      {
        UserID: 2,
        Content: 'Had an amazing day at the beach.',
        PictureURL: 'images/post1.jpg',
      },
      {
        UserID: 3,
        Content: 'Just finished reading a great book!',
        PictureURL: 'images/post1.jpg',
      },
      {
        UserID: 1,
        Content: 'My new photography project is live!',
        PictureURL: 'images/post1.jpg',
      },
    ];

    // Thêm giá trị `createdAt` và `updatedAt`
    data.forEach((item) => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });

    // Chèn dữ liệu vào bảng Posts
    await queryInterface.bulkInsert('Posts', data, {});
  },

  async down (queryInterface, Sequelize) {
    // Xóa tất cả dữ liệu trong bảng Posts
    await queryInterface.bulkDelete('Posts', null, {});
  }
};