(function(angular){
  'use strict';
angular.module('app.product')
  .controller('StoreProductListController',["$scope","$routeParams",StoreProductListController]);
  function StoreProductListController($scope,$routeParams){
    var splc = this;
    
    
    splc.paramData = {
      page: 1,
      limit: 10,
      fields: '-store',
      store: $routeParams.storeId
    };
    /*
    function getSingleProduct(productId){
      var url = "/product/singleProduct/"+productId;
      changeBrowserURL.changeBrowserURLMethod(url);
    }
    function activate(){
    	getProductsService.getStoreProductsList($routeParams.storeId).then(function(response){
        splc.storeProductsList = response.data.docs;
        if(response.data.docs.length === 0){
          splc.noProductsInStore  = true;
        }
        else{
          splc.noProductsInStore  = false; 
        }
      });
    }*/

  }

})(window.angular);
