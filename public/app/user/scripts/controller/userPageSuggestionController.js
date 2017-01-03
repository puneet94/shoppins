(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserPageSuggestionController',["$scope","userService",UserPageSuggestionController]);
  function UserPageSuggestionController($scope,userService){
    var upc = this;
    activate();
    
    upc.loading = true;

    
    function activate(){
      getUsers({'limit':20,'page':1});
      
    }
    function getUsers(params){
      userService.getUsers(params)
    .then(function(res){
        upc.usersList = res.data.docs;
        console.log("the users list");
        console.log(upc.usersList);
        upc.loading = false;
        
      });
    }


    }

})(window.angular);
