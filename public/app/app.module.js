angular.module('myApp',
  ['ngRoute','ngCookies','ngMessages','ngSanitize','afkl.lazyImage','satellizer','ngFileUpload','ngMap',
    'authModApp','app.common','app.home','app.store','app.admin','ngMaterial','app.review','app.product','app.user']
  ).config(['$routeProvider','$mdThemingProvider',
  function($routeProvider,$mdThemingProvider) {
      $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('yellow')
     .warnPalette('orange');
     //.backgroundPalette('blue-grey');
      $routeProvider.
      otherwise({
        redirectTo: '/home'
      });
  }]);

// red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,,
//light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
// .config(function($mdThemingProvider) {
//   $mdThemingProvider.theme('default')
//     .primaryPalette('pink')
//     .accentPalette('orange');
// });//"angular-material": "master","ng-directive-lazy-image": "afkl-lazy-image#^0.3.1"
