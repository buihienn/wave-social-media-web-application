'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [
      {
        Username: "buihien",
        Email: "bhien22@clc.fitus.edu.vn",
        Password: "buihien",
        Name: "Bui Hien",
        Bio: "hello",
        Link: "buihienportfolio.com",
        ProfilePicture: "avatars/avatar1.jpg",
        isVerify: true,
      },
      {
        Username: "vinhhho",
        Email: "hpvinh22@clc.fitus.edu.vn",
        Password: await bcrypt.hash('123', 10),
        Name: "Phu Vinh",
        Bio: "hello",
        Link: "phuvinhportfolio.com",
        ProfilePicture: "avatars/avatar2.jpg",
        isVerify: true,
      },
      {
        Username: "diuhuyen",
        Email: "tdhuyen22@clc.fitus.edu.vn",
        Password: "diuhuyen",
        Name: "Diu Huyen",
        Bio: "hello",
        Link: "diuhuyenportfolio.com",
        ProfilePicture: "avatars/avatar3.jpg",
        isVerify: true,
      },
      {
        Username: "ngoclan",
        Email: "ngoclan22@clc.fitus.edu.vn",
        Password: "ngoclan",
        Name: "Ngoc Lan",
        Bio: "Enthusiastic coder.",
        Link: "ngoclanportfolio.com",
        ProfilePicture: "avatars/avatar4.jpg",
        isVerify: true,
      },
      {
        Username: "quangminh",
        Email: "quangminh22@clc.fitus.edu.vn",
        Password: "quangminh",
        Name: "Quang Minh",
        Bio: "Web developer and designer.",
        Link: "quangminhportfolio.com",
        ProfilePicture: "avatars/avatar5.jpg",
        isVerify: true,
      },
      {
        Username: "hoanganh",
        Email: "hoanganh22@clc.fitus.edu.vn",
        Password: "hoanganh",
        Name: "Hoang Anh",
        Bio: "Lover of AI and ML.",
        Link: "hoanganhportfolio.com",
        ProfilePicture: "avatars/avatar6.jpg",
        isVerify: true,
      },
      {
        Username: "trungkien",
        Email: "trungkien22@clc.fitus.edu.vn",
        Password: "trungkien",
        Name: "Trung Kien",
        Bio: "Passionate about backend development.",
        Link: "trungkienportfolio.com",
        ProfilePicture: "avatars/avatar7.jpg",
        isVerify: true,
      },
      {
        Username: "thanhhoa",
        Email: "thanhhoa22@clc.fitus.edu.vn",
        Password: "thanhhoa",
        Name: "Thanh Hoa",
        Bio: "A creative UI/UX designer.",
        Link: "thanhhoaportfolio.com",
        ProfilePicture: "avatars/avatar8.jpg",
        isVerify: true,
      },
      {
        Username: "minhtuan",
        Email: "minhtuan22@clc.fitus.edu.vn",
        Password: "minhtuan",
        Name: "Minh Tuan",
        Bio: "Fullstack developer with a love for AI.",
        Link: "minhtuanportfolio.com",
        ProfilePicture: "avatars/avatar9.jpg",
        isVerify: true,
      },
      {
        Username: "phuongthao",
        Email: "phuongthao22@clc.fitus.edu.vn",
        Password: "phuongthao",
        Name: "Phuong Thao",
        Bio: "Experienced in data science and ML.",
        Link: "phuongthaoprofile.com",
        ProfilePicture: "avatars/avatar10.jpg",
        isVerify: true,
      },
      {
        Username: "anhquan",
        Email: "anhquan22@clc.fitus.edu.vn",
        Password: "anhquan",
        Name: "Anh Quan",
        Bio: "Building scalable web applications.",
        Link: "anhquanportfolio.com",
        ProfilePicture: "avatars/avatar11.jpg",
        isVerify: true,
      },
    ];

    // Thêm giá trị `createdAt` và `updatedAt`
    data.forEach((item) => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });

    // Chèn dữ liệu vào bảng Users
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    // Xóa tất cả dữ liệu trong bảng Users
    await queryInterface.bulkDelete('Users', null, {});
  }
};
