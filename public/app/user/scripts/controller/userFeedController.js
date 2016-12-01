(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserFeedController',["$scope","$auth","activityService",'NgMap',UserFeedController]);
  function UserFeedController($scope,$auth,activityService){
    
    var ual = this;
    ual.loading = true;
    ual.authCheck = $auth.isAuthenticated();
    activate();
    function activate(){

      ual.loading = true;
      if(ual.authCheck){
        activityService.getUserFollowingActivity($auth.getPayload().sub).then(function(result){
        ual.activityData= result.data;
        ual.loading = false;
      });  
      }
      else{
       activityService.getAllActivity().then(function(result){
        console.log("from the activity");
        console.log(result);
       ual.activityData= result.data;
       ual.loading = false;
      }); 
      }
      
      
    }


    }

})(window.angular);
