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
                templateUrl: 'app/user/views/userProfileSettingsPage.html',
                resolve: {
                    redirectIfNotUserAuthenticated: redirectIfNotUserAuthenticated
                }
            }).
            when('/userAccountSettings', {
                templateUrl: 'app/user/views/userAccountSettingsPage.html',
                resolve: {
                    redirectIfNotUserAuthenticated: redirectIfNotUserAuthenticated
                }
            }).
            when('/userMobileFeed', {
                templateUrl: 'app/user/views/userMobileFeed.html',
                controller: 'UserMobileFeedController',
                controllerAs: 'umfc'
            }).
            when('/userMePage', {
                templateUrl: 'app/user/views/userMePage.html',
                controller: 'UserMePageController',
                controllerAs: 'umpc',
                resolve: {
                    redirectIfNotUserAuthenticated: redirectIfNotUserAuthenticated
                }
            });
        }
    ]);



    function redirectIfNotUserAuthenticated($q, $auth, changeBrowserURL) {
        var defer = $q.defer();

        if ($auth.isAuthenticated()) {
            defer.resolve();

        } else {
            defer.reject();
            changeBrowserURL.changeBrowserURLMethod('/home');
        }
        return defer.promise;
    }

})(window.angular);
