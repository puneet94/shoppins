(function(angular){
  'use strict';
angular.module('app.product')
  .controller('StoreProductListController',["$scope","$auth",'$location','scrollToIdService',"$routeParams","getProductsService","changeBrowserURL",StoreProductListController]);
  function StoreProductListController($scope,$auth,$location,scrollToIdService,$routeParams,getProductsService,changeBrowserURL){
    var splc = this;
    splc.storeProductsList = [];
    splc.pageNo = 0;
    splc.getSingleProduct = getSingleProduct;
    activate();

    function getSingleProduct(productId){
      var url = "/product/singleProduct/"+productId;
      changeBrowserURL.changeBrowserURLMethod(url);
    }
    function activate(){
    	getProductsService.getStoreProductsList($routeParams.storeId).then(function(response){
        
        splc.storeProductsList = response.data.docs;
      });
    }

  }

})(window.angular);
