(function(angular) {
  'use strict';
  angular.module('app.offer')
    .controller('OffersCollectionController', ["$scope", "$auth", "$routeParams", "changeBrowserURL", "offerService", OffersCollectionController]);

  function OffersCollectionController($scope, $auth, $routeParams, changeBrowserURL, offerService) {
    var occ = this;
    occ.pageNo = 0;
    occ.offersList = [];
    occ.getSingleoffer = getSingleoffer;
    occ.getOffersCollection = getOffersCollection;

    activate();
    $scope.$on('parent', function(event, data) {
      occ.pageNo = 0;
      occ.paramData = data;
      occ.getoffersCollection();

    });

    function getSingleoffer(offer) {
      var url = "offer/" + offer._id;
      changeBrowserURL.changeBrowserURLMethod(url);
    }

    function getOffersCollection() {
      occ.loading = true;
      occ.pageNo = occ.pageNo + 1;
      var location = $routeParams.location;

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
