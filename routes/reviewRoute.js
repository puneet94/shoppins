'use strict';
var express = require('express');
var models = require('..//models/storeModel');
var Review = models.Review;
var Store = models.Store;
var mongoose = require('mongoose');
var reviewRouter = express.Router();
var commons = require('./commonRouteFunctions');

reviewRouter.use(function(req, res, next) {
    console.log("review");
    console.log(req.method, req.url);
    next();
});

reviewRouter.route('/reviews')
    .get(function(req, res) {
        Review.find(function(err, reviews) {
            if (err) {
                res.send(err);
            }
            res.json(reviews);
        });
    });



    reviewRouter.route('/ratingAvg/:storeId').
    get(function(req,res){
        console.log("params id");
        console.log( req.params.storeId);
        
    });
reviewRouter.route('/ratings/store/:storeId')
    .get(function(req, res) {
        Review.find({ 'store': req.params.storeId })
            .select('rating -_id')
            .exec(function(err, result) {
                if (err) {
                    res.send(err);
                } else {
                    var avg = 0;
                    for (var i = 0; i < result.length; i++) {
                        avg = avg + parseInt(result[i].rating);
                    }
                    if (result.length === 0) {
                        res.json(0);
                    } else {
                        res.json(avg / result.length); //chek	
                    }

                }
            });
    });
reviewRouter.route('/collection')
    .get(function(req, res) {
        var queryObj = {};
        if (req.query.store) {
            queryObj.store = req.query.store;
        }
        if (req.query.product) {
            queryObj.product = req.query.product;
        }
        if (req.query.user) {
            queryObj.user = req.query.user;
        }
        var options = {};
        options.limit = req.query.limit ? parseInt(req.query.limit) : null;
        options.sort = req.query.sort || null;
        options.page = req.query.page || null;
        options.select = req.query.fields || null;
        options.populate = {path: 'user',model: 'User'};
        Review.paginate(queryObj, options).then(function(storeList) {
            res.json(storeList);

        });

    });

reviewRouter.route('/reviews/store/:storeId')
    .get(function(req, res) {
        Review.find({ 'store': req.params.storeId })
            .populate({
                path: 'user',
                model: 'User'
            })
            .exec(function(err, result) {
                if (err) {
                    res.send(err);
                } else {

                    res.json(result);
                }
            });


        
    })
    .post(commons.ensureAuthenticated, function(req, res) {
        var review = new Review();
        var recData = req.body;

        review.description = recData.description;
        review.user = recData.userId;
        review.store = mongoose.Types.ObjectId(req.params.storeId);
        review.rating = recData.rating;



        review.save(function(err, rev_saved) {
            if (err) {
                if (err.code == 11000) {
                    return res.json({ success: false, 'message': 'Review already exists' });
                } else {
                    console.log(err);
                    return res.send(err);

                }
            }
            Review.find({ 'store': req.params.storeId }).select({rating:1,_id:-1}).then(function(ratings){
                var sum = 0;
                console.log(ratings);
                for( var i = 0; i < ratings.length; i++ ){
                    sum += parseInt( ratings[i].rating, 10 ); //don't forget to add the base
                }

                var avg = sum/ratings.length;
                console.log('***********avg**********');
                console.log(avg);

                Store.findById(req.params.storeId).then(function(store){
                    store.rating = avg;
                    console.log("***********store rating***************");
                    console.log("store rating"+avg);
                    store.save();
                
                });
             });
            var activity = {};
            activity.creator = review.user;
            activity.review = rev_saved._id;
            activity.statement = "reviewed store";
            commons.enterActivity(activity);
            res.json({ message: "Review created" });
        });
    });

reviewRouter.route('/reviews/product/:productId')
    .get(function(req, res) {
        Review.find({ 'product': req.params.productId })
            .populate({
                path: 'user',
                model: 'User'
            })
            .exec(function(err, result) {
                if (err) {
                    res.send(err);
                } else {

                    res.json(result);
                }
            });
    })
    .post(commons.ensureAuthenticated, function(req, res) {

        var review = new Review();
        var recData = req.body;

        review.description = recData.description;
        review.user = recData.userId;
        review.product = mongoose.Types.ObjectId(req.params.productId);
        review.rating = recData.rating;



        review.save(function(err, rev_saved) {
            if (err) {
                if (err.code == 11000) {
                    return res.json({ success: false, 'message': 'Review already exists' });
                } else {
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
            res.json({ message: "Review created" });
        });
    })


module.exports = reviewRouter;
