(function(angular){
    'use strict';
angular.module('app.admin', []).config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/admin/createStore', {
            templateUrl: 'app/admin/views/adminCreateStore.html',
            controller: 'CreateStoreController',
            controllerAs: 'csc',
            resolve: {
                redirectIfNotAuthenticated2: redirectIfNotAuthenticated2
            }
        }).when('/admin/adminStorePage/:storeId', {
            templateUrl: 'app/admin/views/adminStorePage.html',
            controller: 'AdminStoreController',
            controllerAs: 'asc',
            resolve: {
                redirectIfNotAuthenticated2: redirectIfNotAuthenticated2,
                redirectIfNotStoreAuthenticated: redirectIfNotStoreAuthenticated
            }
        }).when('/admin/adminCreateOffer/:storeId', {
            templateUrl: 'app/admin/views/adminCreateOffer.html',
            resolve: {
                redirectIfNotAuthenticated2: redirectIfNotAuthenticated2,
                redirectIfNotStoreAuthenticated: redirectIfNotStoreAuthenticated
            }
        }).when('/admin/adminEditOffer/:storeId/:offerId', {
            templateUrl: 'app/admin/views/adminEditOffer.html',
            resolve: {
                redirectIfNotAuthenticated2: redirectIfNotAuthenticated2,
                redirectIfNotStoreAuthenticated: redirectIfNotStoreAuthenticated
            }
        });
    }
]);


function redirectIfNotAuthenticated2($q, $timeout, $auth, changeBrowserURL) {

    var defer = $q.defer();
    if ($auth.isAuthenticated()) {
        defer.resolve();
    } else {
        $timeout(function() {
            changeBrowserURL.changeBrowserURLMethod('/'); 
        });
        defer.reject();
    }
       
        
    return defer.promise;
}

function redirectIfNotStoreAuthenticated($q, $route, userData, adminStoreService, changeBrowserURL) {
    var defer = $q.defer();
    console.log("stre authen");
    console.log($route.current.params.storeId);
    adminStoreService.getStore($route.current.params.storeId, { 'select': 'admin' }).then(function(response) {

        if (userData.getUser()._id == response.data.admin) {
            defer.resolve();

        } else {
            defer.reject();
            changeBrowserURL.changeBrowserURLMethod('/home');
        }
    }, function(response) {
        console.log(response);
    });

    return defer.promise;
}


})(window.angular);
