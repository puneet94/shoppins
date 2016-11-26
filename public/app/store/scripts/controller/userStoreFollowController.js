(function(angular){
  angular.module('app.store')

    .controller('UserStoreFollowController',["$scope","$auth","$routeParams","userData","userFollowService",UserStoreFollowController]);

    function UserStoreFollowController($scope,$auth,$routeParams,userData,userFollowService){
      var usu = this;
      usu.follow = {};
      usu.followCheck = false;
      usu.getFollowParamObj = {};
      usu.submitFollow = submitFollow;
      usu.deleteFollow = deleteFollow;
      usu.getFollowParamObj.userId = userData.getUser()._id;
      usu.userStoreFollowed = false;

      activate();      
      function userStoreFollowed(){        
      }
      function submitFollow(){
        userFollowService.submitFollow(usu.follow)
            .then(function(res){
                    usu.userStoreFollowed = true;
                    userData.setUser();
                    
                  },
                  function(res){
                    console.log(res);
                  });
      }
      function deleteFollow(){
        userFollowService.deleteFollow(usu.follow)
            .then(function(res){
              usu.userStoreFollowed = false;
              userData.setUser();
              
             
            },
              function(res)
              {
                console.log(res);
              });
      }
      
      function activate(){
       
       usu.follow.userId = userData.getUser()._id;
        if($routeParams.storeId){
        usu.entity = $routeParams.storeId;
        usu.follow.storeId = $routeParams.storeId;
        
      }
      else if($routeParams.productId){
        usu.entity = $routeParams.productId;
        usu.follow.productId = $routeParams.productId;
        usu.getFollowParamObj.productId = $routeParams.productId;
      }
      if($auth.isAuthenticated()){
        if(userData.getUser().storeFollowing.indexOf($routeParams.storeId)!=-1){
          usu.userStoreFollowed = true;
        }
        
      }
      }

    }

})(window.angular);
