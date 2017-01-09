'use strict';

var models = require('..//models/storeModel');
var common = require('../routes/commonRouteFunctions');
var Offer = models.Offer;
var Store = models.Store;
var adminOfferController = {
  createOffer: createOffer,
  editOffer: editOffer,
  updateOffer: updateOffer,
  deleteOffer: deleteOffer
};

function createOffer(req, res) {
  var offer = new Offer();
  var item = req.body;
  offer.tagline = item.tagline;
  offer.description = item.description;
  offer.startDate = item.startDate;
  offer.endDate = item.endDate;
  offer.store = req.params.storeId;
  offer.category =item.category.map(function(item) {
        return item.toLowerCase();
    });
  offer.bannerImage = item.bannerImage;
  offer.images = item.images;
  offer.type = item.type.toLowerCase() || 'offer';


  Store.findById(req.params.storeid, function(err, store) {
    if (err) {
      console.log(err);
    } else {
      offer.address = store.address;
      offer.save(function(error, result) {
        if (error) {
          console.log("error" + error);
        } else {
          for (var i = 0; i < offer.category.length; i++) {
                    common.saveSearchList(offer.category[i].toLowerCase(), "offer-category", store.address.city.toLowerCase(), req, res);
                }
          /*common.saveSearchList(offer.name.toLowerCase(),"offer",offer.address.city,req,res);
          common.saveSearchList(offer.category.toLowerCase(),"offer-category",offer.address.city,req,res);
        */
          res.json(result);
        }
      });
    }
  });




}

function editOffer(req, res) {
  console.log(typeof req.query.select);
  Offer.findById(req.params.offerId)
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

function updateOffer(req, res) {

  Offer.findById(req.params.offerId, function(err, offer) {
    if (err) {
      console.log(err, null);
    } else {
      
      var item = req.body;
      offer.tagline = item.tagline;
      offer.description = item.description;
      offer.startDate = item.startDate;
      offer.endDate = item.endDate;
      offer.category =item.category.map(function(item) {
        return item.toLowerCase();
    });
      offer.bannerImage = item.bannerImage;
      offer.images = item.images;
      offer.type = item.type.toLowerCase() || 'offer';

      Store.findById(offer.store, function(err, store) {
        if (err) {
          console.log(err);
        } else {
          offer.address = store.address;
          offer.save(function(error, result) {
            if (error) {
              console.log("error" + error);
            } else {
              for (var i = 0; i < offer.category.length; i++) {
                    common.saveSearchList(offer.category[i].toLowerCase(), "offer-category", store.address.city.toLowerCase(), req, res);
                }
              /*common.saveSearchList(offer.name.toLowerCase(),"offer",offer.address.city,req,res);
          common.saveSearchList(offer.category.toLowerCase(),"offer-category",offer.address.city,req,res);
        */
              res.json(result);
            }
          });
        }
      });
    }
  });
}

function deleteOffer(req, res) {

  Offer.findById(req.params.offerId).remove().exec(function(err, store) {
        if (err) {
            console.log(err);
        } else {
            console.log("deleted");
            
        }
    });
}


module.exports = adminOfferController;
