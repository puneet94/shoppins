(function(angular) {
	'use strict';
	angular.module('app.store')

	.controller('StoreNameCollectionController', ["$scope", "$routeParams", "getCityAreasService", 'paramFactory','$mdDialog',StoreNameCollectionController]);

	function StoreNameCollectionController($scope, $routeParams, getCityAreasService,paramFactory,$mdDialog) {
		var sncc = this;
		sncc.location = $routeParams.location;
		sncc.storesSearchHeader = $routeParams.slug;
		sncc.areaRadioModel = {};
		sncc.showFilterDialog = showFilterDialog;
		sncc.areaFilterName = 'area';
		sncc.paramData = {
			city: sncc.location,
			page: 1,
			limit: 10,
			name: $routeParams.storeName
		};

		paramFactory.setParamData(sncc.paramData);

		$scope.$on('filterClicked', function() {

			sncc.paramData = paramFactory.getParamData();

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
							'filterName': sncc.areaFilterName,
							'filterNames': sncc.areas,
							'filterModel': sncc.areaRadioModel
						}]
					}
				})
				.then(function(answer) {
					console.log(answer);
				}, function() {

				});



		}

		getCityAreasService.getCityAreas(sncc.location)
			.then(function(res) {
				sncc.areas = res.data;
			}, function(res) {
				console.log(res);
			});

	}
})(window.angular);
