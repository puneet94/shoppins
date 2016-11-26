var express = require('express');
var models = require('..//models/storeModel');
var User = models.User;
var Store = models.Store;
var Visit = models.Visit;
var mongoose = require('mongoose');
var visitRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
visitRouter.use(function(req,res,next){
	console.log("review");
	console.log(req.method,req.url);
	next();
});

/*finding the reviews of a particular store using the store id*/
visitRouter.route('/visits/:visitId')
.delete(commons.ensureAuthenticated,function(req,res){
  var visitId = req.params.visitId;
	Visit.findOne({'_id':visitId})
				.exec(function(err, visit) {
						if(err){
						res.send(err);
					}
					else{
						visit.remove(function (err) {
        			res.send('removed viit');
    				});
					}
				});
});
visitRouter.route('/visits')
.delete(commons.ensureAuthenticated,function(req,res){
  	var queryObj = {};
  	queryObj.user = req.query.userId;
  	if(req.query.storeId){
  		queryObj.store =req.query.storeId; 
  	}
  	else if(req.query.productId){
  		queryObj.product =req.query.productId; 
  	}
	Visit.findOne(queryObj)
				.exec(function(err, visit) {
						if(err){
						res.send(err);
					}
					else{
						visit.remove(function (err) {
        			res.send('removed viit');
    				});
					}
				});
});

visitRouter.route('/visited')
.get(function(req,res){
	var entityId;
	var entity = '';
	var queryObj = {};
	var userId = req.query.userId;
	queryObj.user = userId
	if(req.query.storeId){
		entityId = req.query.storeId;
		queryObj.store = entityId
	}
	else if(req.query.productId){
		entityId = req.query.productId;
		
		queryObj.product = entityId;
	}
  
	Visit.find(queryObj)
				.exec(function(err, result) {
						if(err){
							console.log(err);
						res.send(err);
					}
					else{
						res.json(result);
					}
				});
})
visitRouter.route('/visits/store/')
.get(function(req,res){
  
  var queryObj = {};
  if(req.body.storeId){
  	queryObj.store = req.body.storeId;
  }
  else if(req.body.productId){
  	queryObj.product = req.body.productId;	
  }
	Visit.find(queryObj)
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
  var visit = new Visit();
  var recData = req.body;
  var activity = {};
  activity.creator = recData.userId; 
  var activityString  = "";
  visit.user=recData.userId;

  if(recData.storeId){
  	console.log("if entred");
  	visit.store = mongoose.Types.ObjectId(recData.storeId);
  	activityString = "visited store";
  	activity.store = visit['store'];
  }

  else if(recData.productId){
  	console.log("ëntering the else");
  	visit.product = mongoose.Types.ObjectId(recData.productId);
  	activityString = "purchased product";
  	activity.product = visit['product'];
  }
  
  visit.save(function(err){
    if(err){
      if(err.code == 11000){
        return res.json({success:false,'message':'Visit already exists'});
      }
      else{
        console.log(err);
        return res.send(err);
      }
    }
    activity.statement = activityString;
	commons.enterActivity(activity);
    res.json({message:"Visit createdess"});
  });
});

visitRouter.route('/visits/user/')
.get(function(req,res){
  var userId = req.body.userId;
	Visit.find({'user':userId})
				.populate({
					path: 'store',
					model: 'Store'
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

visitRouter.route('/visits/product/')
.get(function(req,res){
  var productId = req.body.productId;
	Visit.find({'product':productId})
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
  var visit = new Visit();
  var recData = req.body;
  visit.user=recData.userId;
  visit.product = mongoose.Types.ObjectId(recData.productId);
  visit.save(function(err){
    if(err){
      if(err.code == 11000){
        return res.json({success:false,'message':'Visit already exists'});
      }
      else{
        console.log(err);
        return res.send(err);
      }
    }
    res.json({message:"Visit created"});
  });
});

module.exports = visitRouter;
