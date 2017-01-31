'use strict';
var models = require('..//models/storeModel');
var common = require('../routes/commonRouteFunctions');
var Event = models.Event;
var Store = models.Store;
var adminEventController = {
	createEvent: createEvent,
	editEvent: editEvent,
	updateEvent: updateEvent,
	deleteEvent: deleteEvent
};

function createEvent(req, res) {
	console.log("cretae event hit");
	var event = new Event();
	var item = req.body;
	var address = {};
	event.tagline = item.tagline;
	event.description = item.description;
	event.startDate = item.startDate;
	event.endDate = item.endDate;
	event.store = req.params.storeId;
	event.category = item.category.map(function(item) {
		return item.toLowerCase();
	});
	for (var key in item.address) {
		if (item.address.hasOwnProperty(key)) {
			address[key] = item.address[key].toLowerCase();
		}
	}
	event.address = address;
	event.bannerImage = item.bannerImage;
	event.images = item.images;

	event.save(function(err, result) {
		if (err) {
			console.log(err);
		}
		common.saveSearchList(event.tagline.toLowerCase(), "event", event.address.city, req, res);
		for (var i = 0; i < event.category.length; i++) {
			common.saveSearchList(event.category[i].toLowerCase(), "event-category", event.address.city.toLowerCase(), req, res);
		}
		res.json(result);
	});

}

function editEvent(req, res) {
	console.log(typeof req.query.select);
	Event.findById(req.params.eventId)
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

function updateEvent(req, res) {

	Event.findById(req.params.eventId, function(err, event) {
		if (err) {
			console.log(err, null);
		} else {

			var item = req.body;
			event.tagline = item.tagline;
			var address = {};
			event.description = item.description;
			event.startDate = item.startDate;
			event.endDate = item.endDate;
			event.category = item.category.map(function(item) {
				return item.toLowerCase();
			});
			event.bannerImage = item.bannerImage;
			event.images = item.images;
			for (var key in item.address) {
				if (item.address.hasOwnProperty(key)) {
					address[key] = item.address[key].toLowerCase();
				}
			}
			event.address = address;

			event.save(function(error, result) {
				if (error) {
					console.log("error" + error);
				} else {
					common.saveSearchList(event.tagline.toLowerCase(), "event", event.address.city, req, res);
					for (var i = 0; i < event.category.length; i++) {
						common.saveSearchList(event.category[i].toLowerCase(), "event-category", event.address.city.toLowerCase(), req, res);
					}

					res.json(result);
				}
			});

		}
	});
}

function deleteEvent(req, res) {

	Event.findById(req.params.eventId).remove().exec(function(err, store) {
		if (err) {
			console.log(err);
		} else {
			console.log("deleted");

		}
	});
}


module.exports = adminEventController;
