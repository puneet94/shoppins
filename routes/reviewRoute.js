var express = require('express');
var models = require('..//models/storeModel');
var Review = models.Review;
var User = models.User;
var Store = models.Store;
var Activity = models.Activity;
var mongoose = require('mongoose');
var reviewRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
reviewRouter.use(function(req,res,next){
	console.log("review");
	console.log(req.method,req.url);
	next();
});

reviewRouter.route('/reviews')
	.get(function(req,res){
		Review.find(function(err,reviews){
			if(err){
				res.send(err);
			}
			res.json(reviews);
		})
	});
reviewRouter.route('/ratings/store/:storeId')
.get(function(req,res){
	Review.find({'store':req.params.storeId})
		.select('rating -_id')
		.exec(function(err, result) {
				if(err){
				res.send(err);
			}
			else{
				var avg = 0;
				for (var i = 0; i < result.length; i++) {
					avg = avg + parseInt(result[i].rating);
				}
				if(result.length==0){
					res.json(0);
				}else{
					res.json(avg/result.length);//chek	
				}
				
			}
		});
});
reviewRouter.route('/reviews/store/:storeId')
.get(function(req,res){
	Review.find({'store':req.params.storeId})
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


	/*
  Review.paginate({'store':req.params.storeId},
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
  var review = new Review();
  var recData = req.body;
  
  review.description=recData.description;
  review.user=recData.userId;
  review.store = mongoose.Types.ObjectId(req.params.storeId);
	review.rating = recData.rating;



  review.save(function(err,rev_saved){
    if(err){
      if(err.code == 11000){
        return res.json({success:false,'message':'Review already exists'});
      }
      else{
        console.log(err);
        return res.send(err);

      }
    }
    var activity = {};
    activity.creator = review.user; 
	activity.review = rev_saved._id;
	activity.statement = "reviewed store";
	commons.enterActivity(activity);
    res.json({message:"Review created"});
  });
})

reviewRouter.route('/reviews/product/:productId')
	.get(function(req,res){
		Review.find({'product':req.params.productId})
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
		
  var review = new Review();
  var recData = req.body;

  review.description=recData.description;
  review.user=recData.userId;
  review.product = mongoose.Types.ObjectId(req.params.productId);
	review.rating = recData.rating;



  review.save(function(err,rev_saved){
    if(err){
      if(err.code == 11000){
        return res.json({success:false,'message':'Review already exists'});
      }
      else{
      	console.log("gerereerere");
        console.log(err);
        return res.send(err);

      }
    }

    var activity = {};
    activity.creator = review.user; 
	activity.review = rev_saved._id;
	activity.statement = "reviewed product";
	commons.enterActivity(activity);
    res.json({message:"Review created"});
  });
})


module.exports = reviewRouter;
