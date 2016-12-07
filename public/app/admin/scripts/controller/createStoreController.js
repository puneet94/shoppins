(function(angular) {
    angular.module('app.admin')
        .controller('CreateStoreController', ['$auth', 'adminStoreService', 'Upload', 'userData', '$timeout', 'baseUrlService', '$location', '$mdDialog',CreateStoreController]);

    function CreateStoreController($auth, adminStoreService, Upload, userData, $timeout, baseUrlService, $location,$mdDialog) {
        var csc = this;
        csc.storeForm = {};
        csc.storeForm.storeImages = [];
        activate();
        
        csc.createStore = createStore;
        csc.uploadSingleImage = function(file, errFiles) {
          
          csc.f = file;
          csc.errFile = errFiles && errFiles[0];
          if (file) {
            csc.formBannerLoading = true;

              file.upload = Upload.upload({
                  url: baseUrlService.baseUrl + 'upload/singleUpload',
                  data: {file: file}
              });
              //csc.spinnerLoading = true;
              file.upload.then(function (response) {
                  
                      file.result = response.data;
                      
                      console.log(response.data);
                      csc.uploadedImage = response.data;
                      $('.adminStoreBannerImage').css('background-image','url('+response.data+')');
                      csc.formBannerLoading = false;
                      
              });
          }
      };
        csc.uploadMultipleImages = function(files) {
            csc.files = files;
            csc.formImgListLoading = true;
            angular.forEach(files, function(file) {
                file.upload = Upload.upload({
                    url: baseUrlService.baseUrl + 'upload/singleUpload',
                    data: { file: file }
                });

                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;
                        console.log(response.data);
                        csc.storeForm.storeImages.push(response.data);
                    });
                }, function(response) {
                    if (response.status > 0)
                        csc.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            });
            csc.formImgListLoading = false;

        };

        function createStore() {
            csc.storeForm.bannerImage = csc.storeForm.storeImages[0];
            adminStoreService.createStore(csc.storeForm)
                .then(function(response) {
                    console.log(response.data._id);
                    userData.setUser();
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Store created')
                        .textContent('Your Store has been created.')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        
                    );
                    $location.url('/admin/adminStorePage/' + response.data._id);
                    //$window.location.reload();
                }, function(response) {
                    console.log(response);
                });
        }


        function activate() {

        }

    }
})(window.angular);
