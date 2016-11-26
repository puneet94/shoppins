var express = require('express');
var models = require('..//models/storeModel');
var mongoose = require('mongoose');

var multer = require('multer');
var upload = multer({ dest: './uploads/'});
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var uploadRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
var uploadController = require('../controller/uploadController');

uploadRouter.route('/multipleUpload').post(commons.ensureAuthenticated,upload.array('file',5),uploadController.multipleUpload);

uploadRouter.route('/singleUpload').post(commons.ensureAuthenticated,upload.single('file'),uploadController.singleUpload);

uploadRouter.route('/storeBannerUpload/:storeId').post(commons.ensureAuthenticated,upload.single('file'),uploadController.uploadStoreBanner);


module.exports = uploadRouter;
