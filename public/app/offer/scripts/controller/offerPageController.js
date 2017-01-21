(function(angular) {
	'use strict';
	angular.module('app.offer')
		.controller('OfferPageController', ["$scope", "$auth", "$routeParams", "changeBrowserURL", 'offerService', OfferPageController]);

	function OfferPageController($scope, $auth, $routeParams, changeBrowserURL, offerService) {
		var opc = this;
		opc.offerData = {};
		activate();

		function activate() {
			offerService.getSingleOffer($routeParams.offerId)
				.then(function(res) {
					console.log("single offer");
					console.log(res);
					opc.offerData = res.data;
					if (opc.offerData.address.latitude) {
						opc.pos = [opc.offerData.address.latitude, opc.offerData.address.longitude];
					} else {
						opc.pos = [17.361625, 78.474622];
					}
				}, function(res) {
					console.log(res);
				}).catch(function(e) {
					console.log('Error: ', e);
					
				}).finally(function() {
					console.log('This finally block');
				});

		}



	}




})(window.angular);
