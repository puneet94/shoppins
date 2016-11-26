var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cloudinary = require('cloudinary').v2;
var models = require('..//models/storeModel');
var Offer = models.Offer;
var Store = models.Store;
var User = models.User;
var jwt = require('jsonwebtoken');
var common = require('../routes/commonRouteFunctions');
var adminOfferController = {
  createOffer: createOffer,
  editOffer: editOffer,
  updateOffer: updateOffer,
  deleteOffer: deleteOffer
};
function createOffer(req, res){
  var offer = new Offer();
  item = req.body;
  offer.headline = item.headline;
  offer.description = item.description;
  offer.startDate = item.startDate; 
  offer.endDate = item.endDate; 
  offer.store = req.params.storeId;
  offer.category = item.category.split(',');
  offer.subCategory = item.subCategory.split(',');
  offer.bannerImage = item.bannerImage;
  offer.images = item.images;
  offer.imagesMin = item.imagesMin;

  Store.findById(req.params.storeid,function(err,store){
    if(err){
      console.log(err);
    }
    else{
      //offer.address = store.address;
      offer.save(function (error,result) {
        if (error){
          console.log("error" + error);
        }
        else{
          /*common.saveSearchList(offer.name.toLowerCase(),"offer",offer.address.city,req,res);
          common.saveSearchList(offer.category.toLowerCase(),"offer-category",offer.address.city,req,res);
          common.saveSearchList(offer.subCategory.toLowerCase(),"offer-subcategory",offer.address.city,req,res);*/
          res.json(result);
        }
      });
    }
  });
  


         
}

function editOffer(req, res){
  console.log(typeof req.query.select);
  Offer.findById(req.params.offerId)
  .select(req.query.select)
  .exec(function (error, result) {
    if (error){
      console.log("error while reading");
    }
    else{
      console.log(result);
      res.json(result);
    }
  });
 }

function updateOffer(req, res){
  
  Offer.findById(req.params.offerId, function (err, offer) {
    if (err){
      callback(err, null);
    }
    else {
      item = req.body;
      offer.headline = item.headline;
      offer.description = item.description;
      offer.startDate = item.startDate; 
      offer.endDate = item.endDate; 
      offer.store = req.params.storeId;
      offer.category = item.category.split(',');
      offer.subCategory = item.subCategory.split(',');
      offer.bannerImage = item.bannerImage;
      offer.images = item.images;
      offer.imagesMin = item.imagesMin;

      offer.save(function (err, result) {
        res.json(result);
      });
    }
  });
}
function deleteOffer(req, res){
  
  Offer.findById(req.params.offerId, function (err, offer) {
    if (err){
      callback(err, null);
    }
    else {
      
    }
  });
}


module.exports = adminOfferController;
