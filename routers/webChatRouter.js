const router = require('express').Router();
const authController = require('../controller/authController.js');

router.get('/', authController.login)
router.get('/login', authController.login);
router.get('/register', authController.register);
router.get('/forgot-pass', authController.forgotPassword);
router.get('/success-change-page', authController.successChangePage);
router.get('/thankyou', authController.successChangePage);


module.exports = router;