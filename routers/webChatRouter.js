const router = require('express').Router();

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

router.get('/home', homeController.showPost);
router.get('/homeF', homeController.showPostFollowing);

router.get('/profile', profileController.showProfile);
router.get('/edit-profile', profileController.showEditProfile);
router.post('/edit-profile', uploadAvatar.single('avatar'), profileController.updateProfile);

router.get('/new-post', newPostController.newPost);
router.post('/new-post', uploadPost.single('picture'), newPostController.createPost);

router.get('/posts/:postId', postController.getPostDetails);

router.post('/posts/:postId/like', postController.likePost);
router.delete('/posts/:postId/like', postController.unlikePost);
router.post('/post/:postID/comment', postController.addComment);

router.get('/noti', notiController.noti);
router.get('/noti', notiController.notiFetch);

router.get('/followers', followListController.getFollowers);
router.get('/following', followListController.getFollowing);
router.post('/users/:userId/follow', followListController.followUser);
router.post('/users/:userId/unfollow', followListController.unfollowUser);

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
router.post("/reset-password", authController.resetPassword);

// mail verify
router.get('/verify-email', authController.verifyEmail);



// notifi
router.patch("/notifications/:id/mark-as-read", notiController.markAsRead);

module.exports = router;