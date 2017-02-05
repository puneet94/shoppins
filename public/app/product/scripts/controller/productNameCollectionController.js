(function(angular) {
	'use strict';
	angular.module('app.product')

	.controller('ProductNameCollectionController', ['$scope', 'getCityProductAreasService', '$routeParams', 'paramFactory', '$mdDialog',ProductNameCollectionController]);

	function ProductNameCollectionController($scope, getCityProductAreasService, $routeParams,paramFactory, $mdDialog) {
		var plc = this;
		plc.location = $routeParams.location;
		plc.productsSearchHeader = $routeParams.slug;
		plc.categoryRadioModel = {};
		plc.areaRadioModel = {};
		plc.areaFilterName = 'area';
		plc.showFilterDialog =showFilterDialog;
		plc.paramData = {
			city: plc.location,
			page: 1,
			limit: 10,
			fields: '-store',
			name: $routeParams.productName
		};


		paramFactory.setParamData(plc.paramData);

		$scope.$on('filterClicked', function() {

			plc.paramData = paramFactory.getParamData();

		});
		function showFilterDialog(ev) {
			$mdDialog.show({
					controller: 'FilterModalController',
					templateUrl: 'app/store/views/filterModalTemplate.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: true,
					locals: {
						filtersList: [{
							'filterName': plc.areaFilterName,
							'filterNames': plc.areas,
							'filterModel': plc.areaRadioModel
						}]
					}
				})
				.then(function(answer) {
					console.log(answer);
				}, function() {

				});



		}

		getCityProductAreasService.getCityAreas(plc.location)
			.then(function(res) {
				plc.areas = res.data;
			}, function(res) {
				console.log(res);
			});


	}
})(window.angular);
