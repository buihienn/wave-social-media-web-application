const router = require('express').Router();

const authController = require('../controllers/authController.js');
const homeController = require('../controllers/homeController.js');
const postController = require('../controllers/postController.js');
const notiController = require('../controllers/notiController.js');
const newPostController = require('../controllers/newPostController.js');
const followListController = require('../controllers/followListController.js');
const profileController = require('../controllers/profileController.js');

const {body} = require("express-validator");

router.get('/', authController.showLogin)
router.get('/login', authController.showLogin);
router.get('/register', authController.showRegister);
router.get('/forgot-pass', authController.showForgotPassword);
router.get('/home', homeController.showPost);
router.get('/profile', profileController.showProfile);
router.get('/post', postController.index);
router.get('/noti', notiController.noti);
router.get('/new-post', newPostController.newPost);
router.get('/follow-list', followListController.followList);
router.get('/success-change-page', authController.showSuccessChangePage);
router.get('/thankyou', authController.showThankyou);

router.get("/logout", authController.logout);

// POST
router.post('/register', 
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    authController.handlerError,
    authController.register
);

router.post("/login", authController.login);


module.exports = router;