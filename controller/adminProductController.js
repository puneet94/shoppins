'use strict';

var models = require('..//models/storeModel');
var Product = models.Product;
var Store = models.Store;
var common = require('../routes/commonRouteFunctions');

var adminProductController = {
	createProduct: createProduct,
	editProduct: editProduct,
	updateProduct: updateProduct,
	deleteProduct: deleteProduct
};

function createProduct(req, res) {
	var product = new Product();
	var address = {};
	var price = {};
	var item = req.body;
	product.name = item.name.toLowerCase();
	product.quantity = item.quantity;
	product.description = item.description;
	product.category = item.category.map(function(item) {
		return item.toLowerCase();
	});
	product.bannerImage = item.bannerImage;
	product.productImages = item.productImages;
	product.subCategory = item.subCategory.map(function(item) {
		return item.toLowerCase();
	});
	price.value = item.price.value;
	price.currency = item.price.currency || 'INR';
	product.price = price;
	product.store = req.params.storeId;
	Store.findById(req.params.storeId, function(err, store) {
		if (err) {
			console.log(err);
		} else {
			console.log(store);
			product.address = store.address;
			product.save(function(error, result) {
				if (error) {
					console.log(error);
				} else {
					common.saveSearchList(product.name.toLowerCase(), "product", product.address.city.toLowerCase(), req, res);
					for (var i = 0; i < product.category.length; i++) {
						common.saveSearchList(product.category[i].toLowerCase(), "product-category", product.address.city.toLowerCase(), req, res);
					}
					for (var j = 0; j < product.subCategory.length; j++) {
						common.saveSearchList(product.subCategory[j].toLowerCase(), "product-subcategory", product.address.city.toLowerCase(), req, res);
					}
					var activity = {};
					activity.creatorStore = req.params.storeId;
					activity.product = result._id;
					activity.statement = "created product";
					console.log("entering activity");
					console.log(activity);
					common.enterActivity(activity);
					
					res.json(result);
				}
			});
		}
	});




}

function editProduct(req, res) {
	console.log(typeof req.query.select);
	Product.findById(req.params.productId)
		.select(req.query.select)
		.exec(function(error, result) {
			if (error) {
				console.log("error while reading");
			} else {
				console.log(result);
				res.json(result);
			}
		});
}

function updateProduct(req, res) {
	console.log('*******product *********');
	console.log(req.params.productId);
	Product.findById(req.params.productId, function(err, product) {
		if (err) {
			console.log(err);
		} else {
			console.log('*******product save *********');
			var item = req.body;
			var price = {};
			product.name = item.name.toLowerCase();
			product.quantity = item.quantity;
			product.description = item.description;
			product.category = item.category.map(function(item) {
				return item.toLowerCase();
			});
			product.bannerImage = item.bannerImage;
			product.productImages = item.productImages;
			product.subCategory = item.subCategory.map(function(item) {
				return item.toLowerCase();
			});
			price.value = item.price.value;
			price.currency = item.price.currency || 'INR';
			product.price = price;
			product.store = req.params.storeId;
			product.save(function(error, result) {
				if (error) {
					console.log("error" + error);
				} else {
					console.log('*******product save elde*********');
					common.saveSearchList(product.name.toLowerCase(), "product", product.address.city.toLowerCase(), req, res);
					for (var i = 0; i < product.category.length; i++) {
						common.saveSearchList(product.category[i].toLowerCase(), "product-category", product.address.city.toLowerCase(), req, res);
					}
					for (var j = 0; j < product.subCategory.length; j++) {
						common.saveSearchList(product.subCategory[j].toLowerCase(), "product-subcategory", product.address.city.toLowerCase(), req, res);
					}
					var activity = {};
					activity.creatorStore = req.params.storeId;
					activity.product = result._id;
					activity.statement = "updated product";
					console.log("entering activity");
					console.log(activity);
					common.enterActivity(activity);

					res.json(result);
				}
			});
		}
	});
}

function deleteProduct(req, res) {

	Product.findById(req.params.productId, function(err, product) {
		if (err) {
			console.log(err);
		} else {
			res.json("Product deleted");
		}
	});
}


module.exports = adminProductController;
