const newPostRouter = require('express').Router();
const newPostController = require('../controller/newPostController.js');

newPostRouter.get('/', newPostController.newPost);

module.exports = newPostRouter;
