(function(angular){
  angular.module('app.product')
    .controller('ProductsLocationController',["$scope","$routeParams","getCityProductLocalitiesService","getCityProductCategoriesService","getCityProductSubCategoriesService",ProductsLocationController]);

  function ProductsLocationController($scope,$routeParams,getCityProductLocalitiesService,getCityProductCategoriesService,getCityProductSubCategoriesService){
    var plc = this;
    plc.areaModel = {};
    plc.categoryModel = {};
    plc.launchFilterEvent = launchFilterEvent;
    plc.areaRadioClicked = areaRadioClicked;
    plc.categoryRadioClicked = categoryRadioClicked;
    plc.majorFilter = {};
    plc.clearAreaFilters = clearAreaFilters;
    plc.clearCategoryFilters = clearCategoryFilters;
    function areaRadioClicked(){
      plc.majorFilter.area=plc.areaModel.area;
      launchFilterEvent(plc.majorFilter);
    }
    function clearAreaFilters(){
      delete plc.majorFilter.area;
      plc.areaModel = {};
      launchFilterEvent(plc.majorFilter);
    }
    function categoryRadioClicked(){
      plc.majorFilter.category=plc.categoryModel.category;
      launchFilterEvent(plc.majorFilter);
    }
    function clearCategoryFilters(){
      delete plc.majorFilter.category;
      plc.categoryModel = {};
      launchFilterEvent(plc.majorFilter);
    }
    var location = $routeParams.location;
    getCityProductLocalitiesService.getCityLocalities(location)
      .then(function(res){
        plc.areas = res.data;
      },function(res){
        
      });
      getCityProductCategoriesService.getCityCategories(location)
        .then(function(res){
          plc.categories = res.data;
          
        },function(res){
          console.log(res);
        });
    function launchFilterEvent(obj){
        $scope.$broadcast('parent', obj);
    }

  }
})(window.angular);
