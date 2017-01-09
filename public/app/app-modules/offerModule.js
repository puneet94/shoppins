(function(angular){
  'use strict';
angular.module('app.offer',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/offers/:location/:slug?', {
        templateUrl: 'app/offer/views/offersPage.html',
        controller: 'OffersPageController',
        controllerAs: 'ospc'
      }).
      when('/offer/:offerId', {
        templateUrl: 'app/offer/views/offerPage.html',
        controller: 'OfferPageController',
        controllerAs: 'opc'
      });
  }]);

})(window.angular);
//productsCollection/";
//productsCollectionCategory/";
//productsCollectionSubCategory/";
//product/singleProductName/necklace12/hyderabad/necklace12-products-in-hyderabad