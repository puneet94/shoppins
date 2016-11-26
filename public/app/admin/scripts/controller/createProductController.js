(function(angular){
  angular.module('app.admin')

    .controller('CreateProductController',['$routeParams','adminProductService','Upload','baseUrlService',CreateProductController]);
    function CreateProductController($routeParams,adminProductService,Upload,baseUrlService){
    	var csc = this;
    	csc.productForm = {};
        csc.productForm.price = {};
    	activate();
    	csc.createProduct = createProduct;

        csc.uploadMultipleImages = function (files) {
        csc.files = files;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: baseUrlService.baseUrl+'upload/singleUpload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    console.log(response.data);
                    csc.productForm.productImages.push(response.data);
                });
            }, function (response) {
                if (response.status > 0)
                    csc.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });
        
    };
        csc.uploadProductImage = function(file, errFiles) {
          console.log("Enterd file uploading");
          csc.f = file;
          csc.errFile = errFiles && errFiles[0];
          if (file) {
              file.upload = Upload.upload({
                  url: baseUrlService.baseUrl+'upload/singleUpload',
                  data: {file: file}
              });
              csc.spinnerLoading = true;
              file.upload.then(function (response) {
                  
                      file.result = response.data;
                      csc.productForm.bannerImage = response.data;
                      console.log(response.data);
                      $('.productMainImage').css('background-image','url('+response.data+')');
                      
              });
          }
      };

    	function createProduct(){
    		adminProductService.createProduct(csc.productForm,$routeParams.storeId)
	    		.then(function(response){
	    			console.log(response);
	    			alert("product created");
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		
    	}
    }
})(window.angular);
