(function(angular){
  'use strict';
  angular.module('app.store')
  .directive('filterDirective',[ filterDirective])
  .directive('addClass',[ addClassDirective])
  .directive('removeClass',[ removeClassDirective])
  .directive('siblingRemoveClass',[ siblingRemoveClassDirective]);
  function filterDirective() {
    return {
      restrict: 'E',
      templateUrl:'app/store/views/filterDirectiveTemplate.html',
      scope:{
        filterName:"@filterName",
        radioModel:"=radioModel",
        radioChange:"&radioChange",
        radioRepeat:"=radioRepeat",
        clearClick:"&clearClick"
      },
      
    };
  }
  function addClassDirective() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).on('click',function(){
          //$(element).removeClass('highlightClass');
          $(this).addClass(attrs.addClass);

        });

      }
    };
  }
  function siblingRemoveClassDirective() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).on('click',function(){
          $(this).siblings().removeClass(attrs.siblingRemoveClass);
        });

      }
    };
  }

  function removeClassDirective() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).on('click',function(){
          $(this).siblings('.filterDirectiveRadioGroup').find('.filterRadioButton').removeClass(attrs.removeClass);
        });

      }
    };
  }


})(window.angular);
