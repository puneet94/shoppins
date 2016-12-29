(function(angular) {
    'use strict';
    angular.module('app.user', []).config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/user/:userId', {
                templateUrl: 'app/user/views/userProfilePage.html',
                controller: 'UserPageController',
                controllerAs: 'upc'
            }).
            when('/userProfileSettings', {
                templateUrl: 'app/user/views/userProfileSettingsPage.html'
            }).
            when('/userAccountSettings', {
                templateUrl: 'app/user/views/userAccountSettingsPage.html'
            }).
            when('/userMobileFeed', {
                templateUrl: 'app/user/views/userMobileFeed.html',
                controller: 'UserMobileFeedController',
                controllerAs: 'umfc'
            });
        }
    ]);




})(window.angular);
