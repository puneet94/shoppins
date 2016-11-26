angular.module('app.admin',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/admin/createStore', {
        templateUrl: 'app/admin/views/adminCreateStore.html',
        controller: 'CreateStoreController',
        controllerAs: 'csc',
        resolve:{
          redirectIfNotAuthenticated: redirectIfNotAuthenticated
        }
      }).when('/admin/adminStorePage/:storeId', {
        templateUrl: 'app/admin/views/adminStorePage.html',
        controller: 'AdminStoreController',
        controllerAs: 'asc',
        resolve:{
          redirectIfNotAuthenticated: redirectIfNotAuthenticated,
          redirectIfNotStoreAuthenticated: redirectIfNotStoreAuthenticated
        }
      })/*.when('/store/storesCollection/category/:category/:location/:slug?', {
        templateUrl: 'app/store/views/storesCategoryCollection.html',
        controller: 'StoreCategoryCollectionController',
        controllerAs: 'sccc'
      }).when('/store/storesCollection/location/:location/:slug?', {
        templateUrl: 'app/store/views/storesLocationCollection.html',
        controller: 'StoreLocationCollectionController',
        controllerAs: 'slcc'
      }).when('/store/singleStore/:storeId/:myslug?', {
        templateUrl: 'app/store/views/singleStore.html',
        controller: 'SingleStoreController',
        controllerAs: 'ssc'
      })*/;
  }]);


function redirectIfNotAuthenticated($q, $timeout,$auth,changeBrowserURL) {
            var defer = $q.defer();
            if($auth.isAuthenticated()) {
              defer.resolve(); /* (3) */
            } else {
              $timeout(function () {
                changeBrowserURL.changeBrowserURLMethod('/login');//$state.go(‘login’); /* (4) */
              });
              defer.reject();
            }
            return defer.promise;
}

function redirectIfNotStoreAuthenticated($q,$route,userData,adminStoreService,changeBrowserURL) {
            var defer = $q.defer();
            adminStoreService.getStore($route.current.params.storeId,{'select':'admin'}).then(function(response){
              console.log('the');
              console.log(userData.getUser()._id);
              console.log(response);
              if(userData.getUser()._id==response.data.admin){
                defer.resolve();  
                
              }
              else{
                defer.reject();
                changeBrowserURL.changeBrowserURLMethod('/home');
              }
            },function(response){
              console.log(response);
            });
            
            return defer.promise;
}
          

