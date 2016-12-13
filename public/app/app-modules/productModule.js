(function(angular){
angular.module('app.product',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/productsCollectionName/:productName/:location/:slug?', {
        templateUrl: 'app/product/views/productsNameCollection.html',
        controller: 'ProductNameCollectionController',
        controllerAs: 'pncc'
      }).when('/productsCollectionCategory/:category/:location/:slug?', {
        templateUrl: 'app/product/views/productsCategoryCollection.html',
        controller: 'ProductCategoryCollectionController',
        controllerAs: 'pccc'
      }).when('/productsCollectionSubCategory/:subCategory/:location/:slug?', {
        templateUrl: 'app/product/views/productsSubCategoryCollection.html',
        controller: 'ProductSubCategoryCollectionController',
        controllerAs: 'pscc'
      }).when('/product/singleProduct/:productId/:slug?', {
        templateUrl: 'app/product/views/singleProduct.html',
        controller: 'SingleProductController',
        controllerAs: 'spc'
      }).when('/productsCollectionLocation/:location/:slug?', {
        templateUrl: 'app/product/views/productsLocationCollection.html',
        controller: 'ProductsLocationController',
        controllerAs: 'plc'
      });
  }]);

})(window.angular);
//productsCollection/";
//productsCollectionCategory/";
//productsCollectionSubCategory/";
//product/singleProductName/necklace12/hyderabad/necklace12-products-in-hyderabad