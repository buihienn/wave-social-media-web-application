const authController = {};

authController.login = (req, res) => {
    res.render('login', { title: 'Login', fileCSS: 'login.css', layout: 'pre-layout' });
};

authController.register = (req, res) => {
    res.render('register', { title: 'Register', fileCSS: 'register.css', layout: 'pre-layout' });
};

authController.forgotPassword = (req, res) => {
    res.render('forgot-pass', { title: 'Forgot password', fileCSS: 'forgot-pass.css', layout: 'pre-layout' });
};

module.exports = authController;