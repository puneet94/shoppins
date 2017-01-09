'use strict';
var express = require('express');
var models = require('..//models/storeModel');
var cloudinary = require('cloudinary').v2;
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
var userController = require('../controller/userController');


cloudinary.config({
    cloud_name: 'shoppingdirectory',
    api_key: '967339527283183',
    api_secret: '74NXckYl9m1-O0_ZTU8U_qoIDfw'
});

var Store = models.Store;
var ReportStore = models.ReportStore;
var User = models.User;
var Review = models.Review;
var Activity = models.Activity;
var userRouter = express.Router();
var commons = require('./commonRouteFunctions');


userRouter.use(function(req, res, next) {
    console.log("user");
    console.log(req.method, req.url);
    next();
});
userRouter.route('/user/:user_id')
    .get(function(req, res ) {
        var options = {};
        console.log("the query for user");
        console.log(req.query.fields);
        options.select = req.query.fields || null;
        User.findById(req.params.user_id,options.select).exec(function(err,user) {
            if(err){
                console.log(err);
            }
            res.send(user);

        });

    });

userRouter.route('/singleUser/:user_id')
    .get(function(req, res) {
        console.log(req.query.select);
        User.findById(req.params.user_id)
            .populate([{ path: 'storeId', select: req.query.select }])
            .exec(function(err, user) {
                if (err) {
                    res.send(err);
                } if(user) {
                    
                    res.json(user);
                }
            });
    });
userRouter.route('/userReviews/:user_id')
    .get(function(req, res) {
        var populateQuery = [{ path: 'store', select: 'name' }, { path: 'product', select: 'name' }, { path: 'user' }];
        Review.find({ user: req.params.user_id })

        .populate(populateQuery)
            .exec(function(err, reviews) {
                if (err) {
                    console.log(err);
                } else {
                    return res.json(reviews);
                }

            });
    });


userRouter.route('/userFollowing/:user_id')
    .get(function(req, res) {
        User.findOne({ _id: req.params.user_id })
            .select('_id following')
            .populate('following', 'displayName picture followers')
            .exec(function(err, followers) {
                if (err) {
                    console.log(err);
                } else {
                    return res.json(followers.following);
                }

            });
    });
userRouter.route('/userFollowers/:user_id')
    .get(function(req, res) {

        User.findOne({ _id: req.params.user_id })
            .select('_id followers')
            .populate('followers', 'displayName picture followers')
            .exec(function(err, followers) {
                if (err) {
                    console.log(err);
                } else {
                    return res.json(followers.followers);
                }

            });
    });

userRouter.route('/submitFollow/:user_id/:followedUser_id')
    .post(commons.ensureAuthenticated, function(req, res) {
        var user_id = req.params.user_id;
        var fold_id = req.params.followedUser_id;
        commons.validateId(user_id, User).then(function(doc) {
            commons.validateId(fold_id, User).then(function(doc2) {
                User.update({ _id: user_id }, { $push: { 'following': fold_id } }, { upsert: true }, function(err, data) {
                    if (err) {

                    } else {
                        User.update({ _id: fold_id }, { $push: { 'followers': user_id } }, { upsert: true }, function(err, data) {
                            if (err) {} else {
                                var activity = {};
                                activity.creator = user_id;
                                activity.followed = fold_id;
                                activity.statement = "followed";
                                commons.enterActivity(activity);
                                res.json('followers created');
                            }
                        })
                    }
                });
            });
        });

    });

userRouter.route('/deleteFollow/:user_id/:followedUser_id')
    .post(commons.ensureAuthenticated, function(req, res) {
        var user_id = req.params.user_id;
        var fold_id = req.params.followedUser_id;
        commons.validateId(user_id, User).then(function(doc) {
            commons.validateId(fold_id, User).then(function(doc2) {

                User.update({ _id: user_id }, { $pull: { 'following': fold_id } }, { upsert: true }, function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        User.update({ _id: fold_id }, { $pull: { 'followers': user_id } }, { upsert: true }, function(err, data) {
                            if (err) {

                            } else {
                                var activityObj = {};
                                activityObj.followed = fold_id;
                                activityObj.creator = user_id;
                                activityObj.statement = "followed";
                                Activity.findOne(activityObj).remove().exec(function(err, data) {
                                    console.log("activity deleted");
                                    console.log(data);
                                });
                                res.json('followers deleted');
                            }
                        })
                    }
                })
            })
        });

    })

