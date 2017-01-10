(function(angular) {
  'use strict';
  angular.module('app.offer')
    .controller('AdminOffersCollectionController', ["$scope", "$auth", "$routeParams", "changeBrowserURL", "offerService", AdminOffersCollectionController]);

  function AdminOffersCollectionController($scope, $auth, $routeParams, changeBrowserURL, offerService) {
    var occ = this;
    occ.pageNo = 0;
    occ.offersList = [];
    
    occ.getOffersCollection = getOffersCollection;

    activate();
    
    function getOffersCollection() {
      occ.loading = true;
      occ.pageNo = occ.pageNo + 1;
      
      occ.paramData = {'store': $routeParams.storeId,'limit':100,'page':1,'populate':'store'};
      console.log(occ.paramData);
      offerService.getOfferCollection( occ.paramData)
        .then(function(response) {
          console.log("offers collection");
          console.log(response);
          if (response.data.docs.length === 0) {
            occ.nooffersToShow = true;

          } else {
            occ.nooffersToShow = false;
            occ.offersList = response.data.docs;
          }

          occ.loading = false;
        }, function(response) {
          console.log(response);
        });
    }

    function activate() {
      occ.getOffersCollection();
    }

  }




})(window.angular);
