const homeRouter = require('express').Router();
const homeController = require('../controller/homeController.js');

homeRouter.get('/', homeController.home);

module.exports = homeRouter;