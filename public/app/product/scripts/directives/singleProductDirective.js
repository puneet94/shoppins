
(function(angular){
  angular.module('app.product')
  .directive('singleProductDirective',[singleProductDirective]);
  
  function singleProductDirective(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl:'app/product/views/singleProductTemplate.html',
      scope:{
        product:'=singleProduct'
      },
      link: function(scope,element,attrs){

      }
    };
  }
  

})(window.angular);
