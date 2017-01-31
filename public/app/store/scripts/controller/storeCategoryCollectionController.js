(function(angular) {
  'use strict';
  angular.module('app.store')

  .controller('StoreCategoryCollectionController', ["$scope", "$routeParams", "getCityAreasService", "getCityCategoriesService", StoreCategoryCollectionController]);

  function StoreCategoryCollectionController($scope, $routeParams, getCityAreasService, getCityCategoriesService) {
    
    var sccc = this;
    sccc.location = $routeParams.location;
    sccc.storesSearchHeader = $routeParams.slug;
    sccc.areaRadioModel = {};
    sccc.areaFilterName = 'area';
    sccc.paramData = {
      city: sccc.location,
      page: 1,
      limit: 10,
      category: $routeParams.category
    };

    
    sccc.areaRadioClear = areaRadioClear;
    sccc.areaRadioChange = areaRadioChange;
    
    
    

    function areaRadioClear() {
      delete sccc.areaRadioModel[sccc.areaFilterName];
      delete sccc.paramData[sccc.areaFilterName];
      $scope.$broadcast('filterClicked');
    }


    function areaRadioChange() {
      sccc.paramData.area = sccc.areaRadioModel[sccc.areaFilterName];
      $scope.$broadcast('filterClicked');
    }


    

    getCityAreasService.getCityAreas(sccc.location)
      .then(function(res) {
        sccc.areas = res.data;
      }, function(res) {
        console.log(res);
      });
    getCityCategoriesService.getCityCategories(sccc.location)
      .then(function(res) {
        sccc.categories = res.data;

      }, function(res) {
        console.log(res);
      });

    
  }

})(window.angular);
