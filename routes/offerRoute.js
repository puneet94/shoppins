var express = require('express');
var models = require('..//models/storeModel');
var Store = models.Store;
var Activity = models.Activity;
var mongoose = require('mongoose');
var offerRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
offerRouter.use(function(req,res,next){
	console.log("offer");
	console.log(req.method,req.url);
	next();
});

offerRouter.route('/offers')
	.get(function(req,res){
		Offer.find(function(err,offers){
			if(err){
				res.send(err);
			}

			res.json(offers);
			//res.render("stores",{"stores":stores});
		})
	});

/*get all the offers of a single store*/
offerRouter.route('/offers/store/:storeId')
.get(function(req,res){
	Offer.find({'store':req.params.storeId})
				.exec(function(err, result) {
						if(err){
						res.send(err);
					}
					else{

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
})
.post(commons.ensureAuthenticated,function(req,res){
  var offer = new Offer();
  var recData = req.body;
  var offerAdmin;
  offer.description=recData.description;
  offer.headline=recData.headline;
  offer.category=recData.category;
  offer.subCategory=recData.subCategory;
  offer.store = mongoose.Types.ObjectId(req.params.storeId);
  Store.findById(mongoose.Types.ObjectId(req.params.storeid).
  	.select('admin')
  	.exec(function(err,store){
				if(err){

				}
				else{
					offerAdmin = store.admin;
					offer.save(function(err,offer_saved){
					    if(err){
					      if(err.code == 11000){
					        return res.json({success:false,'message':'Offer already exists'});
					      }
					      else{
					        console.log(err);
					        return res.send(err);

					      }
					    }
					    var activity = {};
					    activity.creator = offerAdmin; 
					    activity.creatorStore = offer.store; 
						activity.offer = offer_saved._id;
						activity.statement = " created offer";
						commons.enterActivity(activity);
					    res.json({message:"Offer created"});
  					});
				}
			});
  


  
})

offerRouter.route('/offers/product/:productId')
	.get(function(req,res){
		Offer.find({'product':req.params.productId})
				.populate({
					path: 'user',
					model: 'User'
				})
				.exec(function(err, result) {
						if(err){
						res.send(err);
					}
					else{

						res.json(result);
					}
				});
	})
	.post(commons.ensureAuthenticated,function(req,res){
		
  var offer = new Offer();
  var recData = req.body;

  offer.description=recData.description;
  offer.user=recData.userId;
  offer.product = mongoose.Types.ObjectId(req.params.productId);
	offer.rating = recData.rating;



  offer.save(function(err,rev_saved){
    if(err){
      if(err.code == 11000){
        return res.json({success:false,'message':'Offer already exists'});
      }
      else{
      	console.log("gerereerere");
        console.log(err);
        return res.send(err);

      }
    }

    var activity = {};
    activity.creator = offer.user; 
	activity.offer = rev_saved._id;
	activity.statement = "offered product";
	commons.enterActivity(activity);
    res.json({message:"Offer created"});
  });
})


module.exports = offerRouter;
