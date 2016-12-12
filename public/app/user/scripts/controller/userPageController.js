(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserPageController',["$scope","$auth",'$routeParams',"userData","userService",UserPageController]);
  function UserPageController($scope,$auth,$routeParams,userData,userService){
    var upc = this;
    activate();
    upc.currentUserData = {};
    upc.loading = true;
    upc.authCheck = $auth.isAuthenticated();
    upc.submitUserFollow = submitUserFollow;
    upc.deleteUserFollow = deleteUserFollow;
    upc.userFollowed = userFollowed;
    upc.currentProfileUser = $routeParams.userId;
    upc.loggedUser = userData.getUser()._id;
    upc.currentUser = currentUser;

    function currentUser(){
      return ($routeParams.userId == userData.getUser()._id);
    }
    function submitUserFollow(userId){
      userService.submitUserFollow(userData.getUser()._id,userId).then(function(res){
        userData.setUser();
      },function(res){

      });
    }

    function deleteUserFollow(userId){
      userService.deleteUserFollow(userData.getUser()._id,userId).then(function(res){
        var index = userData.getUser().following.indexOf(userId);
        userData.setUser();

      },function(res){

      });
    }

    function userFollowed(userId){

      if(userData.getUser().following.indexOf(userId)!=-1){

        return true;
      }
      return false;
    }
    function activate(){
      upc.loading = true;
      userService.getSingleUser($routeParams.userId)
    .then(function(res){
        upc.currentUserData = res.data;
        upc.loading = false;
        
      });
    }


    }

})(window.angular);
