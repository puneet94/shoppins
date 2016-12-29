(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserProfileSettingsController',["$scope","$auth",'userData',UserProfileSettingsController]);
  function UserProfileSettingsController($scope,$auth,userData){
    
    var usl = this;
    usl.authCheck = $auth.isAuthenticated();
    activate();
    function activate(){

      usl.userForm = userData.getUser();
      
    }
      
      
      
    }


    

})(window.angular);