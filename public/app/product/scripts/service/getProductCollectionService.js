(function(angular){
  'use strict';

angular.module('app.product')
  .service('getProductCollectionService',["$http","baseUrlService",GetProductCollectionService]);

/*
  * This servic has a function to get collection of products`
*/
function GetProductCollectionService($http,baseUrlService){
  this.getProductCollection = getProductCollection;
  this.getProductNameCollection = getProductNameCollection;
  function getProductCollection(url,paramData){
  	console.log(paramData);
    return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function getProductNameCollection(){
	return $http.get(baseUrlService.baseUrl+'product/products/name/:name/:location/:pageNo',{params:paramData});  	
  }
}
})(window.angular);
