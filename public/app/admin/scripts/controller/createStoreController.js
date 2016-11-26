(function(angular){
  angular.module('app.admin')
    .controller('CreateStoreController',['$auth','adminStoreService','Upload','userData','$timeout','baseUrlService','$location',CreateStoreController]);
    function CreateStoreController($auth,adminStoreService,Upload,userData,$timeout,baseUrlService,$location){
    	var csc = this;
    	csc.storeForm = {};
      csc.storeForm.storeImages = [];
    	activate();
    	csc.createStore = createStore;
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
        csc.storeForm.bannerImage = csc.storeForm.storeImages[0];
    		adminStoreService.createStore(csc.storeForm)
	    		.then(function(response){
	    			console.log(response.data._id);
            userData.setUser();
	    			alert("store created");
            $location.url('/admin/adminStorePage/'+response.data._id);
            //$window.location.reload();
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		
    	}
    	
    }
})(window.angular);
