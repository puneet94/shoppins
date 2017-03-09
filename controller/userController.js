'use strict';
var models = require('..//models/storeModel');
var User = models.User;


var userController = {
  createUser: createUser,
  editUser: editUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};

function createUser(req, res) {
  var user = new User();

  var item = req.body;
  user.name = item.name.toLowerCase();



  user.bannerImage = item.bannerImage;
  user.userImages = item.userImages;
  user.phone = item.phone;


  user.save(function(error, result) {
    if (error) {
      console.log("error" + error);
    }
    else {

      res.json(result);
    }
  });


}

function editUser(req, res) {
  User.findById(req.params.userId)
    .select(req.query.select)
    .exec(function(error, result) {
      if (error) {
        console.log("error while reading");
      }
      else {
        res.json(result);
      }
    });
}

function updateUser(req, res) {
	
  User.findById(req.params.user_id, function(err, user) {
    if (err) {
    	console.log(err);
    }
    

      var item = req.body;
      if(item.firstName){
        user.firstName = item.firstName.toLowerCase();  
      }
      if(item.lastName){
        user.lastName = item.lastName.toLowerCase() ;  
      }
      
      if(item.displayName){
        user.displayName = item.displayName;  
      }
      
      if(item.phone){
        user.phone = item.phone;  
      }
      
      if(item.bio){
        user.bio = item.bio;  
      }
      
      if(item.status){
        user.status = item.status;  
      }

      if(item.longitude && item.latitude){
        user.loc = [item.longitude,item.latitude];
      }
      


      // user.bannerImage = item.bannerImage;
      // user.userImages = item.userImages;
      user.save(function(err, result) {
        if (err) {
          console.log(err);
        }
        res.json(result);
      });
    
  });
}

function deleteUser(req, res) {

  User.findById(req.params.userId, function(err, user) {
    if (err) {
      callback(err, null);
    }
    else {

    }
  });
}


module.exports = userController;
