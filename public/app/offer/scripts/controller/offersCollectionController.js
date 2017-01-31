(function(angular) {
  'use strict';
  angular.module('app.offer')
    .controller('OffersCollectionController', ["$scope", "$auth", "$routeParams", OffersCollectionController]);

  function OffersCollectionController($scope, $auth, $routeParams) {
    var occ = this;
    occ.pageNo = 0;

    occ.offersList = [];
    
    
    occ.paramData = {
      city: $routeParams.location,
      page: 1,
      limit: 10
    };
    activate();
    
    
    
    function activate() {
      
    }

  }




})(window.angular);
