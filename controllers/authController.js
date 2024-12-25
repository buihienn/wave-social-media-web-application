const authController = {};
const models = require("../models");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sendEmail } = require('../config/mailConfig');

// Handler Error
authController.handlerError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        let message = "";
        errors.array().forEach((error) => (message += error.msg + "<br>"));
        res.locals.message = message;
    }
    next();
    
};

authController.check = (req, res) => {
    if (accountIsLogin){
        res.render('mainPage', {title: 'Trang chu'});
    }
    else {
        res.render ('login', {title: 'Login', fileCSS: 'login.css', layout: 'pre-layout'});
    }
}

authController.showLogin = (req, res) => {
    res.render('login', { 
        title: 'Login', 
        fileCSS: 'login.css', 
        layout: 'pre-layout',
        username: req.cookies.username || '',  // Nếu không có cookie, để giá trị mặc định là ''
        password: req.cookies.password || ''   // Nếu không có cookie, để giá trị mặc định là ''
    });     
};

authController.showRegister = (req, res) => {
    res.render('register', { title: 'Register', fileCSS: 'register.css', layout: 'pre-layout'});
};

authController.showForgotPassword = (req, res) => {
    res.render('forgot-pass', { title: 'Forgot password', fileCSS: 'forgot-pass.css', layout: 'pre-layout' });
};

authController.showSuccessChangePage = (req, res) =>{
    res.render ('success-change-page', {title: '....', layout: 'pre-layout', fileCSS: 'success-change-page.css'})
}


authController.showThankyou = (req, res) =>{
    res.render ('thankyou', {title: 'Thank you', layout: 'pre-layout', fileCSS: 'thankyou.css'})
}


// Login - register
authController.register = async (req, res) => {
    if (res.locals.message){
        return res.render('register', { title: 'Register', fileCSS: 'register.css', layout: 'pre-layout', message: res.locals.message});
    }
    const {username, password, email} = req.body;

    try {
        const userByUsername = await models.User.findOne({ where: { Username: username } });
        const userByEmail = await models.User.findOne({ where: { Email: email } });

        if (userByUsername) {
            return res.render('register', {
                title: 'Register',
                fileCSS: 'register.css',
                layout: 'pre-layout',
                message: "Username already exists"
            });
        }

        if (userByEmail) {
            return res.render('register', {
                title: 'Register',
                fileCSS: 'register.css',
                layout: 'pre-layout',
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await models.User.create({
            Username: username, 
            Password: hashedPassword, 
            Email: email,
            Name: username,
            isVerified: false
        });
        res.render ('thankyou', {title: 'Thank you', layout: 'pre-layout', fileCSS: 'thankyou.css'});

        const token = jwt.sign({ userId: newUser.UserID }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        const verifyUrl = `${process.env.WEB_URL}/verify-email?token=${token}`;

        const subject = 'Email Verification';
        const text = `Please verify your email by clicking the following link: ${verifyUrl}`;

        await sendEmail(email, subject, text);
    }
    catch (error){
        console.error(error);
        res.render('register', { title: 'Register', fileCSS: 'register.css', layout: 'pre-layout', message: "Something went wrong" });
    }
};

authController.login = async (req, res, rememberMe = true) => {
    const { Op } = require('sequelize');
    const {username, password} = req.body;
    try {
        // const user = await models.User.findOne({where: {Username: username}});
        const user = await models.User.findOne({
            where: {
                [Op.or]: [
                    { Username: username },
                    { Email: username }  // Kiểm tra cả trường Email
                ]
            }
        });
        if (!user){
            return res.render('login', { title: 'Login', fileCSS: 'login.css', layout: 'pre-layout', message: "User not found" });
        }

        if (!bcrypt.compareSync(password, user.Password)) {
            return res.render('login', { title: 'Login', fileCSS: 'login.css', layout: 'pre-layout', message: "Wrong password" });
        }

        if (!user.isVerify) {
            return res.render('login', { 
                title: 'Login', 
                fileCSS: 'login.css', 
                layout: 'pre-layout', 
                message: "Please verify your email before logging in" 
            });
        }

        
        req.session.user = {
            id: user.UserID,
            username: user.Username,
            fullName: user.Name,
        }
        if (rememberMe){
            res.cookie('username', username);
            res.cookie('password', password);
        }
        res.redirect('/home');
    } catch {
        res.render('login', { title: 'Login', fileCSS: 'login.css', layout: 'pre-layout' });
    }
};

authController.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};

authController.authenticate = (req, res, next) => {
    if (!req.session.user){
        return res.redirect("/login");
    }
    next();
};


// Auther Email
authController.verifyEmail = async (req, res) => {
    const { token } = req.query;
  
    if (!token) {
        return res.status(400).send('Token is required');
    }
  
    try {
        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
        // Tìm người dùng và cập nhật trạng thái đã xác thực
        const user = await models.User.findByPk(decoded.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.isVerify) {
            req.flash('info', 'Email is already verified');
            return res.redirect('/login');
        }
      
        user.isVerify= true;
        await user.save();
        req.flash('info', 'Email is verified');
        res.redirect('/login');
  
    } catch (error) {
        res.status(400).send('Invalid or expired token');
    }
};

// tao chuoi ki tu
function generateRandomPassword(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Xử lý yêu cầu reset mật khẩu và gửi mật khẩu mới
authController.resetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.render('forgot-pass', { 
            title: 'Forgot password', 
            fileCSS: 'forgot-pass.css', 
            layout: 'pre-layout',
            message: "Email is required" 
        });
    }

    try {
        const userByEmail = await models.User.findOne({ where: { Email: email } });
        
        if (!userByEmail) {
            return res.render('forgot-pass', { 
                title: 'Forgot password', 
                fileCSS: 'forgot-pass.css', 
                layout: 'pre-layout',
                message: "Email not found" 
            });
        }

        const newPassword = generateRandomPassword(8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        userByEmail.Password = hashedPassword;
        await userByEmail.save();

        const subject = 'Your New Password';
        const text = `Your new password is: ${newPassword}\nPlease login with this password and change it immediately for security purposes.`;

        await sendEmail(email, subject, text);

        return res.render('forgot-pass', { 
            title: 'Forgot password', 
            fileCSS: 'forgot-pass.css', 
            layout: 'pre-layout',
            messageSuccess: "A new password has been sent to your email" 
        });

    } catch (error) {
        console.error(error);
        if (!res.headersSent) { // Đảm bảo không gửi phản hồi nếu đã gửi một lần
            res.render('forgot-pass', { 
                title: 'Forgot password', 
                fileCSS: 'forgot-pass.css', 
                layout: 'pre-layout',
                message: "Something went wrong, Please try again!" 
            });
        }
    }
};



module.exports = authController;
