(function(angular) {
    angular.module('app.user', []).config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/user/:userId', {
                templateUrl: 'app/user/views/userProfilePage.html',
                controller: 'UserPageController',
                controllerAs: 'upc'
            }).
            when('/user/userSettings/:userId', {
                templateUrl: 'app/user/views/userSettingsPage.html',
                controller: 'UserSettingsController',
                controllerAs: 'usc'
            });
        }
    ]);




})(window.angular);
