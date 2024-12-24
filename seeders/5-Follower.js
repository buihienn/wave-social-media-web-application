'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      { FolloweeID: 1, FollowerID: 2, Status: 'accepted' },
      { FolloweeID: 1, FollowerID: 3, Status: 'pending' },
      { FolloweeID: 2, FollowerID: 1, Status: 'accepted' },
      { FolloweeID: 2, FollowerID: 2, Status: 'pending' },
      { FolloweeID: 2, FollowerID: 3, Status: 'accepted' },
      { FolloweeID: 2, FollowerID: 4, Status: 'accepted' },
      { FolloweeID: 2, FollowerID: 5, Status: 'pending' },
      { FolloweeID: 2, FollowerID: 6, Status: 'accepted' },
      { FolloweeID: 2, FollowerID: 7, Status: 'accepted' },
      { FolloweeID: 2, FollowerID: 8, Status: 'pending' },
    ];

    // Thêm giá trị `createdAt` và `updatedAt`
    data.forEach((item) => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });

    // Chèn dữ liệu vào bảng Follower
    await queryInterface.bulkInsert('Followers', data, {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa toàn bộ dữ liệu trong bảng Follower
    await queryInterface.bulkDelete('Followers', null, {});
  }
};