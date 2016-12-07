(function(angular){
  angular.module('app.admin')

    .controller('EditStoreController',['$auth','$route','adminStoreService','Upload','$routeParams','$timeout','baseUrlService','$mdDialog',EditStoreController]);
    function EditStoreController($auth,$route,adminStoreService,Upload,$routeParams,$timeout,baseUrlService,$mdDialog){
    	var csc = this;
    	csc.storeForm = {};
    	activate();
    	csc.createStore = createStore;
        
        

        csc.uploadSingleImage = function(file, errFiles) {
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
                      csc.storeForm.bannerImage = response.data;
                      //$('.userProfileImage').find('img').attr('src',response.data);
                      csc.spinnerLoading = false;
              });
          }
      };
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
                    csc.storeForm.storeImages.push(response.data);
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
    	function createStore(){
    		adminStoreService.updateStore($routeParams.storeId,csc.storeForm)
	    		.then(function(response){
	    			console.log(response);
	    			$mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Store edited')
                        .textContent('Your Store has been edited.')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        
                    );
            $route.reload();
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		adminStoreService.getStore($routeParams.storeId).then(function(response){
    			console.log(response);

                response.data.category = response.data.category;
                response.data.subCategory = response.data.subCategory;
                response.data.keywords = response.data.keywords.join(",");
                console.log(response);
    			csc.storeForm = response.data;
    		});
    	}
    }
})(window.angular);
