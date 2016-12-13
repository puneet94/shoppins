(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserSettingsController',["$scope","$auth",'userData',UserSettingsController]);
  function UserSettingsController($scope,$auth,userData){
    
    var usl = this;
    usl.authCheck = $auth.isAuthenticated();
    activate();
    function activate(){

      usl.userForm = userData.getUser();
      console.log("dataaaa");
      console.log(usl.userForm);
    }
      
      
      
    }


    

})(window.angular);
