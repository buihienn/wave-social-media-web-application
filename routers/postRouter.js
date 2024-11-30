const postRouter = require('express').Router();
const postController = require('../controller/postController.js');

postRouter.get('/', postController.index);

module.exports = postRouter;