userRouter.route('/checkFollow/:user_id/:followedUser_id')
    .get(commons.ensureAuthenticated, function(req, res) {
        var user_id = req.params.user_id;
        var fold_id = req.params.followedUser_id;
        commons.validateId(user_id, User).then(function(doc) {
            commons.validateId(fold_id, User).then(function(doc2) {

                User.find({ _id: user_id }, function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data[0]);
                        console.log(data[0].following.indexOf(fold_id));
                        if (data[0].following.indexOf(fold_id) != -1) {
                            return res.json(true);
                        } else {
                            return res.json(false);
                        }
                    }
                })
            })
        });

    });

userRouter.route('/submitStoreReport')
    .post(commons.ensureAuthenticated, function(req, res) {
        var recData = req.body;
        var reportStore = new ReportStore();
        reportStore.description = recData.description;
        reportStore.store = recData.storeId;
        reportStore.user = recData.userId;
        reportStore.save(function(err, savedReportStore) {
            if (err) {
                res.send(err);
            }
            res.json(savedReportStore);
        });

    });

userRouter.route('/checkPassword/:user_id')
    .post(commons.ensureAuthenticated, function(req, res) {
        var recData = req.body;
        var password = recData.password;
        User.findById(req.params.user_id).exec(function(err,user){
            user.comparePasswords(password, function(err, isMatch) {
                    if(err){
                        console.log("the error");
                        console.log(err);
                        
                    }
                    res.send(isMatch);
                    
                    
                });
        });

    });

userRouter.route('/changePassword/:user_id')
    .post(commons.ensureAuthenticated, function(req, res) {
        var recData = req.body;
        var password = recData.password;
        User.findById(req.params.user_id).exec(function(err,user){
            user.password = password;
            user.save(function(err,result){
                if(err){
                    console.log(err);
                }
                if(result){
                    console.log("password changed");
                    res.send({'message':'password changed'});
                    
                }
            });
        });

    });

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

// Requires controller


// Example endpoint
/*userRouter.route('/upload/profileImage/:userId')
	.post(commons.ensureAuthenticated, multipartyMiddleware, function(req,res){
		var file = req.files.file;
		console.log(file);
		console.log(file.type);
		cloudinary.uploader.upload(file.path, function(result2) {
			console.log(result2);
		});


	});*/
userRouter.route('/upload/profileImage/:userId')
    .post(commons.ensureAuthenticated, upload.single('file'), function(req, res) {
        var file = req.file;
        var userId = req.params.userId;
        console.log("image upload");
        cloudinary.uploader.upload(file.path, function(reqc, resc) {
            var imgUrl = resc.url;
            console.log(imgUrl);

            User.findById(userId, function(err, item) {
                if (err) {
                    callback(err, null);
                } else {
                    item.picture = imgUrl;
                    item.save(function(err, result) {
                        //callback(err, result);
                        if (err) {
                            console.log(err)
                        }
                        res.send(imgUrl);

                    });
                }
            });


        });


    });
    userRouter.route('/collection')
    .get(function(req, res) {
        var queryObj = {};
        if(req.query.userSearch){
            var userRe = new RegExp(req.query.userSearch.toLowerCase(), "i");
        queryObj.$or = [{ 'firstName': { $regex: userRe }}, { 'lastName': { $regex: userRe }},{ 'displayName': { $regex: userRe }}];
        }
        
        
        var options = {};
        options.limit = req.query.limit ? parseInt(req.query.limit) : null;
        options.sort = req.query.sort || null;
        options.page = req.query.page || null;
        options.select = req.query.fields || null;
        options.populate = req.query.populate || null;

        User.paginate(queryObj, options).then(function(userList) {
            res.json(userList);

        });

    });




userRouter.route('/updateUser/:user_id').post(commons.ensureAuthenticated, userController.updateUser);

module.exports = userRouter;


/****
added
User.findById(req.params.user_id,function(err,user){
			if(err){
				res.send(err);
			}
			else{

				User.findById(req.params.followedUser_id,function(err,followedUser){
			if(err){
				res.send(err);
			}
			else{
				User.update({_id:user_id},{$push:{'following':fold_id}},{upsert:true},function(err,data){
					if(err){

					}
					else{
						User.update({_id:fold_id},{$push:{'followers':user_id}},{upsert:true},function(err,data){
					if(err){

					}
					else{
						res.json('followers created');
					}
				})
					}
				})

			}
		})*/
