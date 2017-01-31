(function(angular){
    'use strict';
angular.module('app.chat',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/chatBox/:creator1/:creator2', {
        templateUrl: 'app/chat/views/chatBox.html',
        controller: 'ChatBoxController',
        controllerAs: 'cbc',
        resolve:{
          redirectIfNotAuthenticated: ['$q','$auth','$route','userData','changeBrowserURL',redirectIfNotAuthenticated]
        }
        
      }).
      when('/chatRooms', {
        templateUrl: 'app/chat/views/chatRoomListPage.html',
        resolve:{
          redirectIfNotUserAuthenticated: ['$q','$auth','changeBrowserURL',redirectIfNotUserAuthenticated]
        }
      });
  }]);
function redirectIfNotUserAuthenticated($q,$auth,changeBrowserURL) {
            var defer = $q.defer();
            
            if($auth.isAuthenticated()){
                defer.resolve();  
                    
            }
            else{
                defer.reject();
                changeBrowserURL.changeBrowserURLMethod('/home');
            } 
            return defer.promise;
}

function redirectIfNotAuthenticated($q,$auth,$route,userData,changeBrowserURL) {
            var defer = $q.defer();
            var creator1 = $route.current.params.creator1;
            var creator2 = $route.current.params.creator2;
            if($auth.isAuthenticated()){
            	if (creator2 == creator1) {
                    defer.reject();
                    changeBrowserURL.changeBrowserURLMethod('/home');
                }
                else if(userData.getUser()._id==creator1 || userData.getUser()._id==creator2){
            		defer.resolve();  
            	}
            	else{
            		defer.reject();
                	changeBrowserURL.changeBrowserURLMethod('/home');
            	}
            }
            else{
            	defer.reject();
                changeBrowserURL.changeBrowserURLMethod('/home');
            } 
            return defer.promise;
}
          


})(window.angular);