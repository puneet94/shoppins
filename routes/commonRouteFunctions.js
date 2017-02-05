'use strict';
var UserSearch = require('..//models/user_search');
var moment = require('moment');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var models = require('..//models/storeModel');
var Review = models.Review;
var User = models.User;
var Store = models.Store;
var Upvote = models.Upvote;
var Product = models.Product;
var cloudinary = require('cloudinary').v2;
var Activity = models.Activity;
var cob = {};
cob.connectionString = "mongodb://shop_dir:shop_dir@ds023912.mlab.com:23912/shoppins";
//cob.connectionString = "mongodb://shopdb:shopdb1234@ds029476.mlab.com:29476/shopdb";

cob.cloudUpload = function(req, res, callback) {
    var imgArray = [];
    var imgArrayMin = [];
    var size = req.files.length;
    var counter = 0;
    for (i = 0; i < size; i++) {
        cloudinary.uploader.upload(req.files[i].path, {
            eager: [
                { width: 112, height: 112, crop: "pad" }
            ]
        }, function(req, res) {
            imgArray.push(res.url);
            imgArrayMin.push(res.eager[0].url)
            counter = counter + 1;
            if (counter == size) {
                callback(imgArray, imgArrayMin);
            }
        });
    }
}
cob.saveSearchList = function(query, kind, location, req, res) {

    var delimiter = "#&#";
    var userSearchString = query + delimiter + kind + delimiter + location;
    var queryObj = {};
    queryObj.userSearchString = userSearchString;
    UserSearch
        .findOne(queryObj)
        .exec(function(findErr, userSearchFind) {
            if (findErr) {
                console.log(findErr);
                
            }
            
            if (userSearchFind) {
                
                userSearchFind.count = userSearchFind.count + 1;
                userSearchFind.save(function(saveErr) {
                    if (saveErr) {
                        console.log(saveErr);
                    }
                });
            }
            else{
                var userSearch = new UserSearch();
                userSearch.userSearchString = userSearchString;
                userSearch.location = location;
                userSearch.save(function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });

};
cob.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (!req.header('authorization')) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.header('authorization').split(' ')[1];
    //take from cookie
    var payload = null;
    try {
        payload = jwt.decode(token, "shhh..");
    } catch (err) {
        return res.status(401).send({ message: err.message });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
}
cob.ensureStoreAdminAuthenticated = function ensureStoreAdminAuthenticated(req, res, next) {
    if (req.user) {
        console.log(req.user);
    }
    console.log(req.params.storeId);
    Store
        .findById(req.params.storeId)
        .select('admin')
        .exec(function(err, store) {
            if(err){
                console.log('store authentication error');
                console.log(err);
            }
            if (store.admin == req.user) {
                console.log("this is used");
            }
        })

    next();
}
cob.validateId = function validateId(id, entityType) {


    return entityType.findById(mongoose.Types.ObjectId(id)).exec();


}
cob.storeRatingAvg = function(req, res) {
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
                res.json(avg / result.length);
            }
        });
}
cob.enterActivity = function(activ) {
    var activity = new Activity();
    activity.creator = activ.creator || null;
    activity.creatorStore = activ.creatorStore || null;
    activity.review = activ.review || null;
    activity.store = activ.store || null;
    activity.product = activ.product || null;
    activity.followed = activ.followed || null; // on which he created
    activity.statement = activ.statement;
    if(activity.creatorStore){
        activity.save(function(err, savedActivity) {
                    if (err) {
                        console.log(err);
                        
                    }
                    console.log("got saved here");
                    console.log(savedActivity);
                });    
    }
    else{
        User
        .findOne({ _id: activity.creator })
        .select('followers')
        .exec(function(err, output) {
            if (err) {
                console.log(err);
            } else {
                activity.save(function(err, savedActivity) {
                    if (err) {
                        console.log(err);
                        
                    }
                    console.log("got saved here2");
                    console.log(savedActivity);
                });
            }
        });    
    }
    

}
module.exports = cob;
