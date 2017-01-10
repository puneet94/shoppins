
(function(angular){
  'use strict';
  angular.module('app.offer')
  .directive('singleOfferDirective',[singleOfferDirective]);
  
  function singleOfferDirective(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl:'app/offer/views/singleofferTemplate.html',
      scope:{
        offer:'=singleOffer',
        'isAdminOffer': '@adminOffer'
      },
      link: function(scope,element,attrs){
        
      }
    };
  }
  

})(window.angular);
