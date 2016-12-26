(function(angular) {
  'use strict';
  angular.module('app.store')

  .controller('StoreCategoryCollectionController', ["$scope", "$routeParams", "getCityLocalitiesService", "getCityCategoriesService", StoreCategoryCollectionController]);

  function StoreCategoryCollectionController($scope, $routeParams, getCityLocalitiesService, getCityCategoriesService) {
    var slcc = this;
    slcc.areaModel = {};
    slcc.launchFilterEvent = launchFilterEvent;
    slcc.areaRadioClicked = areaRadioClicked;
    slcc.majorFilter = {};
    slcc.clearAreaFilters = clearAreaFilters;

    function areaRadioClicked() {
      slcc.majorFilter.area = slcc.areaModel.area;
      launchFilterEvent(slcc.majorFilter);
    }

    function clearAreaFilters() {
      delete slcc.majorFilter.area;
      slcc.areaModel = {};
      launchFilterEvent(slcc.majorFilter);
    }

    var location = $routeParams.location;
    getCityLocalitiesService.getCityLocalities(location)
      .then(function(res) {
        slcc.areas = res.data;
      }, function(res) {
        console.log(res);
      });
    getCityCategoriesService.getCityCategories(location)
      .then(function(res) {
        slcc.categories = res.data;

      }, function(res) {
        console.log(res);
      });

    function launchFilterEvent(obj) {
      $scope.$broadcast('parent', obj);
    }
  }

})(window.angular);
