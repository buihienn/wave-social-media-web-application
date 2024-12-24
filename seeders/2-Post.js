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
        PictureURL: 'images/post2.jpg',
      },
      {
        UserID: 3,
        Content: 'Just finished reading a great book!',
        PictureURL: 'images/post3.jpg',
      },
      {
        UserID: 1,
        Content: 'My new photography project is live!',
        PictureURL: 'images/post4.jpg',
      },
      {
        UserID: 4,
        Content: 'Loving the fresh vibes of this coffee shop.',
        PictureURL: 'images/post5.jpg',
      },
      {
        UserID: 5,
        Content: 'Sunsets are truly magical!',
        PictureURL: 'images/post6.jpg',
      },
      {
        UserID: 2,
        Content: 'Great time hiking in the mountains.',
        PictureURL: 'images/post7.jpg',
      },
      {
        UserID: 3,
        Content: 'Weekend vibes with friends and music.',
        PictureURL: 'images/post8.jpg',
      },
      {
        UserID: 6,
        Content: 'Can’t wait to share my travel vlog soon!',
        PictureURL: 'images/post9.jpg',
      },
      {
        UserID: 1,
        Content: 'Experimenting with new recipes today!',
        PictureURL: 'images/post11.jpg',
      },
      {
        UserID: 4,
        Content: 'Visited a local art gallery, so inspiring!',
        PictureURL: 'images/post10.png',
      },
      {
        UserID: 7,
        Content: 'Feeling blessed to witness such a beautiful sunrise.',
        PictureURL: 'images/post9.jpg',
      },
      {
        UserID: 5,
        Content: 'Life is better when you’re laughing.',
        PictureURL: 'images/post11.jpg',
      },
      {
        UserID: 6,
        Content: 'Throwback to an unforgettable road trip!',
        PictureURL: 'images/post11.jpg',
      }
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