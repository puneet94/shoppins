'use strict';
var express = require('express');
var models = require('..//models/storeModel');
var Store = models.Store;
var Event = models.Event;

var eventRouter = express.Router();
var commons = require('./commonRouteFunctions');
eventRouter.use(function(req, res, next) {
	console.log("event");
	console.log(req.method, req.url);
	next();
});

eventRouter.route('/events')
	.get(function(req, res) {
		Event.find(function(err, events) {
			if (err) {
				res.send(err);
			}

			res.json(events);
		});
	});
eventRouter.route('/event/:eventId')
	.get(function(req, res) {
		Event.findById(req.params.eventId,function(err, event) {
			if (err) {
				res.send(err);
			}

			res.json(event);
		});
	});

/*get all the events of a single store*/
eventRouter.route('/store/:storeId')
	.get(function(req, res) {
		Event.find({ 'store': req.params.storeId })
			.exec(function(err, result) {
				if (err) {
					res.send(err);
				} else {

					res.json(result);
				}
			});


		
	});

eventRouter.route('/user/:userId')
	.get(function(req, res) {
		Event.find({ 'user': req.params.userId })
			.exec(function(err, result) {
				if (err) {
					res.send(err);
				} else {

					res.json(result);
				}
			});
});
eventRouter.route('/collection')
	.get(function(req, res) {
		var queryObj = {};
		console.log(req.query);
		if (req.query.area) {
			queryObj['address.area'] = req.query.area.toLowerCase();
		}
		if (req.query.store) {
			queryObj.store = req.query.store;
		}
		if (req.query.user) {
			queryObj.user = req.query.user;
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
			Event.paginate(queryObj, options).then(function(eventsList) {
				res.json(eventsList);

			});
		}
		catch(e){
			console.log(e);
		}


	});
module.exports = eventRouter;
