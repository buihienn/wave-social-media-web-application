const router = require('express').Router();

const authController = require('../controllers/authController.js');
const homeController = require('../controllers/homeController.js');
const postController = require('../controllers/postController.js');
const notiController = require('../controllers/notiController.js');
const newPostController = require('../controllers/newPostController.js');
const followListController = require('../controllers/followListController.js');

router.get('/', authController.login)
router.get('/login', authController.login);
router.get('/register', authController.register);
router.get('/forgot-pass', authController.forgotPassword);
router.get('/home', homeController.home);
router.get('/post', postController.index);
router.get('/noti', notiController.noti);
router.get('/new-post', newPostController.newPost);
router.get('/follow-list', followListController.followList);
router.get('/success-change-page', authController.successChangePage);
router.get('/thankyou', authController.successChangePage);

module.exports = router;