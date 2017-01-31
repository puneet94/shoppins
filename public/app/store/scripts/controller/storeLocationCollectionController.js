(function(angular) {
	'use strict';
	angular.module('app.store')
		.controller('StoreLocationCollectionController', ["$scope", "$routeParams", "getCityAreasService", "getCityCategoriesService", StoreLocationCollectionController]);

	function StoreLocationCollectionController($scope, $routeParams, getCityAreasService, getCityCategoriesService) {

		var slcc = this;
		slcc.location = $routeParams.location;
		slcc.categoryRadioModel = {};
		slcc.categoryFilterName = 'category';
		slcc.storesSearchHeader = $routeParams.slug;
		slcc.areaRadioModel = {};
		slcc.areaFilterName = 'area';
		slcc.paramData = {
			city: slcc.location,
			page: 1,
			limit: 10
		};

		slcc.categoryRadioClear = categoryRadioClear;
		slcc.areaRadioClear = areaRadioClear;
		slcc.areaRadioChange = areaRadioChange;
		slcc.categoryRadioChange = categoryRadioChange;
		
		activate();
		function categoryRadioClear() {
			delete slcc.categoryRadioModel[slcc.categoryFilterName];
			delete slcc.paramData[slcc.categoryFilterName];
			$scope.$broadcast('filterClicked');
		}

		function areaRadioClear() {
			delete slcc.areaRadioModel[slcc.areaFilterName];
			delete slcc.paramData[slcc.areaFilterName];
			$scope.$broadcast('filterClicked');
		}


		function areaRadioChange() {
			slcc.paramData.area = slcc.areaRadioModel[slcc.areaFilterName];
			$scope.$broadcast('filterClicked');
		}


		function categoryRadioChange() {
			slcc.paramData.category = slcc.categoryRadioModel[slcc.categoryFilterName];
			$scope.$broadcast('filterClicked');
		}

		function activate() {
			getCityAreasService.getCityAreas(slcc.location)
				.then(function(res) {
					slcc.areas = res.data;
				}, function(res) {
					console.log(res);
				});
			getCityCategoriesService.getCityCategories(slcc.location)
				.then(function(res) {
					slcc.categories = res.data;

				}, function(res) {
					console.log(res);
				});
		}



	}
})(window.angular);
