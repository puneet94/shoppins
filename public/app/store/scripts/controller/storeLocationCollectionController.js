(function(angular){
  'use strict';
  angular.module('app.store')
    .controller('StoreLocationCollectionController',["$scope","$routeParams","getCityLocalitiesService","getCityCategoriesService",StoreLocationCollectionController]);

  function StoreLocationCollectionController($scope,$routeParams,getCityLocalitiesService,getCityCategoriesService){
    var slcc = this;
    slcc.areaModel = {};
    slcc.categoryModel = {};
    slcc.launchFilterEvent = launchFilterEvent;
    slcc.areaRadioClicked = areaRadioClicked;
    slcc.categoryRadioClicked = categoryRadioClicked;
    slcc.majorFilter = {};
    slcc.clearAreaFilters = clearAreaFilters;
    slcc.clearCategoryFilters = clearCategoryFilters;
    function areaRadioClicked(){
      slcc.majorFilter.area=slcc.areaModel.area;
      launchFilterEvent(slcc.majorFilter);
    }
    function clearAreaFilters(){
      delete slcc.majorFilter.area;
      slcc.areaModel = {};
      launchFilterEvent(slcc.majorFilter);
    }
    function categoryRadioClicked(){
      slcc.majorFilter.category=slcc.categoryModel.category;
      launchFilterEvent(slcc.majorFilter);
    }
    function clearCategoryFilters(){
      delete slcc.majorFilter.category;
      slcc.categoryModel = {};
      launchFilterEvent(slcc.majorFilter);
    }
    var location = $routeParams.location;
    getCityLocalitiesService.getCityLocalities(location)
      .then(function(res){
        slcc.areas = res.data;
      },function(res){
        console.log(res);
      });
      getCityCategoriesService.getCityCategories(location)
        .then(function(res){
          slcc.categories = res.data;
          
        },function(res){
          console.log(res);
        });
    function launchFilterEvent(obj){
        $scope.$broadcast('parent', obj);
    }

  }
})(window.angular);
