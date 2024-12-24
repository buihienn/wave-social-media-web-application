const authController = {};
const models = require("../models");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");

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
        const hashedPassword = await bcrypt.hash(password, 10);
        await models.User.create({
            Username: username, 
            Password: hashedPassword, 
            Email: email
        });
        res.render ('thankyou', {title: 'Thank you', layout: 'pre-layout', fileCSS: 'thankyou.css'})
    }
    catch (error){
        console.error(error);
        res.render('register', { title: 'Register', fileCSS: 'register.css', layout: 'pre-layout', message: "Something went wrong" });
    }
};

authController.login = async (req, res, rememberMe = true) => {
    const {username, password} = req.body;
    try {
        const user = await models.User.findOne({where: {Username: username}});
        if (!user){
            return res.render('login', { title: 'Login', fileCSS: 'login.css', layout: 'pre-layout', message: "User not found" });
        }

        if (!bcrypt.compareSync(password, user.Password)) {
            return res.render('login', { title: 'Login', fileCSS: 'login.css', layout: 'pre-layout', message: "Wrong password" });
        }

        
        req.session.user = {
            id: user.UserID,
            username: user.Username,
            fullName: user.Name,
        }
        if (rememberMe){
            res.cookie('username', user.Username);
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

module.exports = authController;

