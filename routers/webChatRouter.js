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



router.get('/homeF', requireLogin,homeController.showPostFollowing);
router.get('/home', requireLogin, homeController.showPost);

router.get('/profile', requireLogin,profileController.showProfile);
router.get('/edit-profile', requireLogin,profileController.showEditProfile);
router.post('/edit-profile', requireLogin,uploadAvatar.single('avatar'), profileController.updateProfile);

router.get('/new-post', requireLogin,newPostController.newPost);
router.post('/new-post',requireLogin,uploadPost.single('picture'), newPostController.createPost);

router.get('/posts/:postId', requireLogin,postController.getPostDetails);

router.post('/posts/:postId/like', requireLogin,postController.likePost);
router.delete('/posts/:postId/like', requireLogin,postController.unlikePost);
router.post('/post/:postID/comment', requireLogin,postController.addComment);

router.get('/followers', requireLogin,followListController.getFollowers);
router.get('/following', requireLogin,followListController.getFollowing);
router.post('/users/:userId/follow', requireLogin,followListController.followUser);
router.post('/users/:userId/unfollow', requireLogin,followListController.unfollowUser);


router.get('/noti', requireLogin,notiController.notiFetch);

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