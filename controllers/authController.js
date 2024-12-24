const authController = {};
const models = require("../models");


authController.check = (req, res) => {
    if (accountIsLogin){
        res.render('mainPage', {title: 'Trang chu'});
    }
    else {
        res.render ('login', {title: 'Login', fileCSS: 'login.css', layout: 'pre-layout'});
    }
}

authController.login = (req, res) => {
    res.render('login', { title: 'Login', fileCSS: 'login.css', layout: 'pre-layout' });
};

authController.register = (req, res) => {
    res.render('register', { title: 'Register', fileCSS: 'register.css', layout: 'pre-layout' });
};

authController.forgotPassword = (req, res) => {
    res.render('forgot-pass', { title: 'Forgot password', fileCSS: 'forgot-pass.css', layout: 'pre-layout' });
};

authController.successChangePage = (req, res) =>{
    res.render ('success-change-page', {title: '....', layout: 'pre-layout', fileCSS: 'success-change-page.css'})
}


authController.thankyou = (req, res) =>{
    res.render ('thankyou', {title: 'Thank you', layout: 'pre-layout', fileCSS: 'thankyou.css'})
}

authController.register = async (req, res) => {
    const {username, firstname, lastName, password} = req.body;
    try {
        await models.User.create(username, firstname, lastName, password);
    }
    catch {

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

