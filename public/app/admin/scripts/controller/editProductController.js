(function(angular){
  angular.module('app.admin')

    .controller('EditProductController',['$auth','adminProductService','$routeParams',EditProductController]);
    function EditProductController($auth,adminProductService,$routeParams){
    	var csc = this;
    	csc.productForm = {};
    	activate();
    	csc.createProduct = createProduct;
        
    	function createProduct(){
    		adminProductService.updateProduct($routeParams.productId,csc.productForm)
	    		.then(function(response){
	    			console.log(response);
	    			alert("product created");
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
