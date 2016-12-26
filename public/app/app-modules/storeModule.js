(function(angular){
  'use strict';
  
angular.module('app.store',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/store', {
        templateUrl: 'app/store/storePost.html',
        controller: 'StoreController',
        controllerAs: 'sm'  
      }).when('/store/storesCollection/storeName/:storeName/:location/:slug?', {
        templateUrl: 'app/store/views/storesNameCollection.html',
        controller: 'StoreNameCollectionController',
        controllerAs: 'sncc'
      }).when('/store/storesCollection/category/:category/:location/:slug?', {
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
      });
  }]);

})(window.angular);

