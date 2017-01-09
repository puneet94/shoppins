(function(angular) {
	'use strict';
	angular.module('app.offer')
		.controller('OffersPageController', ["$scope", "$auth", "$routeParams", "changeBrowserURL", "baseUrlService", "getofferPageService", OffersPageController]);

	function OffersPageController($scope, $auth, $routeParams, changeBrowserURL, baseUrlService, getofferPageService) {
		var opc = this;

		activate();

		function activate(){

		}
		
		

	}




})(window.angular);
