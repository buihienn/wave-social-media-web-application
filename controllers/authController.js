const authController = {};
const models = require("../models");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");


authController.check = (req, res) => {
    if (accountIsLogin){
        res.render('mainPage', {title: 'Trang chu'});
    }
    else {
        res.render ('login', {title: 'Login', fileCSS: 'login.css', layout: 'pre-layout'});
    }
}

authController.showLogin = (req, res) => {
    res.render('login', { title: 'Login', fileCSS: 'login.css', layout: 'pre-layout' });
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

authController.login = async (req, res) => {
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
            id: user.id,
            username: user.Username,
            fullName: user.Name,
        }
        res.redirect('/home');
    } catch {
        res.render('login', { title: 'Login', fileCSS: 'login.css', layout: 'pre-layout' });
    }
}


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

module.exports = authController;

