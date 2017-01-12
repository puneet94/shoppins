(function(angular) {
	'use strict';
	angular.module('app.offer')
		.controller('OffersPageController', ["$scope", "$auth", "$routeParams", "changeBrowserURL", "baseUrlService", OffersPageController]);

	function OffersPageController($scope, $auth, $routeParams, changeBrowserURL, baseUrlService) {
		var opc = this;

		activate();

		function activate(){

		}
		
		

	}




})(window.angular);
