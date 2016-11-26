var express = require('express');
var models = require('..//models/storeModel');
var cloudinary = require('cloudinary').v2;
var multer = require('multer');
var upload = multer({ dest: './uploads/'});



cloudinary.config({
    cloud_name: 'shoppingdirectory',
    api_key: '967339527283183',
    api_secret: '74NXckYl9m1-O0_ZTU8U_qoIDfw'
});

var Store = models.Store;
var User = models.User;
var Review = models.Review;

var UserSearch = require('..//models/user_search');
var userRouter = express.Router();
var commons = require('./commonRouteFunctions');

function updateStore(req, res){

}
userRouter.use(function(req,res,next){
	console.log("user");
	console.log(req.method,req.url);
	next();
});
userRouter.route('/singleUser/:user_id')
	.get(function(req,res){
    console.log(req.query.select);
		User.findById(req.params.user_id)
		.populate([{path:'storeId', select:req.query.select}])
		.exec(function(err,user){
			if(err){
				res.send(err);
			}
			else{
				user.reviews = null;
				user.upvotes = null;

				res.json(user);
			}
		})
	});
userRouter.route('/userReviews/:user_id')
	.get(function(req,res){
		var populateQuery = [{path:'store', select:'name'}, {path:'product', select:'name'}];
		Review.find({ user: req.params.user_id })

		.populate(populateQuery)
.exec(function (err, reviews) {
  if (err) {
  	return handleError(err)
  }
  else{
  	return res.json(reviews);
  }

})
	});


userRouter.route('/userFollowing/:user_id')
	.get(function(req,res){
		User.findOne({ _id: req.params.user_id })
		.select('_id following')
.populate('following', 'displayName picture followers')
.exec(function (err, followers) {
  if (err) {
  	return handleError(err)
  }
  else{
  	return res.json(followers.following);
  }

})
	});
userRouter.route('/userFollowers/:user_id')
	.get(function(req,res){

		User.findOne({ _id: req.params.user_id })
		.select('_id followers')
.populate('followers', 'displayName picture followers')
.exec(function (err, followers) {
  if (err) {
  	return handleError(err)
  }
  else{
  	return res.json(followers.followers);
  }

})
	});

userRouter.route('/submitFollow/:user_id/:followedUser_id')
	.post(commons.ensureAuthenticated,function(req,res){
		var user_id = req.params.user_id;
		var fold_id  = req.params.followedUser_id;
		commons.validateId(user_id,User).then(function(doc){
			commons.validateId(fold_id,User).then(function(doc2){
				User.update({_id:user_id},{$push:{'following':fold_id}},{upsert:true},function(err,data){
					if(err){

					}
					else{
						User.update({_id:fold_id},{$push:{'followers':user_id}},{upsert:true},function(err,data){
						if(err){
						}
						else{
							var activity = {};
    						activity.creator = user_id;
							activity.followed = fold_id;
							activity.statement = "followed";
							commons.enterActivity(activity);
							res.json('followers created');
						}
						})
					}
				})
			})
		});

	})

userRouter.route('/deleteFollow/:user_id/:followedUser_id')
	.post(commons.ensureAuthenticated,function(req,res){
		var user_id = req.params.user_id;
		var fold_id  = req.params.followedUser_id;
		commons.validateId(user_id,User).then(function(doc){
			commons.validateId(fold_id,User).then(function(doc2){

				User.update({_id:user_id},{$pull:{'following':fold_id}},{upsert:true},function(err,data){
					if(err){

					}
					else{
						User.update({_id:fold_id},{$pull:{'followers':user_id}},{upsert:true},function(err,data){
						if(err){

						}
						else{
							res.json('followers deleted');
						}
						})
					}
				})
			})
		});

	})

userRouter.route('/checkFollow/:user_id/:followedUser_id')
	.get(commons.ensureAuthenticated,function(req,res){
		var user_id = req.params.user_id;
		var fold_id  = req.params.followedUser_id;
		commons.validateId(user_id,User).then(function(doc){
			commons.validateId(fold_id,User).then(function(doc2){

				User.find({_id:user_id},function(err,data){
					if(err){
						console.log(err);
					}
					else{
						console.log('yoyoyoyoyo');
						console.log(data[0]);
						console.log(data[0].following.indexOf(fold_id));
						if(data[0].following.indexOf(fold_id)!=-1){
							return res.json(true);
						}
						else{
							return res.json(false);
						}
					}
				})
			})
		});

	})



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
		.post(commons.ensureAuthenticated,upload.single('file'), function(req,res){
			var file = req.file;
			var userId = req.params.userId;
			console.log("image upload");
			cloudinary.uploader.upload(file.path, function(reqc, resc) {
				var imgUrl = resc.url;
				console.log(imgUrl);

            User.findById(userId, function (err, item) {
              if (err){
                        callback(err, null);
              }
              else {
                        item.picture = imgUrl;
                        item.save(function (err, result) {
                          //callback(err, result);
													if(err){
														console.log(err)
													}
													res.send(imgUrl);

                        });
              }
            });


			});


		});





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
