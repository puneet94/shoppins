(function(angular){
  'use strict';
angular.module('app.product')

  .controller('SingleProductController',["$scope","$auth",'getProductsService','$location','scrollToIdService',"$routeParams",SingleProductController]);
  function SingleProductController($scope,$auth,getProductsService,$location,scrollToIdService,$routeParams){
    
    var spc = this;
    spc.authCheck = $auth.isAuthenticated();
    activate();
    



    function activate(){
    	getProductsService.getSingleProduct($routeParams.productId).then(function(res){
    		
    		spc.product = res.data;	
    	});
		
    }
  }

})(window.angular);
