'use strict';
var express = require('express');
var models = require('..//models/storeModel');
var Store = models.Store;
var Offer = models.Offer;

var offerRouter = express.Router();
var commons = require('./commonRouteFunctions');
offerRouter.use(function(req, res, next) {
	console.log("offer");
	console.log(req.method, req.url);
	next();
});

offerRouter.route('/offers')
	.get(function(req, res) {
		Offer.find(function(err, offers) {
			if (err) {
				res.send(err);
			}

			res.json(offers);
		});
	});

/*get all the offers of a single store*/
offerRouter.route('/store/:storeId')
	.get(function(req, res) {
		Offer.find({ 'store': req.params.storeId })
			.exec(function(err, result) {
				if (err) {
					res.send(err);
				} else {

					res.json(result);
				}
			});


		/*
  Offer.paginate({'store':req.params.storeId},
    {page: req.params.pageNo, limit: 10 }, function(err, result) {
      if(err){
      res.send(err);
    }
    else{
      console.log(result);
      res.json(result);
    }
  });*/
	});


offerRouter.route('/collection')
	.get(function(req, res) {
		var queryObj = {};
		if (req.query.area) {
			queryObj['address.area'] = req.query.area.toLowerCase();
		}
		if (req.query.store) {
			queryObj.store = req.query.store;
		}
		if (req.query.location) {
			queryObj['address.city'] = req.query.location.toLowerCase();
		}
		if (req.query.category) {
			queryObj.category = req.query.category.toLowerCase();
		}
		if (req.query.type) {
			queryObj.type = req.query.type.toLowerCase();
		}
		if (req.query.eventDate) {
			queryObj.startDate = { '$lte': req.query.eventDate };
			queryObj.endDate = { '$gte': req.query.eventDate };
		}

		var options = {};
		options.limit = req.query.limit ? parseInt(req.query.limit) : null;
		options.sort = req.query.sort || null;
		options.page = req.query.page || null;
		options.select = req.query.fields || null;
		options.populate = req.query.populate || null;
		try {
			Offer.paginate(queryObj, options).then(function(offersList) {
				res.json(offersList);

			});
		}
		catch(e){
			console.log(e);
		}


	});
module.exports = offerRouter;
