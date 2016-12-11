var express = require('express');
var models = require('..//models/storeModel');
var User = models.User;
var Store = models.Store;
var Chat = models.Chat;
var ChatRoom = models.ChatRoom;
var mongoose = require('mongoose');
var chatRouter = express.Router();
var commons = require('./commonRouteFunctions');
var ObjectId = require('mongoose').Schema.ObjectId;
var commons = require('./commonRouteFunctions');
chatRouter.use(function(req,res,next){
	console.log("chat");
	console.log(req.method,req.url);
	next();
});

chatRouter.route('/chatRooms/:creatorId')
.get(function(req,res){
	var creator = req.params.creatorId;
	ChatRoom.find({$or : [{creator1: creator}, {creator2: creator}]})
	.select('-chats')
	.populate({path: 'creator1',model: 'User',select: 'displayName picture'})
	.populate({path: 'creator2',model: 'User',select: 'displayName picture'})
	.populate({path: 'lastMessage',model: 'Chat',select: 'message '})
	.sort('-lastMessageTime')
	.exec(function(err,result){
		res.json(result);
	});
})
chatRouter.route('/chatBox/:creator1/:creator2')
.get(function(req,res){
	var creator1 = req.params.creator1;
	var creator2 = req.params.creator2;
	var queryObj = {};
	if(creator1 < creator2){
		queryObj.creator1 = creator1;
		queryObj.creator2 = creator2;
	}
	else{
	
		queryObj.creator2 = creator1;
		queryObj.creator1 = creator2;
	
	}
  	//myString.replace(/\D/g,'');
	ChatRoom.find(queryObj)
				.exec(function(err, result) {
					if(err){

						console.log(err);
						res.send(err);
					}
					else{
						
						console.log(result);
						if(result.length==0){
							console.log("chat not found");
							var chatRoom = new ChatRoom();
							chatRoom.creator1 = queryObj.creator1;
							chatRoom.creator2 = queryObj.creator2;
							chatRoom.save(function(saveErr,savedChatRoom){
								res.json(savedChatRoom);
							});
						}
						else{
							res.json(result);	
						}
						
					}
				});
})
chatRouter.route('/chats/:roomId')
.get(function(req,res){
  
  var queryObj = {};
  if(req.params.roomId){
  	queryObj._id = req.params.roomId;
  }
  
	ChatRoom.find(queryObj)
				
				.populate({
					path: 'chats',
					model: 'Chat',
					populate: {path: 'user',select: 'displayName picture',model: 'User'}
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
  var chat = new Chat();
  var recData = req.body;
  var io = req.io;
  var lastMessage;
  console.log(recData);
  chat.user=recData.user;
  chat.chatRoom = req.params.roomId;
  chat.message = recData.message;
  chat.save(function(err,savedMessage){
    if(err){
      if(err.code == 11000){
        return res.json({success:false,'message':'Chat already exists'});
      }
      else{
        console.log(err);
        return res.send(err);
      }
    }
    console.log("the save mesaage s");
    console.log(savedMessage);

    ChatRoom.findById(chat.chatRoom).exec(function(err,chatRoom){
    	if(err){

    	}
    	else{
    		chatRoom.lastMessage = savedMessage;
    		chatRoom.lastMessageTime = savedMessage.time;
    		chatRoom.save(function(err){
    			if(err){
    				console.log(err);
    			}
    			Chat.populate(savedMessage, {path:"user",select: 'displayName picture'}, function(err, popMessage) { 
    			io.to(req.params.roomId).emit('messageSaved',popMessage);
    			io.to(chatRoom.creator1).emit('newMessageReceived',popMessage);
    			io.to(chatRoom.creator2).emit('newMessageReceived',popMessage);
    			res.json({message:"Chat createdess"});
     			});
    			
    		})
    	}
    })
    
  });
});



module.exports = chatRouter;
