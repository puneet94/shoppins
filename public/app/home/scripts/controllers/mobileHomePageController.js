(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('MobileHomePageController',["$scope","changeBrowserURL",'cityStorage',"$auth", 'getStoreCollectionService',MobileHomePageController]);

	function MobileHomePageController($scope,changeBrowserURL,cityStorage,$auth,getStoreCollectionService){
			var mhpc = this;
			mhpc.isAuth = $auth.isAuthenticated();
			
	  
	}

})(window.angular);
