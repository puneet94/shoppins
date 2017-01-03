(function(angular) {
  'use strict';
  angular.module('app.product')

  .controller('SingleProductController', ["$scope", "$auth", 'getProductsService', "$routeParams", SingleProductController]);

  function SingleProductController($scope, $auth, getProductsService, $routeParams) {

    var spc = this;
    spc.authCheck = $auth.isAuthenticated();
    activate();
    spc.tab = 1;

        spc.setTab = function(newTab) {
            spc.tab = newTab;
        };

        spc.isSet = function(tabNum) {
            return spc.tab === tabNum;
        };
    function activate() {
      getProductsService.getSingleProduct($routeParams.productId).then(function(res) {
        spc.product = res.data;
        getProductsService.getSingleProductStores({ 'limit': 10, 'page': 1, 'name': spc.product.name,'fields':'store' }).then(function(res) {
          console.log("the list of list");
          console.log(res);
          spc.productStoreList  = res.data.docs.map(function(singleProduct){
            return singleProduct.store;
          });
        });
      });


    }
  }

})(window.angular);
