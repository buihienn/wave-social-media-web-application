const followListRouter = require('express').Router();
const followListController = require('../controller/followListController.js');

followListRouter.get('/', followListController.followList);

module.exports = followListRouter;