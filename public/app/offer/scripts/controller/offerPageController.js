(function(angular) {
	'use strict';
	angular.module('app.offer')
		.controller('OfferPageController', ["$scope", "$auth", "$routeParams", "changeBrowserURL", 'offerService',OfferPageController]);

	function OfferPageController($scope, $auth, $routeParams, changeBrowserURL,offerService) {
		var opc = this;

		activate();

		function activate(){
			offerService.getSingleOffer($routeParams.offerId)
				.then(function(res){
					console.log("single offer");
					console.log(res);
				},function(res){

				});

		}
		
		

	}




})(window.angular);
