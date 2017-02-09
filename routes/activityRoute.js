'use strict';
var express = require('express');
var models = require('..//models/storeModel');

var User = models.User;

var Activity = models.Activity;

var activityRouter = express.Router();

var app = express();
var moment = require('moment');

app.set('view engine', "jade");
activityRouter.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

function getActivity(req, res, usersList) {
    var queryObj = {};
    if (usersList) {
        queryObj = { $or: [{ creator: { $in: usersList } }, { creatorStore: { $in: usersList } }] };
        //queryObj.creator = { $in: usersList };
    }
    var options = {};
    options.limit = req.query.limit ? parseInt(req.query.limit) : 2;
    options.sort = req.query.sort ||{
        time: -1 //Sort by Date Added DESC
    };
    options.page = req.query.page || 1;
    options.select = req.query.fields || null;
    options.populate = [{ path: 'creator', model: 'User', select: 'displayName picture' },
        { path: 'creatorStore', select: 'name bannerImage', model: 'Store' },
        { path: 'followed', model: 'User', select: 'displayName picture' },
        { path: 'store', select: 'name bannerImage', model: 'Store' },
        { path: 'product', select: 'name images', model: 'Product' },
        { path: 'review', model: 'Review', populate: { path: 'store', select: 'name bannerImage', model: 'Store' } },
        { path: 'review', model: 'Review', populate: { path: 'product', select: 'name images', model: 'Product' } },
        { path: 'review', model: 'Review', populate: { path: 'user', select: 'displayName', model: 'User' } }
    ];

    Activity.paginate(queryObj, options).then(function(activities) {    
        app.render('activity/userActivity', { activity: activities.docs, moment: moment }, function(err, html) {

            if (err) {
                console.log(err);
            }
            res.send(html);

        });

    });
    /*Activity
        .find(queryObj)
        .sort({ 'time': 'desc' })
        .populate({ path: 'creator', model: 'User', select: 'displayName picture' })
        .populate({ path: 'followed', model: 'User', select: 'displayName picture' })
        .populate({ path: 'store', select: 'name bannerImage', model: 'Store' })
        .populate({ path: 'product', select: 'name images', model: 'Product' })
        .populate({ path: 'review', model: 'Review', populate: { path: 'store', select: 'name bannerImage', model: 'Store' } })
        .populate({ path: 'review', model: 'Review', populate: { path: 'product', select: 'name images', model: 'Product' } })
        .populate({ path: 'review', model: 'Review', populate: { path: 'user', select: 'displayName', model: 'User' } })
        //.lean()
        .exec(function(err, activities) {
            if (err) {
                res.send(err);
            } else {

                app.render('activity/userActivity', { activity: activities, moment: moment }, function(err, html) {

                    if (err) {
                        console.log(err);
                    }
                    res.send(html);

                });
            }
        });*/
}
activityRouter.route('/userFollowingActivity/:userId')
    .get(function(req, res) {

        var followingList = [];
        try {
            User
                .findById(req.params.userId)
                .select('following storeFollowing')
                .exec(function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        followingList = result.following.concat(result.storeFollowing);
                        getActivity(req, res, followingList);
                    }

                });

            console.log(followingList);
        } catch (e) {
            console.log(e);
        }
    });
activityRouter.route('/singleUserActivity/:userId')
    .get(function(req, res) {
        console.log('**************in here*************');
        var followingList = [];
        User
            .findById(req.params.userId)
            .select('_id')
            .exec(function(err, result) {
                followingList = [req.params.userId];

                getActivity(req, res, followingList);
            });

        console.log(followingList);
    });

activityRouter.route('/allActivity/')
    .get(function(req, res) {
        getActivity(req, res);
    });


module.exports = activityRouter;
