const router = require('express').Router();

const authController = require('../controller/authController.js');
const homeController = require('../controller/homeController.js');
const postController = require('../controller/postController.js');
const notiController = require('../controller/notiController.js');
const newPostController = require('../controller/newPostController.js');
const followListController = require('../controller/followListController.js');

router.get('/', authController.login)
router.get('/login', authController.login);
router.get('/register', authController.register);
router.get('/forgot-pass', authController.forgotPassword);
router.get('/home', homeController.home);
router.get('/post', postController.index);
router.get('/noti', notiController.noti);
router.get('/new-post', newPostController.newPost);
router.get('/follow-list', followListController.followList);


module.exports = router;