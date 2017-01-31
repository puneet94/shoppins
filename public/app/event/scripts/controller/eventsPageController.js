(function(angular) {
	'use strict';
	angular.module('app.event')
		.controller('EventsPageController', ["$scope", "$auth", "$routeParams", "changeBrowserURL", "baseUrlService", EventsPageController]);

	function EventsPageController($scope, $auth, $routeParams, changeBrowserURL, baseUrlService) {
		var opc = this;

		activate();

		function activate(){

		}
		
		

	}




})(window.angular);
