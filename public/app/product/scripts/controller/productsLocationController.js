(function(angular){
  'use strict';
  angular.module('app.product')
    .controller('ProductsLocationController',["$scope","$routeParams","getCityProductAreasService","getCityProductCategoriesService",ProductsLocationController]);

  function ProductsLocationController($scope,$routeParams,getCityProductAreasService,getCityProductCategoriesService){
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
      fields: '-store'
    };

    
    plc.areaRadioClear = areaRadioClear;
    plc.areaRadioChange = areaRadioChange;
    
    plc.categoryRadioClear = categoryRadioClear;
    plc.categoryRadioChange = categoryRadioChange;
    

    function categoryRadioClear() {
      delete plc.categoryRadioModel[plc.categoryFilterName];
      delete plc.paramData[plc.categoryFilterName];
      $scope.$broadcast('filterClicked');
    }


    function categoryRadioChange() {
      plc.paramData.category = plc.categoryRadioModel[plc.categoryFilterName];
      $scope.$broadcast('filterClicked');
    }

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
    getCityProductCategoriesService.getCityCategories(plc.location)
      .then(function(res) {
        plc.categories = res.data;

      }, function(res) {
        console.log(res);
      });

  }
})(window.angular);
