const notiRouter = require('express').Router();
const notiController = require('../controller/notiController.js');

notiRouter.get('/', notiController.noti);

module.exports = notiRouter;