'use strict';
var express = require('express');
var adminRouter = express.Router();
var commons = require('./commonRouteFunctions');
var storeController = require('../controller/adminStoreController');
var productController = require('../controller/adminProductController');
var offerController = require('../controller/adminOfferController');

adminRouter.route('/stores').post(commons.ensureAuthenticated,storeController.createStore);
adminRouter.route('/store/:storeId')
	.get(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,storeController.editStore)
	.put(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,storeController.updateStore)
	.delete(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,storeController.deleteStore);

adminRouter.route('/products/:storeId').post(commons.ensureAuthenticated,productController.createProduct);
adminRouter.route('/product/:productId/:storeId')
	.get(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,productController.editProduct)
	.put(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,productController.updateProduct)
	.delete(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,productController.deleteProduct);

adminRouter.route('/offers/:storeId').post(commons.ensureAuthenticated,offerController.createOffer);
adminRouter.route('/offer/:storeId/:offerId/')
	.get(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,offerController.editOffer)
	.put(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,offerController.updateOffer)
	.delete(commons.ensureAuthenticated,commons.ensureStoreAdminAuthenticated,offerController.deleteOffer);

adminRouter.route('/store/products')
.get(commons.ensureAuthenticated,function(req,res){
  res.send('store');
});
module.exports = adminRouter;
