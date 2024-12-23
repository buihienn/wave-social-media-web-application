const authController = {};

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

<<<<<<< HEAD:controllers/authController.js
module.exports = authController;
=======
authController.successChangePage = (req, res) =>{
    res.render ('success-change-page', {title: '....', layout: 'pre-layout', fileCSS: 'success-change-page.css'})
}


authController.thankyou = (req, res) =>{
    res.render ('thankyou', {title: 'Thank you', layout: 'pre-layout', fileCSS: 'thankyou.css'})
}

module.exports = authController;
>>>>>>> main:controller/authController.js
