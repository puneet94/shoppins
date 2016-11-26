angular.module('app.user',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/user/:userId', {
        templateUrl: 'app/user/views/userProfilePage.html',
        controller: 'UserPageController',
        controllerAs: 'upc'
      });
  }]);
