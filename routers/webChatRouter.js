const router = require('express').Router();
const requireLogin = require('./requireLogin.js');

const authController = require('../controllers/authController.js');
const homeController = require('../controllers/homeController.js');
const postController = require('../controllers/postController.js');
const notiController = require('../controllers/notiController.js');
const newPostController = require('../controllers/newPostController.js');
const followListController = require('../controllers/followListController.js');
const profileController = require('../controllers/profileController.js');

const uploadAvatar = require('../middlewares/uploadAvatar');
const uploadPost = require('../middlewares/uploadPost.js');

const {body} = require("express-validator");

router.get('/', authController.showLogin)
router.get('/login', authController.showLogin);
router.get('/register', authController.showRegister);
router.get('/forgot-pass', authController.showForgotPassword);

router.get('/home', requireLogin,homeController.showPost);

router.get('/profile', requireLogin,profileController.showProfile);
router.get('/edit-profile', profileController.showEditProfile);
router.post('/edit-profile', uploadAvatar.single('avatar'), profileController.updateProfile);

router.get('/new-post', requireLogin,newPostController.newPost);
router.post('/new-post', uploadPost.single('picture'), newPostController.createPost);

router.get('/posts/:postId', postController.getPostDetails);
router.get('/noti', requireLogin,notiController.notiFetch);
router.get('/follow-list', requireLogin,followListController.followList);
router.get('/success-change-page', authController.showSuccessChangePage);
router.get('/thankyou', authController.showThankyou);

router.get("/logout", requireLogin,authController.logout);

// POST
router.post('/register', 
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    authController.handlerError,
    authController.register
);

router.post("/login", authController.login);
router.post("/reset-password", authController.resetPassword);

// mail verify
router.get('/verify-email', authController.verifyEmail);



// notifi
router.patch("/notifications/:id/mark-as-read", notiController.markAsRead);
router.delete("/notifications/:id/delete", notiController.deleteNotification);
router.get ("/api/unread-notifications", notiController.checkUnread)

module.exports = router;