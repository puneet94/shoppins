(function(angular){
    'use strict';
  angular.module('app.admin')

    .controller('EditProductController',['$auth','adminProductService','$routeParams','$mdDialog',EditProductController]);
    function EditProductController($auth,adminProductService,$routeParams,$mdDialog){
    	var csc = this;
    	csc.productForm = {};
    	activate();
    	csc.createProduct = createProduct;
        
    	function createProduct(){
    		adminProductService.updateProduct($routeParams.productId,csc.productForm)
	    		.then(function(response){
	    			console.log(response);
	    			$mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Product Edited')
                        .textContent('Your Product has been edited.')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        
                    );
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		adminProductService.getProduct($routeParams.productId).then(function(response){
    			console.log(response);

                response.data.category = response.data.category.join(",");
                response.data.subCategory = response.data.subCategory.join(",");
                response.data.keywords = response.data.keywords.join(",");
                console.log(response);
    			csc.productForm = response.data;
    		});
    	}
    }
})(window.angular);
