'use strict';
var cryptService = require('./encryptionService.js');
var nodemailer = require("nodemailer");

var helper = require('sendgrid').mail;
var from_email = new helper.Email('app59858998@heroku.com');


var models = require('..//models/storeModel');
var MailVerify = models.MailVerify;

function sendEmail(req, res, userObj) {
	console.log("********************************************");
	var currentTime = new Date();
	currentTime = currentTime.toString();
	var token = Math.floor((Math.random() * 100) + 789) + ' ' + currentTime;
	var host = req.get('host');
	var encryptEmail = cryptService.encrypt(userObj.email);
	var encryptToken = cryptService.encrypt(token);

	var link = req.protocol + "://" + host + "/email/verify?id=" + encryptEmail + '&token=' + encryptToken;
	console.log('*********link************');
	console.log(link);
	var mailOptions = {
		to: userObj.email,
		subject: 'Email Verification Link From Ofline',
		html: "<h3>Hello"+userObj.name+" ,</h3><br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
	};
	var to_email = new helper.Email(userObj.email);
	var subject = mailOptions.subject;
	var content = new helper.Content('text/html', mailOptions.html);
	var mail = new helper.Mail(from_email, subject, to_email, content);

	var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
	var request = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON(),
	});
	sg.API(request, function(error, response) {
		console.log('*********link******options******');
		console.log(mailOptions);	
		console.log(response.statusCode);
		console.log(response.body);
		console.log(response.headers);
		var mailVerify = new MailVerify();
		mailVerify.token = token;
		mailVerify.email = userObj.email;
		mailVerify.save(function(err, result) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			res.send({ 'message': 'An email has been sent to ' + userObj.email + 'for verification. Check your email or spam folder and login again' });
		});
	});


	
	/*
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			console.log("Message sent: " + response.message);
			//res.send({ 'message': 'An email has been sent to ' + userObj.email + 'for verification. Check your email and login again' });
			var mailVerify = new MailVerify();
			mailVerify.token = token;
			mailVerify.email = userObj.email;
			mailVerify.save(function(err, result) {
				if (err) {
					console.log(err);
					res.send(err);
				}
				res.send({ 'message': 'An email has been sent to ' + userObj.email + 'for verification. Check your email or spam folder and login again' });
			});
		}
	});*/

}

var emailServiceObj = {
	sendEmail: sendEmail
};
module.exports = emailServiceObj;
