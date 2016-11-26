(function(angular){
  'use strict';

angular.module('app.product')
  .service('getProductCollectionService',["$http","baseUrlService",GetProductCollectionService]);

/*
  * This servic has a function to get collection of products`
*/
function GetProductCollectionService($http,baseUrlService){
  this.getProductCollection = getProductCollection;

  function getProductCollection(url,paramData){
    return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
}
})(window.angular);
