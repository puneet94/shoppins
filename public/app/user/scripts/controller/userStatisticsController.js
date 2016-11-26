(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserStatisticsController',["$scope","$auth",'$location','$routeParams',"userData","userService",UserStatisticsController]);
  function UserStatisticsController($scope,$auth,$location,$routeParams,userData,userService){
    var upc = this;
    activate();
    function activate(){
      
    }


    }

})(window.angular);
