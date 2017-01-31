(function(angular) {
    'use strict';
    angular
        .module('authModApp', [])
        .config(["$routeProvider", "$httpProvider", "$authProvider", authConfig]);

    function authConfig($routeProvider, $httpProvider, $authProvider) {
        //shopuae
        //var fbClientId = '991629147629579';
        //shoppins
        var fbClientId = '1068203956594250';
        var authenticateUrl = 'http://localhost:3000/authenticate';
        $routeProvider
            .when('/signup', {
                templateUrl: 'app/authentication/views/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'rcl',
                resolve: {
                    redirectIfNotAuthenticated: ['$q', '$auth', '$route', 'userData', 'changeBrowserURL',redirectIfNotAuthenticated]
                }
            })
            .when('/logout', {
                controller: 'LogoutCtrl'
            })
            .when('/login', {
                templateUrl: 'app/authentication/views/login.html',
                controller: 'LoginController',
                controllerAs: 'login',
                resolve: {
                    redirectIfNotAuthenticated: ['$q', '$auth', '$route', 'userData', 'changeBrowserURL',redirectIfNotAuthenticated]
                }


            });
        $authProvider.loginUrl = authenticateUrl + "/login";
        $authProvider.signupUrl = authenticateUrl + "/signup";

        $authProvider.facebook({
            clientId: fbClientId,
            url: authenticateUrl + '/auth/facebook'
        });
    }

    function redirectIfNotAuthenticated($q, $auth, $route, userData, changeBrowserURL) {
        var defer = $q.defer();
        if ($auth.isAuthenticated()) {
            defer.reject();
            changeBrowserURL.changeBrowserURLMethod('/home');
        } else {
            defer.resolve();
        }
        return defer.promise;
    }
})(window.angular);
