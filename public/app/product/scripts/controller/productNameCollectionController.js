(function(angular) {
	'use strict';
	angular.module('app.product')

	.controller('ProductNameCollectionController', ['$scope', 'getCityProductAreasService', '$routeParams', ProductNameCollectionController]);

	function ProductNameCollectionController($scope, getCityProductAreasService, $routeParams) {
		var plc = this;
		plc.location = $routeParams.location;
		plc.productsSearchHeader = $routeParams.slug;
		plc.categoryRadioModel = {};
		plc.areaRadioModel = {};
		plc.areaFilterName = 'area';
		plc.categoryFilterName = 'category';
		plc.paramData = {
			city: plc.location,
			page: 1,
			limit: 10,
			fields: '-store',
			name: $routeParams.productName
		};


		plc.areaRadioClear = areaRadioClear;
		plc.areaRadioChange = areaRadioChange;


		function areaRadioClear() {
			delete plc.areaRadioModel[plc.areaFilterName];
			delete plc.paramData[plc.areaFilterName];
			$scope.$broadcast('filterClicked');
		}


		function areaRadioChange() {
			plc.paramData.area = plc.areaRadioModel[plc.areaFilterName];
			$scope.$broadcast('filterClicked');
		}




		getCityProductAreasService.getCityAreas(plc.location)
			.then(function(res) {
				plc.areas = res.data;
			}, function(res) {
				console.log(res);
			});


	}
})(window.angular);
