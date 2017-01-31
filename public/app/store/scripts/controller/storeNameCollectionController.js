(function(angular) {
	'use strict';
	angular.module('app.store')

	.controller('StoreNameCollectionController', ["$scope", "$routeParams", "getCityAreasService", StoreNameCollectionController]);

	function StoreNameCollectionController($scope, $routeParams, getCityAreasService) {
		var sncc = this;
		sncc.location = $routeParams.location;
		sncc.storesSearchHeader = $routeParams.slug;
		sncc.areaRadioModel = {};
		sncc.areaFilterName = 'area';
		sncc.paramData = {
			city: sncc.location,
			page: 1,
			limit: 10,
			name: $routeParams.storeName
		};


		sncc.areaRadioClear = areaRadioClear;
		sncc.areaRadioChange = areaRadioChange;




		function areaRadioClear() {
			delete sncc.areaRadioModel[sncc.areaFilterName];
			delete sncc.paramData[sncc.areaFilterName];
			$scope.$broadcast('filterClicked');
		}


		function areaRadioChange() {
			sncc.paramData.area = sncc.areaRadioModel[sncc.areaFilterName];
			$scope.$broadcast('filterClicked');
		}




		getCityAreasService.getCityAreas(sncc.location)
			.then(function(res) {
				sncc.areas = res.data;
			}, function(res) {
				console.log(res);
			});

	}
})(window.angular);
