var express = require('express');
var authenticateRouter = express.Router();
var mongoose  = require('mongoose');
var models = require('..//models/storeModel');
var qs = require('querystring');
var moment = require('moment');
var request = require('request');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var User = models.User;

var facebookAuth  = require('../services/facebookAuth.js');

var createJWT = require('../services/jwtService.js');

authenticateRouter.route('/signup')
	.post(function(req,res){
		User.findOne({ email: req.body.email }, function(err, existingUser) {
	    if (existingUser) {
	      return res.status(409).send({ message: 'Email is already taken' });
	    }
	    var user = new User({
	      displayName: req.body.displayName,
	      email: req.body.email,
	      password: req.body.password,
				displayName:req.body.firstName + " "+req.body.lastName
	    });
	    user.save(function(err, result) {
	      if (err) {
	        res.status(500).send({ message: err.message });
	      }
	      res.send({user:result.toJSON(), token: createJWT(result) });
	    });
	  });
	});

authenticateRouter.route('/auth/facebook')
	.post(facebookAuth);

authenticateRouter.route('/login')
	.post(function(req,res){
		User.findOne({ email: req.body.email })
		.populate([{path:'storeId', select:'name address.area address.locality'}])
		.exec( function(err, user) {
			console.log(err);
	    if (!user) {
	      return res.status(401).send({ message: 'Invalid emails and/or password' });
	    }
	    user.comparePasswords(req.body.password, function(err, isMatch) {
	      if (!isMatch) {
	        return res.status(401).send({ message: 'Invalid emaild and/or password' });
	      }
	      res.send({ user:user.toJSON(),token: createJWT(user) });
	    });
  	});

});

authenticateRouter.route('/user/:userId')
	.get(function(req,res){
		User.findById(req.params.userId)
		.populate([{path:'storeId', select:'name address.area address.locality'}])
		.exec(function(err,user){
			if(err || !user){
				return res.status(401).send({ message: 'Invalid emails and/or password' });
			}
			else{
				res.send({ user:user.toJSON() });
			}
		})


});


function ensureAuthenticated(req, res, next) {
  if (!req.header('authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, "shhh..");
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}
module.exports = authenticateRouter;

//mongod.exe --storageEngine=mmapv1
