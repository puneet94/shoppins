(function(angular){
  angular.module('app.admin')

    .controller('AdminStoreController',['$scope','$routeParams','getSingleStore','Upload','baseUrlService',AdminStoreController]);
    function AdminStoreController($scope,$routeParams,getSingleStore,Upload,baseUrlService){	
    	var asc = this;
        asc.storeData = {};
        activate();
        asc.uploadStoreBanner = function(file, errFiles) {
          console.log("Enterd file uploading");
          asc.f = file;
          asc.errFile = errFiles && errFiles[0];
          if (file) {
              file.upload = Upload.upload({
                  url: baseUrlService.baseUrl+'upload/storeBannerUpload/'+$routeParams.storeId,
                  data: {file: file}
              });
              asc.spinnerLoading = true;
              file.upload.then(function (response) {
                  
                      file.result = response.data;
                      //asc.storeForm.bannerImage = response.data;
                      console.log(response.data);
                      $('.storeBannerImage').css('background-image','url('+response.data+')');
                      //asc.spinnerLoading = false;
              });
          }
      };
        function activate(){
            getSingleStore.getStore($routeParams.storeId)
            .then(function(res){
                asc.storeData = res.data;                
                //asc.showImagesCarousel = true;
                asc.loading = false;
        });

        getSingleStore.getStoreRating($routeParams.storeId)
            .then(function(res){
              asc.storeData.storeRatingAvg = res.data;
            });    
        }
    	
    }
})(window.angular);
