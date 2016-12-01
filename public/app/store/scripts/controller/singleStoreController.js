(function(angular){
  'use strict';
angular.module('app.store')

  .controller('SingleStoreController',["$scope","$auth",'$location','scrollToIdService',"$routeParams","storeData","getSingleStore",'$mdDialog','NgMap','getStoreCollectionService',SingleStoreController]);
  function SingleStoreController($scope,$auth,$location,scrollToIdService,$routeParams,storeData,getSingleStore,$mdDialog,NgMap,getStoreCollectionService){
    
    NgMap.getMap().then(function(map) {
      //map.setZoom(16);
      console.log(map.getZoom());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });
    var ssc = this;
    
    ssc.storeData = {};
    ssc.loading = true;
    ssc.authCheck = $auth.isAuthenticated();
    ssc.getAddressString = getAddressString;
    ssc.storeImagesObj = [];
    function getAddressString(){
      return Object.keys(ssc.storeData.address).map(function(key){return ssc.storeData.address[key];}).join(' ');
    }
     $scope.showAlert = function(ev) {
    
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Claim Business')
        .textContent('If you are the owner of this store,then mail to us at shoppinsmail@gmail.com')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
    getSingleStore.getStore($routeParams.storeId)
    .then(function(res){
      storeData.setStore(res.data);
        ssc.storeData = res.data;
        ssc.addressMap = ssc.storeData.address.area;
        if(ssc.storeData.address.latitude){
          ssc.pos  =[ssc.storeData.address.latitude, ssc.storeData.address.longitude];  
        }
        else{
          ssc.pos  =[17.361625, 78.474622];  
        }
        
        for (var i = 0; i < ssc.storeData.storeImages.length; i++) {
          var obj = {};
          obj.src=ssc.storeData.storeImages[i];
          ssc.storeImagesObj.push(obj);
        }
        
        ssc.loading = false;
        
        getStoreCollectionService.getStoreCollection('store/storesCollection/stores/'+ssc.storeData.address.city+'/1',{'limit':9})
        .then(function(response){
          ssc.storeSuggestions = response.data.docs;
        });
      });
    getSingleStore.getStoreRating($routeParams.storeId)
    .then(function(res){
      ssc.storeData.storeRatingAvg = res.data;
    });


    }

})(window.angular);
