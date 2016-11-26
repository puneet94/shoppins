(function(angular){
  angular.module('app.store')
  .directive('filterDirective',["$window","$location", filterDirective])
  .directive('addClass',["$window","$location", addClassDirective])
  .directive('removeClass',["$window","$location", removeClassDirective])
  .directive('siblingRemoveClass',["$window","$location", siblingRemoveClassDirective]);
  function filterDirective($window,$location) {
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
      link: function(scope, element, attrs) {
      }
    };
  }
  function addClassDirective($window,$location) {
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
  function siblingRemoveClassDirective($window,$location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).on('click',function(){
          $(this).siblings().removeClass(attrs.siblingRemoveClass);
        });

      }
    };
  }

  function removeClassDirective($window,$location) {
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
