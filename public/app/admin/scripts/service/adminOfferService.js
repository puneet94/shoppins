(function(angular){
  'use strict';

angular.module('app.offer')
  .service('adminOfferService',["$http","baseUrlService",'changeBrowserURL',AdminOfferService]);

/*
  * This servic has a function to get collection of offers`
*/

function AdminOfferService($http,baseUrlService){
  
  this.createOffer = createOffer;
  this.getOffer = getOffer;
  this.updateOffer = updateOffer;
  this.deleteOffer  = deleteOffer;
  
  function createOffer(offer,storeId){
  	return $http.post(baseUrlService.baseUrl+'admin/offers/'+storeId,offer);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function updateOffer(offerId,offer){
  	return $http.put(baseUrlService.baseUrl+'admin/offer/'+offerId,offer);
  }
  function getOffer(offerId,obj){
    return $http.get(baseUrlService.baseUrl+'admin/offer/'+offerId,{params:obj});       
  }
  function deleteOffer(){

  }
}
})(window.angular);
