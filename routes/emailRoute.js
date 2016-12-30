'use strict';
var express = require('express');
var nodemailer = require("nodemailer");
var emailRouter = express.Router();
var cryptService = require('../services/encryptionService.js');
var emailService = require('../services/emailService.js');
var models = require('..//models/storeModel');
var MailVerify = models.MailVerify;
var User = models.User;

var app = express();


app.set('view engine', "jade");
emailRouter.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});


function verify(req, res) {
	var host = req.get('host');
	var userEmail = cryptService.decrypt(req.query.id);
	var token = cryptService.decrypt(req.query.token);
	var domain = req.protocol + "://" + req.get('host');
	if (domain == ("http://" + host) || domain == ("https://" + host)) {
		console.log("Domain is matched. Information is from Authentic email");
		MailVerify
			.findOne({ email: userEmail, token: token })
			.exec(function(err, foundVerifyUser) {
				if (err) {
					console.log(err);
					res.send(err);
				}
				User.findOne({ email: foundVerifyUser.email })
					.exec(function(err, foundUser) {
						foundUser.verified = true;
						foundUser.save(function(err, result) {
							if (err) {
								console.log(err);
								res.send(err);
							}
							app.render('email/emailVerify', { result: result,domain:domain }, function(err, html) {

								if (err) {
									console.log(err);
								}
								console.log(html);
								res.send(html);

							});
							//console.log("verified user saved");
							//res.send(result);
						});
					});

			});
	} else {
		res.send("<h1>Request is from unknown source</h1>");
	}

	console.log(req.protocol + "://" + req.get('host'));

}

emailRouter.route('/verify')
	.get(function(req, res) {

		verify(req, res);
	});


emailRouter.route('/sendEmail')
	.get(function(req, res) {

		emailService.sendEmail(req, res, req.query.email);
	});


module.exports = emailRouter;
