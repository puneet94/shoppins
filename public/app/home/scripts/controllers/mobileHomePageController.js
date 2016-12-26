(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('MobileHomePageController',["$scope","changeBrowserURL",'cityStorage',"$auth", MobileHomePageController]);

	function MobileHomePageController($scope,changeBrowserURL,cityStorage,$auth){
			var mhpc = this;
			mhpc.isAuth = $auth.isAuthenticated();
			
	  
	}

})(window.angular);
