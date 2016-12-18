var express = require('express');
var models = require('..//models/storeModel');
var Product = models.Product;
var Store = models.Store;
var mongoose = require('mongoose');
var productRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;

productRouter.use(function(req,res,next){
	console.log("product");
	console.log(req.method,req.url);
	next();
});

productRouter.route('/products')
	.get(function(req,res){
		Product.find(function(err,products){
			if(err){
				res.send(err);
			}
			console.log("hello");
			res.json(products);
			
		})
	})
productRouter.route('/products/store/:storeId/:pageNo')
	.post(function(req,res){
		var product = new Product();
		var recData = req.body;
		product.name = recData.name;
		product.description=recData.description;
		product.category=recData.category;
		product.subCategory=recData.subCatgeory;
		//product.price=recData.price;
		product.sizesAvailable=recData.sizesAvailable;
		product.store = mongoose.Types.ObjectId(req.params.storeId);
		console.log(typeof(req.params.storeId));
		var city_name = "nopeeeeejjjje";//ObjectId.fromString new ObjectId(product.store)
		Store.findById(mongoose.Types.ObjectId(req.params.storeId),function(err,store){
				if(err){
					console.log("inside save of product");
					//res.send(err);
					console.log(err);

				}
				else{
					city_name = store.address.city;
				}
		})
		product.save(function(err){
			if(err){
				if(err.code == 11000){
					return res.json({success:false,'message':'Product already exists'});
				}
				else{
					console.log(err);
					return res.send(err);

				}
			}

			commons.saveSearchList(recData.name.toLowerCase(),"product",city_name,req,res);
			commons.saveSearchList(recData.category.toLowerCase(),"product-category",city_name,req,res);
			commons.saveSearchList(recData.subCatgeory.toLowerCase(),"product-subcategory",city_name,req,res);
			res.json({message:"Product created"});
		});
	})
	.get(function(req,res){
		Product.paginate({'store':req.params.storeId},
			{page: req.params.pageNo, limit: 35 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				console.log(result);
				res.json(result);
			}
		});
	})
productRouter.route('/products/category/:category/:location/:pageNo')
	.get(function(req,res){
		var queryObject = {};
		queryObject['address.city']=req.params.location;
		queryObject['category'] = req.params.category;
		Product.paginate(queryObject,
			{page: req.params.pageNo, limit: 35 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				console.log("this is the thing");
				res.json(result);
			}
		});
	})
productRouter.route('/products/subCategory/:subCategory/:location/:pageNo')
	.get(function(req,res){
		var queryObject = {};
		queryObject['address.city']=req.params.location;
		queryObject['subCategory'] = req.params.subCategory;
		Product.paginate(queryObject,
			{page: req.params.pageNo, limit: 35 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				res.json(result);
			}
		});
	})

productRouter.route('/products/name/:name/:location/:pageNo')
	.get(function(req,res){
		var queryObject = {};
		queryObject['address.city']=req.params.location;
		queryObject['name'] = req.params.name;
		console.log(queryObject);
		Product.paginate(queryObject,
			{page: req.params.pageNo, limit: 35 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				console.log("te rejashd");
				console.log(result);
				res.json(result);
			}
		});
	})

productRouter.route('/products/singleProduct/:productId')
	.get(function(req,res){
		Product.findById(req.params.productId,function(err,product){
			if(err){
				res.send(err);
			}
			else{
				res.json(product);
			}
		})
	});

productRouter.route('/products/location/:location/:pageNo')
	.get(function(req,res){
		var queryObject = {};
		queryObject['address.city']=req.params.location;
		if(req.query.category){
			queryObject['category'] = req.query.category;
		}
		if(req.query.area){
			queryObject['address.area'] = req.query.area;
		}
		//queryObject['category'] = req.params.category;
		Product.paginate(queryObject,
			{page: req.params.pageNo, limit: 35 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				
				res.json(result);
			}
		});
		
	})

productRouter.route('/localities/:city')
	.get(function(req,res){
		var query = Product.find({'address.city':req.params.city}).select({ "address.area": 1, "_id": 0});
    query.exec(function (err, someValue) {
        if (err) {
						return next(err);
				}
				else{
					var areaArray = [];
					for (var i = 0; i < someValue.length; i++) {
						console.log(someValue[i].address.area);
						if(areaArray.indexOf(someValue[i].address.area)==-1){
							areaArray.push(someValue[i].address.area);
						}
					}
						res.json(areaArray);
				}

    });
	});
	productRouter.route('/categories/:city')
		.get(function(req,res){
			var query = Product.find({'address.city':req.params.city}).select({ "category": 1, "_id": 0});
	    query.exec(function (err, someValue) {
	        if (err) {
							return next(err);
					}
					else{
						
						console.log(someValue);
						var categoryArray = [];
						for (var i = 0; i < someValue.length; i++) {
							var singleCategory = someValue[i].category;
							for (var j = 0; j< singleCategory.length; j++) {
								
								if(categoryArray.indexOf(singleCategory[j])==-1){
									categoryArray.push(singleCategory[j]);	
								}
							}
							
							
						}
							res.json(categoryArray);
					}

	    });
		});
	productRouter.route('/subCategories/:city')
		.get(function(req,res){
			var query = Product.find({'address.city':req.params.city}).select({ "subCategory": 1, "_id": 0});
	    query.exec(function (err, someValue) {
	        if (err) {
							return next(err);
					}
					else{
						var categoryArray = [];
						for (var i = 0; i < someValue.length; i++) {
							var singleCategory = someValue[i].category;
							if(categoryArray.indexOf(singleCategory)==-1){
								categoryArray.push(singleCategory);	
							}
							
						}
						
							res.json(categoryArray);
					}

	    });
		});
module.exports = productRouter;
