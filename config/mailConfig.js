const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});


// ham gui email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ', error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve(info);
      }
    });
  });
};

module.exports = {
  sendEmail,
};

// // .... 
// app.get('/verify-email', async (req, res) => {
//   const { token } = req.query;

//   if (!token) {
//       return res.status(400).send('Token is required');
//   }

//   try {
//       // Giải mã token
//       const decoded = jwt.verify(token, 'your-secret-key');

//       // Tìm người dùng và cập nhật trạng thái đã xác thực
//       const user = await models.User.findByPk(decoded.userId);
//       if (!user) {
//           return res.status(404).send('User not found');
//       }

//       // Cập nhật trạng thái xác thực cho người dùng
//       user.isVerified = true;
//       await user.save();

//       res.send('Email verified successfully. You can now log in.');

//   } catch (error) {
//       res.status(400).send('Invalid or expired token');
//   }
// });