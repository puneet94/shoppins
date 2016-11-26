angular.module('myApp',
  ['ngRoute','ngCookies','ngMessages','ngSanitize','afkl.lazyImage','satellizer','ngFileUpload','jkAngularCarousel',
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

angular.module('app.admin',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/admin/createStore', {
        templateUrl: 'app/admin/views/adminCreateStore.html',
        controller: 'CreateStoreController',
        controllerAs: 'csc',
        resolve:{
          redirectIfNotAuthenticated: redirectIfNotAuthenticated
        }
      }).when('/admin/adminStorePage/:storeId', {
        templateUrl: 'app/admin/views/adminStorePage.html',
        controller: 'AdminStoreController',
        controllerAs: 'asc',
        resolve:{
          redirectIfNotAuthenticated: redirectIfNotAuthenticated,
          redirectIfNotStoreAuthenticated: redirectIfNotStoreAuthenticated
        }
      })/*.when('/store/storesCollection/category/:category/:location/:slug?', {
        templateUrl: 'app/store/views/storesCategoryCollection.html',
        controller: 'StoreCategoryCollectionController',
        controllerAs: 'sccc'
      }).when('/store/storesCollection/location/:location/:slug?', {
        templateUrl: 'app/store/views/storesLocationCollection.html',
        controller: 'StoreLocationCollectionController',
        controllerAs: 'slcc'
      }).when('/store/singleStore/:storeId/:myslug?', {
        templateUrl: 'app/store/views/singleStore.html',
        controller: 'SingleStoreController',
        controllerAs: 'ssc'
      })*/;
  }]);


function redirectIfNotAuthenticated($q, $timeout,$auth,changeBrowserURL) {
            var defer = $q.defer();
            if($auth.isAuthenticated()) {
              defer.resolve(); /* (3) */
            } else {
              $timeout(function () {
                changeBrowserURL.changeBrowserURLMethod('/login');//$state.go(‘login’); /* (4) */
              });
              defer.reject();
            }
            return defer.promise;
}

function redirectIfNotStoreAuthenticated($q,$route,userData,adminStoreService,changeBrowserURL) {
            var defer = $q.defer();
            adminStoreService.getStore($route.current.params.storeId,{'select':'admin'}).then(function(response){
              console.log('the');
              console.log(userData.getUser()._id);
              console.log(response);
              if(userData.getUser()._id==response.data.admin){
                defer.resolve();  
                
              }
              else{
                defer.reject();
                changeBrowserURL.changeBrowserURLMethod('/home');
              }
            },function(response){
              console.log(response);
            });
            
            return defer.promise;
}
          


(function(angular){
'use strict';

/**
 * @ngdoc overview
 * @name authModApp
 * @description
 * # authModApp
 *
 * Main module of the application.
 */
angular
  .module('authModApp', [
    'ngCookies',
    'ngRoute',
    'satellizer'
  ])
  .config(["$routeProvider","$httpProvider","$authProvider",authConfig]);
  function authConfig($routeProvider,$httpProvider,$authProvider) {
    //shopuae
    var fbClientId = '991629147629579';
    //shoppinss
    //var fbclientId = '1068203956594250';
    var authenticateUrl = 'https://shoppins.herokuapp.com/authenticate';
    $routeProvider
      .when('/signup',{
        templateUrl:'app/authentication/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rcl'
      })
      .when('/logout',{
        controller: 'LogoutCtrl'
      })
      .when('/login', {
        templateUrl: 'app/authentication/views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });
      $authProvider.loginUrl =authenticateUrl + "/login";
      $authProvider.signupUrl = authenticateUrl+"/signup";

      $authProvider.facebook({
        clientId: fbClientId,
        url:authenticateUrl+'/auth/facebook'
      });
      //$httpProvider.interceptors.push('authInterceptor');
  }
})(window.angular);

(function(angular){
'use strict';
angular.module('app.common',[]);
})(window.angular);
//mongod --config C:\Program Files\MongoDB\mongo.config

//mongod.exe --storageEngine=mmapv1

//https://www.npmjs.com/package/ng-file-upload#node

//tvBBDUqIvQAAAAAAAAAACDM-ioz0dFLdYfD6B60bpAKBpHNB79L42WhumJM_DAYG dropbox access token

//du2b4powv cloudinary cloud name

(function(angular){
	angular.module('app.home',[])
		.config(['$routeProvider',config]);
		 function config($routeProvider) {
		    $routeProvider.
		      when('/home', {
		        templateUrl: 'app/home/homePage.html',
		        controller: 'HomeController',
		        controllerAs: 'hm'
		      });
		 }

})(window.angular);



//mongod --config C:\Program Files\MongoDB\mongo.config

//mongod.exe --storageEngine=mmapv1

//https://devdactic.com/restful-api-user-authentication-1/

//passport js angularjs
//https://github.com/DaftMonk/angular-passport
//https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=passport%20js%20angularjs

//http://speakingaword.blogspot.in/2013/08/authentication-in-angularjs-nodejs-and.html

angular.module('app.product',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/productsCollectionName/:productName/:location/:slug?', {
        templateUrl: 'app/product/views/productsNameCollection.html',
        controller: 'ProductNameCollectionController',
        controllerAs: 'pncc'
      }).when('/productsCollectionCategory/:category/:location/:slug?', {
        templateUrl: 'app/product/views/productsCategoryCollection.html',
        controller: 'ProductCategoryCollectionController',
        controllerAs: 'pccc'
      }).when('/productsCollectionSubCategory/:subCategory/:location/:slug?', {
        templateUrl: 'app/product/views/productsSubCategoryCollection.html',
        controller: 'ProductSubCategoryCollectionController',
        controllerAs: 'pscc'
      }).when('/product/singleProduct/:productId/:slug?', {
        templateUrl: 'app/product/views/singleProduct.html',
        controller: 'SingleProductController',
        controllerAs: 'spc'
      }).when('/productsCollectionLocation/:location/:slug?', {
        templateUrl: 'app/product/views/productsLocationCollection.html',
        controller: 'ProductsLocationController',
        controllerAs: 'plc'
      });
  }]);

//productsCollection/";
//productsCollectionCategory/";
//productsCollectionSubCategory/";
//product/singleProductName/necklace12/hyderabad/necklace12-products-in-hyderabad
(function(angular){

  'use strict';

  /**
   * @ngdoc overview
   * @name app.review
   * @description
   * # app.review
   *
   * Review module of the application.
   */
  angular.module('app.review',[]);
})(window.angular);

angular.module('app.store',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/store', {
        templateUrl: 'app/store/storePost.html',
        controller: 'StoreController',
        controllerAs: 'sm'  
      }).when('/store/storesCollection/storeName/:storeName/:location/:slug?', {
        templateUrl: 'app/store/views/storesNameCollection.html',
        controller: 'StoreNameCollectionController',
        controllerAs: 'sncc'
      }).when('/store/storesCollection/category/:category/:location/:slug?', {
        templateUrl: 'app/store/views/storesCategoryCollection.html',
        controller: 'StoreCategoryCollectionController',
        controllerAs: 'sccc'
      }).when('/store/storesCollection/location/:location/:slug?', {
        templateUrl: 'app/store/views/storesLocationCollection.html',
        controller: 'StoreLocationCollectionController',
        controllerAs: 'slcc'
      }).when('/store/singleStore/:storeId/:myslug?', {
        templateUrl: 'app/store/views/singleStore.html',
        controller: 'SingleStoreController',
        controllerAs: 'ssc'
      });
  }]);

angular.module('app.user',[]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/user/:userId', {
        templateUrl: 'app/user/views/userProfilePage.html',
        controller: 'UserPageController',
        controllerAs: 'upc'
      });
  }]);

(function(angular){
'use strict';
angular.module('app.common',[]);
})(window.angular);
//mongod --config C:\Program Files\MongoDB\mongo.config

//mongod.exe --storageEngine=mmapv1

//https://www.npmjs.com/package/ng-file-upload#node

//tvBBDUqIvQAAAAAAAAAACDM-ioz0dFLdYfD6B60bpAKBpHNB79L42WhumJM_DAYG dropbox access token

//du2b4powv cloudinary cloud name

(function(angular){
'use strict';
angular.module('app.common')
	.service('citiesService', ["$http","baseUrlService",CitiesService])
	.service('getCategoryService',[function(){}])
	.service('searchService', ["baseUrlService","$http",SearchService])
	.service('httpService', ["$http",HttpService])
	.service('sortService',[SortService])
	.service('changeBrowserURL', ["$location",ChangeBrowserURL])
	.service('arrayObjectMapper',[ArrayObjectMapper])
	.service('arrayUniqueCopy',[ArrayUniqueCopy])
	.service('userLocationService',[UserLocationService])
	.service('baseUrlService',[AjaxURL])
	.service('getCityLocalitiesService',["$http","baseUrlService",GetCityLocalitiesService])
	.service('getCityCategoriesService',["$http","baseUrlService",GetCityCategoriesService])
	.service('getCityProductLocalitiesService',["$http","baseUrlService",GetCityProductLocalitiesService])
	.service('getCityProductCategoriesService',["$http","baseUrlService",GetCityProductCategoriesService])
	.service('getCityProductSubCategoriesService',["$http","baseUrlService",GetCityProductSubCategoriesService])
	.factory('cityStorage',["$window",cityStorage]);
	function CitiesService($http,baseUrlService){
   		this.getCities = function() {
   			var gc = this;

      		gc.cityData = $http.get(baseUrlService.baseUrl+"store/cities");
			return  gc.cityData;
		};
	}
	function SearchService(baseUrlService,$http){
   		this.getSearches = function(userLocation) {
   			var gs = this;
   			gs.searchesData  = undefined;
   			var url = baseUrlService.baseUrl+"search/searches/"+userLocation;
      		gs.searchesData = $http.get(url);
			return  gs.searchesData;
		};
		this.getAjaxSearches = function(city,userSearchText) {
   			
   			var url = baseUrlService.baseUrl+"search/searches/"+city+'/'+userSearchText;
      		return $http.get(url);
			
		};
	}
	function HttpService($http){
		this.getService = function(url){
			return $http.get(url);
		};
	}
	function SortService(){
		this.sortByKey = function(array, key) {
		    return array.sort(function(a, b) {
		        var x = a[key]; var y = b[key];
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		    	});
		};
	}

	function ChangeBrowserURL($location){
		this.changeBrowserURLMethod = function(path,paramValue){
			if(paramValue){
					$location.path(path).search({param: paramValue});
			}
			$location.path(path);
			//$location.url($location.path());
		};
	}
	function ArrayObjectMapper(){
		this.getArrayFunction = function(arrayObj,item){
			var arr1 = [];
			for (var i = arrayObj.length - 1; i >= 0; i--) {
						arr1.push(arrayObj[i][item]);
			}
			return arr1;
		};
	}
	function ArrayUniqueCopy(){
		this.getUniqueCopyFunction = function(sourceArray,destArray){
			angular.forEach(sourceArray, function(item){
				if(destArray.indexOf(item)==-1){
					destArray.push(item);
				}

			});
			return destArray;
		};
	}
	function UserLocationService(){

	}
	function cityStorage($window) {
		var storage = $window.localStorage;

		var obj1 =  {
			setCity: function (city) {
				
				
				if(city){
					storage.setItem('city',JSON.stringify(city));
				}
			},
			getCity: function(){
				return JSON.parse(storage.getItem('city'));
			},
			isCityExists: function(){
				if(obj1.getCity()){
					return true;
				}
				return false;
			}
		};
		return obj1;
	}

	function AjaxURL(){
		this.baseUrl = "https://shoppins.herokuapp.com/";

		this.getStoresWithCatgeoryLocation = this.baseUrl + "store/storesCollection/category/";//:category/:location?";
		this.getStoresWithNameLocation = this.baseUrl + "store/storesCollection/storeName/";
		this.getSingleStoreWithId = this.baseUrl + "store/singleStore/";

		this.getProductsWithCatgeoryLocation = this.baseUrl + "product/productsCollection/category/";//:product/:location?";
		this.getProductsWithSubCatgeoryLocation = this.baseUrl + "product/productsCollection/subCategory/";//:product/:location?";
		this.getProductsWithNameLocation = this.baseUrl + "product/productsCollection/productName/";
		this.getProductsWithStoreId = this.baseUrl + "product/productsCollection/store/";
		this.getSingleProductWithId = this.baseUrl + "product/singleProduct/";

		this.getCategoriesWithLocation = this.baseUrl + "categories/location";

	}
	
	function GetCityLocalitiesService($http,baseUrlService){
		this.getCityLocalities = getCityLocalities;
		function getCityLocalities(city){
			return $http.get(baseUrlService.baseUrl+"store/localities/"+city);
		}
	}
	function GetCityCategoriesService($http,baseUrlService){
		this.getCityCategories = getCityCategories;

		function getCityCategories(city){
				return $http.get(baseUrlService.baseUrl+"store/categories/"+city);
		}

	}
	function GetCityProductLocalitiesService($http,baseUrlService){
		this.getCityLocalities = getCityLocalities;
		function getCityLocalities(city){
			return $http.get(baseUrlService.baseUrl+"product/localities/"+city);
		}
	}
	function GetCityProductCategoriesService($http,baseUrlService){
		this.getCityCategories = getCityCategories;

		function getCityCategories(city){
				return $http.get(baseUrlService.baseUrl+"product/categories/"+city);
		}

	}
	function GetCityProductSubCategoriesService($http,baseUrlService){
		this.getCitySubCategories = getCitySubCategories;

		function getCitySubCategories(city){
				return $http.get(baseUrlService.baseUrl+"product/subCategories/"+city);
		}

	}
})(window.angular);

/*common directives like scroll...*/
(function(angular){
  angular.module('app.common')
  .directive('toggleElement',["$window","$location", toggleElement])
  .directive('scrollDown', ["$window","$location", scrollDown])
  .directive('toggleMobile',["$window","$location", toggleMobile])
  .directive('loadingDirective',[loadingDirective])
  .directive('innerLoadingDirective',[innerLoadingDirective])
  .directive('metaTags',[metaTagsDirective])
  .directive('likeDirective',[likeDirective])
  .directive('followDirective',[followDirective])
  .directive('smallLoadingDirective',[smallLoadingDirective])
  .directive('bindHtmlCompile', ['$compile', bindHtmlCompile])
  .directive('imagesListDirective',[imagesListDirective])
  .directive('singleImageDirective',[singleImageDirective]);
  function imagesListDirective(){
    return {
      restrict: 'E',
      replace:true,
      templateUrl:'app/common/views/imagesList.html',
      scope:{
        imagesList:'='
      },
      link: function(scope,element,attrs){

      }
    };
  }
  function singleImageDirective(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl:'app/common/views/singleImage.html',
      scope:{
        image:'='
      },
      link: function(scope,element,attrs){

      }
    };
  }
  function bindHtmlCompile($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    // In case value is a TrustedValueHolderType, sometimes it
                    // needs to be explicitly called into a string in order to
                    // get the HTML string....
                    element.html(value && value.toString());
                    // If scope is provided use it, otherwise use parent scope
                    var compileScope = scope;
                    if (attrs.bindHtmlScope) {
                        compileScope = scope.$eval(attrs.bindHtmlScope);
                    }
                    $compile(element.contents())(compileScope);
                });
            }
        };
    }
  
  function toggleElement($window,$location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var path = $location.path();

        $(element[0]).on('click',function(){
          if(path.indexOf('/home')==-1){
              $(attrs.toggleElement).slideToggle();
          }
        });



        var lastScrollTop = 0;

        if(path.indexOf('/home')==-1){


        }

      }
    };
  }


function scrollDown($window,$location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var lastScrollTop = 0;
      var path = $location.path();

      if(path.indexOf('/home')==-1){


        $(window).on("scroll", function() {
          windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
          if(path.indexOf('/home')==-1 && ($(window).scrollTop()>170)){
            if (windowWidth <= 601 && path.indexOf('/home')==-1 && ($(window).scrollTop()>170)) {
              var st = $(this).scrollTop();
              if (st > lastScrollTop) {

                $('.scrollUpSearch').slideUp("fast");
              } else {

                $('.scrollUpSearch').slideDown("fast");
              }
              lastScrollTop = st;
              scope.$apply();
            }
          }

        });

      }

    }
  };
}

function toggleMobile($window,$location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      $(element).on('click',function(){
        windowWidth = window.innerWidth ? window.innerWidth : $(window).width();

          if (windowWidth <= 961 ) {

            $(attrs.toggleMobile).slideToggle();
            scope.$apply();

          }


      });
    }
  };
}

function loadingDirective() {
      return {
        restrict: 'E',
        replace:true,
        scope:{
          loading:"=loading"
        },
        template: '<div class="ajaxLoadingSpinnerDiv"><div class="ajaxLoadingSpinner"></div></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      };
  }

function innerLoadingDirective() {
      return {
        restrict: 'E',
        replace:true,
        scope:{
          loading:"=innerLoading"
        },
        template: '<div class="innerSpinnerDiv"><div class="ajaxLoadingSpinner"></div></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      };
  }


  function smallLoadingDirective() {
      return {
        restrict: 'EA',
        replace:true,
        scope:{
          smallLoading:"=smallLoading"
        },
        template: '<span style="position:relative"><div class="spinner"></div></span>',
        link: function (scope, element, attr) {

              scope.$watch('smallLoading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      };
  }

  function metaTagsDirective(){
    return {
      restrict: 'A',
      link: function(scope, element, attr){
        var keywords = $('meta[name=Keywords]').attr('content');
        var description = $('meta[name=Description]').attr('content');
        console.log();
        //$('meta[name=keywords]').attr('content', 'some random keywords');
      }
    };
  }
  function likeDirective(){
    return {
      restrict: 'E',
      scope: {
        upFn:'&upFn',
        downFn:'&downFn',
        upvChk:'&upvChk',
        smallLoading:'=smallLoading',
        currentReview:'=currentReview'
      },
      templateUrl: 'app/reviews/views/likeReview.html'
    };
  }
  function followDirective(){
    return {
      restrict: 'E',
      scope: {
        upFn:'&upFn',
        downFn:'&downFn',
        upvChk:'&upvChk',
        smallLoading:'=smallLoading'
      },
      templateUrl: 'app/user/views/userFollow.html'
    };
  }

})(window.angular);


(function(angular){

  'use strict';

  /**
   * @ngdoc overview
   * @name app.review
   * @description
   * # app.review
   *
   * Review module of the application.
   */
  angular.module('app.review',[]);
})(window.angular);

(function(angular){
  angular.module('app.admin')

    .controller('AdminStoreController',['$scope','$routeParams','getSingleStore','Upload','baseUrlService',AdminStoreController]);
    function AdminStoreController($scope,$routeParams,getSingleStore,Upload,baseUrlService){	
    	var asc = this;
        asc.storeData = {};
        activate();
        asc.uploadStoreBanner = function(file, errFiles) {
          console.log("Enterd file uploading");
          asc.f = file;
          asc.errFile = errFiles && errFiles[0];
          if (file) {
              file.upload = Upload.upload({
                  url: baseUrlService.baseUrl+'upload/storeBannerUpload/'+$routeParams.storeId,
                  data: {file: file}
              });
              asc.spinnerLoading = true;
              file.upload.then(function (response) {
                  
                      file.result = response.data;
                      //asc.storeForm.bannerImage = response.data;
                      console.log(response.data);
                      $('.storeBannerImage').css('background-image','url('+response.data+')');
                      //asc.spinnerLoading = false;
              });
          }
      };
        function activate(){
            getSingleStore.getStore($routeParams.storeId)
            .then(function(res){
                asc.storeData = res.data;                
                //asc.showImagesCarousel = true;
                asc.loading = false;
        });

        getSingleStore.getStoreRating($routeParams.storeId)
            .then(function(res){
              asc.storeData.storeRatingAvg = res.data;
            });    
        }
    	
    }
})(window.angular);

(function(angular){
  angular.module('app.admin')

    .controller('CreateOfferController',[CreateOfferController]);
    function CreateOfferController(){
    	
    }
})(window.angular);

(function(angular){
  angular.module('app.admin')

    .controller('CreateProductController',['$routeParams','adminProductService','Upload','baseUrlService',CreateProductController]);
    function CreateProductController($routeParams,adminProductService,Upload,baseUrlService){
    	var csc = this;
    	csc.productForm = {};
        csc.productForm.price = {};
    	activate();
    	csc.createProduct = createProduct;

        csc.uploadMultipleImages = function (files) {
        csc.files = files;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: baseUrlService.baseUrl+'upload/singleUpload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    console.log(response.data);
                    csc.productForm.productImages.push(response.data);
                });
            }, function (response) {
                if (response.status > 0)
                    csc.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });
        
    };
        csc.uploadProductImage = function(file, errFiles) {
          console.log("Enterd file uploading");
          csc.f = file;
          csc.errFile = errFiles && errFiles[0];
          if (file) {
              file.upload = Upload.upload({
                  url: baseUrlService.baseUrl+'upload/singleUpload',
                  data: {file: file}
              });
              csc.spinnerLoading = true;
              file.upload.then(function (response) {
                  
                      file.result = response.data;
                      csc.productForm.bannerImage = response.data;
                      console.log(response.data);
                      $('.productMainImage').css('background-image','url('+response.data+')');
                      
              });
          }
      };

    	function createProduct(){
    		adminProductService.createProduct(csc.productForm,$routeParams.storeId)
	    		.then(function(response){
	    			console.log(response);
	    			alert("product created");
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		
    	}
    }
})(window.angular);

(function(angular){
  angular.module('app.admin')
    .controller('CreateStoreController',['$auth','adminStoreService','Upload','userData','$timeout','baseUrlService','$location',CreateStoreController]);
    function CreateStoreController($auth,adminStoreService,Upload,userData,$timeout,baseUrlService,$location){
    	var csc = this;
    	csc.storeForm = {};
      csc.storeForm.storeImages = [];
    	activate();
    	csc.createStore = createStore;
    csc.uploadMultipleImages = function (files) {
        csc.files = files;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: baseUrlService.baseUrl+'upload/singleUpload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    console.log(response.data);
                    csc.storeForm.storeImages.push(response.data);
                });
            }, function (response) {
                if (response.status > 0)
                    csc.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });
        
    };
    	function createStore(){
        csc.storeForm.bannerImage = csc.storeForm.storeImages[0];
    		adminStoreService.createStore(csc.storeForm)
	    		.then(function(response){
	    			console.log(response.data._id);
            userData.setUser();
	    			alert("store created");
            $location.url('/admin/adminStorePage/'+response.data._id);
            //$window.location.reload();
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		
    	}
    	
    }
})(window.angular);

(function(angular){
  angular.module('app.admin')

    .controller('EditProductController',['$auth','adminProductService','$routeParams',EditProductController]);
    function EditProductController($auth,adminProductService,$routeParams){
    	var csc = this;
    	csc.productForm = {};
    	activate();
    	csc.createProduct = createProduct;
        
    	function createProduct(){
    		adminProductService.updateProduct($routeParams.productId,csc.productForm)
	    		.then(function(response){
	    			console.log(response);
	    			alert("product created");
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		adminProductService.getProduct($routeParams.productId).then(function(response){
    			console.log(response);

                response.data.category = response.data.category.join(",");
                response.data.subCategory = response.data.subCategory.join(",");
                response.data.keywords = response.data.keywords.join(",");
                console.log(response);
    			csc.productForm = response.data;
    		});
    	}
    }
})(window.angular);

(function(angular){
  angular.module('app.admin')

    .controller('EditStoreController',['$auth','adminStoreService','Upload','$routeParams','$timeout','baseUrlService',EditStoreController]);
    function EditStoreController($auth,adminStoreService,Upload,$routeParams,$timeout,baseUrlService){
    	var csc = this;
    	csc.storeForm = {};
    	activate();
    	csc.createStore = createStore;
        
        

        csc.uploadSingleImage = function(file, errFiles) {
          console.log("Enterd file uploading");
          csc.f = file;
          csc.errFile = errFiles && errFiles[0];
          if (file) {
              file.upload = Upload.upload({
                  url: baseUrlService.baseUrl+'upload/singleUpload',
                  data: {file: file}
              });
              csc.spinnerLoading = true;
              file.upload.then(function (response) {
                  
                      file.result = response.data;
                      csc.storeForm.bannerImage = response.data;
                      //$('.userProfileImage').find('img').attr('src',response.data);
                      csc.spinnerLoading = false;
              });
          }
      };
    csc.uploadMultipleImages = function (files) {
        csc.files = files;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: baseUrlService.baseUrl+'upload/singleUpload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    console.log(response.data);
                    csc.storeForm.storeImages.push(response.data);
                });
            }, function (response) {
                if (response.status > 0)
                    csc.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });
        
    };
    	function createStore(){
    		adminStoreService.updateStore($routeParams.storeId,csc.storeForm)
	    		.then(function(response){
	    			console.log(response);
	    			alert("store created");
	    		},function(response){
	    			console.log(response);
	    		});	
    	}
    	
    	
    	function activate(){
    		adminStoreService.getStore($routeParams.storeId).then(function(response){
    			console.log(response);

                response.data.category = response.data.category.join(",");
                response.data.subCategory = response.data.subCategory.join(",");
                response.data.keywords = response.data.keywords.join(",");
                console.log(response);
    			csc.storeForm = response.data;
    		});
    	}
    }
})(window.angular);



(function(angular){
  angular.module('app.admin')

    .controller('StoreStatisticsController',[StoreStatisticsController]);
    function StoreStatisticsController(){
    	
    }
})(window.angular);

(function(angular){
  'use strict';

angular.module('app.admin')
  .service('adminProductService',["$http","baseUrlService",'changeBrowserURL',AdminProductService]);

/*
  * This servic has a function to get collection of products`
*/

function AdminProductService($http,baseUrlService,changeBrowserURL){
  this.checkProductAdmin = checkProductAdmin;
  this.createProduct = createProduct;
  this.getProduct = getProduct;
  this.updateProduct = updateProduct;
  this.deleteProduct  = deleteProduct;
  function checkProductAdmin(userId,productId){
    return $http.get(baseUrlService.baseUrl);
  }
  function createProduct(product,storeId){
  	return $http.post(baseUrlService.baseUrl+'admin/products/'+storeId,product);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function updateProduct(productId,product){
  	return $http.put(baseUrlService.baseUrl+'admin/product/'+productId,product);
  }
  function getProduct(productId,obj){
    return $http.get(baseUrlService.baseUrl+'admin/product/'+productId,{params:obj});       
  }
  function deleteProduct(){

  }
}
})(window.angular);

(function(angular){
  'use strict';

angular.module('app.admin')
  .service('adminStoreService',["$http","baseUrlService",'changeBrowserURL',AdminStoreService]);

/*
  * This servic has a function to get collection of stores`
*/

function AdminStoreService($http,baseUrlService,changeBrowserURL){
  this.checkStoreAdmin = checkStoreAdmin;
  this.createStore = createStore;
  this.getStore = getStore;
  this.updateStore = updateStore;
  this.deleteStore  = deleteStore;
  function checkStoreAdmin(userId,storeId){
    return $http.get(baseUrlService.baseUrl);
  }
  function createStore(store){
  	return $http.post(baseUrlService.baseUrl+'admin/stores',store);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function updateStore(storeId,store){
  	return $http.put(baseUrlService.baseUrl+'admin/store/'+storeId,store);
  }
  function getStore(storeId,obj){
    return $http.get(baseUrlService.baseUrl+'admin/store/'+storeId,{params:obj});       
  }
  function deleteStore(){

  }
}
})(window.angular);


// 'use strict';
//
// /*
//  * @ngdoc function
//  * @name authModApp.controller:HeaderCtrl
//  * @description
//  * # HeaderCtrl
//  * Controller of the authModApp
//  */
// angular.module('authModApp')
//   .controller('HeaderCtrl', function (userData,$auth,$location) {
//     var hcl = this;
//     hcl.isAuthenticated = isAuthenticated;
//     hcl.logOut = logOut;
//     //console.log($auth.getPayload()["sub"]);
//     function logOut(){
//         $auth.logout();
//         console.log('********logout*******');
//         console.log(userData.getUser());
//         userData.removeUser();
//         console.log(userData.getUser());
//     	$location.path("/");
//     }
//     function isAuthenticated(){
//     	return $auth.isAuthenticated();
//     }
//   });

(function(angular){
'use strict';

/**
 * @ngdoc function
 * @name authModApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the authModApp
 */
angular.module('authModApp')
  .controller('LoginController', ["$location","$window","$auth","userData","baseUrlService",LoginCtrl]);

  function LoginCtrl($location,$window,$auth,userData,baseUrlService) {
    var logCl = this;
    logCl.user = {};
    logCl.submitLogin = submitLogin;
    logCl.signUp = signUp;
    
    logCl.authenticate = function(provider) {
      $auth.authenticate(provider);
      $location.path("/");

    };
    function signUp(){
      $location.path("/signup");
    }
    function submitLogin(){
    	//authorize.login(logCl.user)
      $auth.login(logCl.user)
    	.then(function(response){

          userData.setUser(response.data.user);    
          alert("Login successfull");
          window.history.back();
    		},function(response){
    			console.log(response);
    		});
    }
  }

})(window.angular);
  /* please work
	<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1068203956594250',
      xfbml      : true,
      version    : 'v2.6'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
  */

// 'use strict';
//
// /**
//  * @ngdoc function
//  * @name authModApp.controller:LogoutCtrl
//  * @description
//  * # LogoutCtrl
//  * Controller of the authModApp
//  */
// angular.module('authModApp')
//   .controller('LogoutCtrl', function ($location,authToken) {
//     var lcl = this;
//     authToken.removeToken();
//     $location.path("/");
//   });

(function(angular){
'use strict';

/**
 * @ngdoc function
 * @name authModApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the authModApp
 */
angular.module('authModApp')
	.controller('RegisterCtrl', ["$scope","userData","$auth","$location",RegisterCtrl]);

	function RegisterCtrl($scope,userData,$auth,$location) {
		var rc = this;
		rc.user = {};
	    rc.formSubmit = formSubmit;
	    //var url = 'http://localhost:8000/register';

	    function formSubmit(){

		    $auth.signup(rc.user)
				.then(function(response){
					console.log(response);
			    		
			    		$auth.setToken(response.data.token);
			    		userData.setUser(response.data.user);
			    		//console.log(userData.getUser());
							window.history.back();
					},function(response){
						console.log(response);
				});
		}
	}
})(window.angular);
// $http.post(url,rc.user).then(function(res){
			    	// 	authToken.setToken(res.data.token);
			    	// 	console.log(res);
			    	// 	$location.path("/");
			    	// },function(data){
			    	// 	console.log(data);
			    	// });

// 'use strict';
//
// /**
//  * @ngdoc function
//  * @name authModApp.controller:ReviewsCtrl
//  * @description
//  * # ReviewsCtrl
//  * Controller of the authModApp
//  */
//  /*reviews.reviewsList
// reviews.userReview
// reviews.submitReview()*/
// angular.module('authModApp')
//   .controller('ReviewsCtrl', ["$http","$auth",reviewsCtrl]);
//   function reviewsCtrl($http,$auth) {
//     var reviews = this;
//     reviews.user = {};
//     reviews.submitReview = submitReview;
//     $http.get('http://localhost:8000/reviews/user/'+$auth.getPayload()["sub"])
//     	.then(function(response){
//     		console.log(response);
//     	},function(response){
//     		console.log(response);
//     	});
//     function submitReview(){
//     	reviews.user.userId = $auth.getPayload()["sub"];
//     	console.log(reviews.user);
//     	$http.post("http://localhost:8000/reviews",reviews.user)
//     		.then(function(response){
//     			console.log(response);
//     		},function(response){
//     			console.log(response);
//     		});
//
//     }
//   }



/**
 * @ngdoc directive
 * @name authModApp.directive:sameAs
 * @description
 * # sameAs
 */
 (function(angular){
 'use strict';
	angular.module('authModApp')
		.directive('sameAs', function () {
			return {
				require: 'ngModel',
				restrict: 'EA',
				link: function postLink(scope, element, attrs,ngModelCtrl) {
          console.log(attrs);
          console.log(attrs.sameAs);
					//console.log(scope.$eval(attrs.sameAs));
					function validateEqual(value){
						var valid = (value === scope.$eval(attrs.sameAs));
						ngModelCtrl.$setValidity('equal',valid);
						return valid ? value : undefined;
					}
					ngModelCtrl.$parsers.push(validateEqual);
					ngModelCtrl.$formatters.push(validateEqual);
					scope.$watch(attrs.sameAs,function(){
						ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
					});
				}
			};
		});

})(window.angular);

(function(angular){
'use strict';

/**
 * @ngdoc service
 * @name authModApp.userData
 * @description
 * # userData
 * Factory in the authModApp.
 */
angular.module('authModApp')
  .factory('userData',['$window','$route','$auth','$http',"baseUrlService","changeBrowserURL",userData]);

  function userData($window,$route,$auth,$http,baseUrlService,changeBrowserURL) {
    var storage = $window.localStorage;
    var cachedUser={};
    var obj1 =  {
      setUser: function (user) {
        
        if(user){
          storage.setItem('user',JSON.stringify(user));
        }
        else{

          var userId = $auth.getPayload().sub;
          if(userId){
            $http.get(baseUrlService.baseUrl+'authenticate/user/'+userId).then(function(res){
              
              if(obj1.isUserExists()){
                  storage.removeItem('user');
              }

              storage.setItem('user',JSON.stringify(res.data.user));
              //
              //$route.reload();
            //  $window.location.reload();

            },function(res){
              console.log(res);
            });
          }
        }
        

      },
      getUser: function(){

        return JSON.parse(storage.getItem('user'));
      //   if(!cachedUser){
      //     cachedUser = storage.getItem('user');
      //   }
      // return cachedUser;
      },
      removeUser: function(){
        cachedUser = null;
        //console.log('***********logged out*************');
        storage.removeItem('user');
      },
      isUserExists: function(){
        if(obj1.getUser()){
          return true;
        }
        return false;
      },
      getUserPage: function(userId){
        var url = "/user/"+userId;
        changeBrowserURL.changeBrowserURLMethod(url);
      }
    };
    return obj1;
  }
})(window.angular);

(function(angular){
	'use strict';

	angular.module('app.home')
		.controller("AuthController",["$scope","changeBrowserURL","$auth","$window","$route","userData",AuthController]);
	function AuthController($scope,changeBrowserURL,$auth,$window,$route,userData){
			var phc = this;
			phc.toHomePage = toHomePage;
			phc.authenticate = authenticate;
			phc.authLogout = authLogout;
			phc.loginPage = loginPage;
			
			phc.isAuth = $auth.isAuthenticated();

			function toHomePage(){
				changeBrowserURL.changeBrowserURLMethod('/');
			}
			function loginPage(){
				changeBrowserURL.changeBrowserURLMethod('/login');
			}
			function authenticate(provider) {
		    	$auth.authenticate(provider).then(function(response) {
						userData.setUser();
						alert('login with facebook successfull');
						//$route.reload();
						$window.location.reload();
	        });
	    	}
	    	function authLogout(){
					$auth.logout();
	        		userData.removeUser();
					toHomePage();
	    	}
	}


})(window.angular);

(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('HeaderController',["$scope","userData","changeBrowserURL","$auth","$mdDialog", "$mdMedia","$timeout", "$mdSidenav", "$log",HeaderController]);

	function HeaderController($scope,userData,changeBrowserURL,$auth,$mdDialog, $mdMedia,$timeout, $mdSidenav, $log){
			var phc = this;
			phc.toHomePage = toHomePage;
			phc.authenticate = authenticate;
			phc.authLogout = authLogout;
			phc.showAdvanced = showAdvanced;
			phc.customFullscreen = undefined;
			phc.isAuth = $auth.isAuthenticated();
			phc.isOpenLeft = function(){
	      return $mdSidenav('left').isOpen();
	    };
	   phc.toggleLeft = buildToggler('left');

	  function buildToggler(navID) {
	      return function() {
	        // Component lookup should always be available since we are not using `ng-if`.
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            $log.debug("toggle " + navID + " is done");
	          });
	      };
	    }
			function toHomePage(){
				changeBrowserURL.changeBrowserURLMethod('/');
			}
			function authenticate(provider) {
		    	$auth.authenticate(provider);
		    	toHomePage();
	    	}
	    	function authLogout(){
	    		$auth.logout();toHomePage();
	    	}
	    	function showAdvanced(ev) {
			    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			    $mdDialog.show({
			      controller: 'ModalFormLoginController',
			      templateUrl: 'app/home/views/modalFormLogin.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: phc.customFullscreen
			    })
			    .then(function(answer) {
			      $scope.status = 'You said the information was "' + answer + '".';
			    }, function() {
			      $scope.status = 'You cancelled the dialog.';
			    });
			    $scope.$watch(function() {

	      			return $mdMedia('md') || $mdMedia('xl');
	    		}, function(wantsFullScreen) {
		      		phc.customFullscreen = (wantsFullScreen === true);

	    		});

	  		}
	}

})(window.angular);

(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('HomeController',["$scope","citiesService","searchService","changeBrowserURL",homeController])

	.controller('CategoryListController',["$scope","$http","getCategoryService","arrayUniqueCopy","arrayObjectMapper","userLocationService","changeBrowserURL","baseUrlService",CategoryListController]);


	function CategoryListController($scope,$http,getCategoryService,arrayUniqueCopy,arrayObjectMapper,userLocationService,changeBrowserURL,baseUrlService){
		var clc = this;
		clc.cateList = [];
		clc.categLoadMore = false;
		clc.pageNo = 0; //for fetching categories
		clc.getCategories = getCategories;
		clc.categoryLinkClicked = categoryLinkClicked;
		activate();

		function activate(){
			clc.getCategories();
		}
		function categoryLinkClicked(category){
			var location = userLocationService.getUserLocation();
			var slug = category + "-stores-in-" + location;
			var url = "/store/storesCollection/category/"+category+"/"+location+"/"+slug;
			changeBrowserURL.changeBrowserURLMethod(url);


		}
		function getCategories(){
			//getCategoryService.getCategoryList

			clc.pageNo = clc.pageNo + 1;
			var url = baseUrlService.baseUrl+"store/categories/"+""+clc.pageNo;
			$http.get(url)
				.then(
					function(response){
						angular.forEach(response.data.docs, function(item){
							clc.cateList = arrayUniqueCopy.getUniqueCopyFunction(item.category,clc.cateList);
						});


					},
					function(response){

					}
				);

		}

	}
	function homeController($scope,citiesService,searchService,changeBrowserURL){
		/*var hm= this;
		activate();
		console.log("home controller");
		hm.searchTextChange = searchTextChange;
		hm.selectedItemChange = selectedItemChange;
		hm.userSearchItemChange = userSearchItemChange;

		function userSearchItemChange(item){
			var url = item.userSearchString.split("#&#")[1]+"/"+item.userSearchString.split("#&#")[0]+"/"+item.userSearchString.split("#&#")[2];
			changeBrowserURL.changeBrowserURLMethod(url);
		}
		function searchTextChange(searchText){
			console.log(searchText);
		}
		function selectedItemChange(item){
			console.log(item);
			searchService.getSearches(item.location).then(function(resource){
				console.log(resource);
				hm.userSearches = resource.data;
			},function(data){
				console.log(data);
			});
		}


	    function activate() {
	    	citiesService.getCities()
				.then(function(obj){
					console.log(obj);
					hm.cities =  obj.data;
					console.log("then");
					console.log(hm.cities);
				},function(obj){
					console.log(obj);
					hm.cities =  obj;
				});

	    }*/
	}
})(window.angular);
/*git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo*/

(function(angular){
	'use strict';

	angular.module('app.home')
	.controller('HomeLeftController',["$timeout", "$mdSidenav", "$log",LeftCtrl]);
	function LeftCtrl($timeout, $mdSidenav, $log){
		this.close = function () {
			// Component lookup should always be available since we are not using `ng-if`
			$mdSidenav('left').close()
			.then(function () {
				$log.debug("close RIGHT is done");
			});
		};
	}
})(window.angular);

(function(angular){
	'use strict';

angular.module('app.home')
	.controller('SearchBoxController',["$scope","$http","$routeParams","cityStorage","citiesService","searchService","changeBrowserURL","userLocationService",SearchBoxController]);


function SearchBoxController($scope,$http,$routeParams,cityStorage,citiesService,searchService,changeBrowserURL,userLocationService){
		var hm= this;
		if($routeParams.location){
				hm.selectedItem = $routeParams.location;
		}
		else if(cityStorage.isCityExists()){
			hm.selectedItem = cityStorage.getCity();
		}
		else{
			hm.selectedItem = 'hyderabad';
		}
		activate();
		hm.userSearches = [];
		hm.selectedItemChange = selectedItemChange;
		hm.userSearchItemChange = userSearchItemChange;
		hm.locationSearch = locationSearch;
		hm.userSearchTextChange = userSearchTextChange;

		hm.selectedItemChange(hm.selectedItem);
		function userSearchItemChange(item){


			var changeEntity = item.userSearchString.split("#&#")[1];
			var entityName = item.userSearchString.split("#&#")[0];
			var location = hm.selectedItem;
			hm.slug = entityName + "-"+changeEntity.split("-")[0]+"s-in-" + location;
			console.log(changeEntity);
			if(changeEntity == "store"){

				hm.url = "/store/storesCollection/storeName/";


			}
			else if(changeEntity == "store-category"){

				hm.url = "/store/storesCollection/category/";


			}
			else if(changeEntity == "product"){
						  
				hm.url = "/productsCollectionName/";

			}
			else if(changeEntity == "product-category"){

				hm.url = "/productsCollectionCategory/";


			}
			else if(changeEntity == "product-subcategory"){

				hm.url = "/productsCollectionSubCategory/";

			}
			else if(changeEntity.trim() == "All products in"){
				
				locationProductsSearchUrl();

			}
			else{

				locationStoresSearchUrl();
			}


			changeBrowserURL.changeBrowserURLMethod(hm.url+entityName+"/"+location+"/"+hm.slug);
			console.log(hm.url+entityName+"/"+location+"/"+hm.slug);


		}
		//md-search-text-change="sbc.searchTextChange(sbc.searchText)"
		function userSearchTextChange(city,userSearchText){
			console.log(userSearchText);
			console.log(city);
			if(userSearchText.length>=2){
				searchService.getAjaxSearches(city,userSearchText)
					.then(function(resource){
						hm.loading = true;
				console.log("the resource");
				console.log(resource);
				hm.userSearches = [];
				var allStoresItem = {"userSearchString":"#&#All stores in #&#"+hm.selectedItem};
				var allProductsItem = {"userSearchString":"#&#All products in #&#"+hm.selectedItem};
				hm.userSearches = [allStoresItem,allProductsItem];
				for (var i = resource.data.length - 1; i >= 0; i--) {
					hm.userSearches.push(resource.data[i]);
				}
				hm.loading = false;
					});
			}
		}
		function selectedItemChange(item){
			hm.loading = true;
			//userLocationService.setUserLocation(item);
			cityStorage.setCity(item);
			searchService.getSearches(item).then(function(resource){
				console.log("the resource");
				console.log(resource);
				var allStoresItem = {"userSearchString":"#&#All stores in #&#"+hm.selectedItem};
				var allProductsItem = {"userSearchString":"#&#All products in #&#"+hm.selectedItem};
				hm.userSearches = [allStoresItem,allProductsItem];
				for (var i = resource.data.length - 1; i >= 0; i--) {
					hm.userSearches.push(resource.data[i]);
				}
				hm.loading = false;
			},function(data){
				console.log(data);
			});
		}
		function locationSearch(){
			if(hm.cities.indexOf(hm.selectedItem)!=-1){
				if(!hm.userSearchText||hm.userSearchText.length===0){
					locationStoresSearchUrl();
				}
			}
		}
		function locationStoresSearchUrl(){
			hm.url = "/store/storesCollection/location";
			var myLocation = hm.selectedItem;
			hm.slug = "stores-in-" + myLocation;
			changeBrowserURL.changeBrowserURLMethod(hm.url+"/"+myLocation+"/"+hm.slug);

		}
		function locationProductsSearchUrl(){
			
			hm.url = "/productsCollectionLocation";
			var myLocation = hm.selectedItem;
			hm.slug = "products-in-" + myLocation;
			
			changeBrowserURL.changeBrowserURLMethod(hm.url+"/"+myLocation+"/"+hm.slug);


		}

	    function activate() {

	    	citiesService.getCities()
				.then(function(obj){

					hm.cities = obj.data;

				},function(obj){
					hm.cities =  obj;
				});
	    }

}
})(window.angular);

//inject angular file upload directives and services.
(function(angular){
  'use strict';
angular.module('app.user')
  .controller('UserActionListController', ['$scope','userData','changeBrowserURL',UserActionListController]);
  function UserActionListController($scope,userData,changeBrowserURL ) {
  		var originatorEv;
      var ualc = this;
      ualc.openMenu = openMenu;
      ualc.getUserPage = getUserPage;
      ualc.getAdminStore = getAdminStore;
      ualc.createNewStore = createNewStore; 
      activate();
      function getAdminStore(storeId){
        changeBrowserURL.changeBrowserURLMethod('/admin/adminStorePage/'+storeId);
      }
      function getUserPage(){
      	userData.getUserPage(userData.getUser()._id);
      }
      function openMenu($mdOpenMenu, ev) {
	      originatorEv = ev;
	      $mdOpenMenu(ev);
		  }
      function createNewStore(){
        changeBrowserURL.changeBrowserURLMethod('/admin/createStore/'); 
      }


      function activate(){
        ualc.user = userData.getUser();
        ualc.userProfilePic = userData.getUser().picture;
        ualc.userStoresList = userData.getUser().storeId;
      	
      }
  }
})(window.angular);


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

(function(angular){
  angular.module('app.product')

    .controller('ProductCategoryCollectionController',[productCategoryCollectionController]);
    function productCategoryCollectionController(){
    	
    }
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.product')
  .controller('ProductListController',["$scope","$auth",'$location',"$routeParams","changeBrowserURL","baseUrlService","getProductCollectionService",ProductListController]);
  function ProductListController($scope,$auth,$location,$routeParams,changeBrowserURL,baseUrlService,getProductCollectionService){
  	 var plc = this;
      plc.pageNo = 0;
      plc.productsList = [];
      plc.getSingleProduct = getSingleProduct;
      plc.getProductsCollection = getProductsCollection;
      plc.productsSearchHeader = $routeParams.slug;
      activate();
      $scope.$on('parent', function (event, data) {
        plc.pageNo = 0;
        plc.paramData = data;
        plc.getProductsCollection();
        
      });
      function getSingleProduct(product,scrollId){
        var url = "product/singleProduct/"+product._id;//+"/"+product.myslug;
        if(scrollId){
          changeBrowserURL.changeBrowserURLMethod(url,scrollId);
        }
        changeBrowserURL.changeBrowserURLMethod(url);
      }
      function getProductsCollection(){
        plc.loading = true;
        plc.pageNo = plc.pageNo + 1;
        var location = $routeParams.location;
        var url ='';
        if($location.absUrl().indexOf("/productsCollectionCategory/")!=-1){
          var category = $routeParams.category;           
           url = 'product/products/category/'+category+'/'+location+'/'+plc.pageNo;
        }
        else if($location.absUrl().indexOf("/productsCollectionSubCategory/")!=-1){
          var productSubCategory = $routeParams.subCategory;
           url = 'product/products/subCategory/'+productSubCategory+'/'+location+'/'+plc.pageNo;
        }
        else if($location.absUrl().indexOf("/productsCollectionName/")!=-1){
          var productName = $routeParams.productName;
           url = 'product/products/name/'+productName+'/'+location+'/'+plc.pageNo;
        }
        else if($location.absUrl().indexOf("/productsCollectionLocation/")!=-1){
          
           url = 'product/products/location'+'/'+location+'/'+plc.pageNo;
        }
        /*
          * This will work with mongoose-paginate only because the existencce of the button
            in html is dependant on the total documents retrieved
          * I check the total documents available to the length of array displayed.. if they both are equal
            then the button is hidden
        */
        getProductCollectionService.getProductCollection(url,plc.paramData)
        .then(function(response){
          plc.totalProducts = response.data.total;
          if(plc.productsList.length===0){
            var tempProductList = [];
            for (var i = response.data.docs.length - 1; i >= 0; i--) {
              tempProductList.push(response.data.docs[i]);

            }
            plc.productsList = tempProductList;
          }
          else{

            if(plc.paramData&&plc.pageNo==1){
              plc.productsList = [];
            }
            for (var j = response.data.docs.length - 1; j >= 0; j--) {
              plc.productsList.push(response.data.docs[j]);
            }

          }
          plc.loading = false;
        },function(response){
          console.log(response);
        });
      }
      function activate(){
        plc.getProductsCollection();
      }

    }						
    

  

})(window.angular);

(function(angular){
  angular.module('app.product')

    .controller('ProductNameCollectionController',[productNameCollectionController]);
    function productNameCollectionController(){
    	
    }
})(window.angular);

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

(function(angular){
  angular.module('app.product')

    .controller('ProductSubCategoryCollectionController',[productSubCategoryCollectionController]);
    function productSubCategoryCollectionController(){
    	
    }
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.product')

  .controller('SingleProductController',["$scope","$auth",'getProductsService','$location','scrollToIdService',"$routeParams",SingleProductController]);
  function SingleProductController($scope,$auth,getProductsService,$location,scrollToIdService,$routeParams){
    
    var spc = this;
    spc.authCheck = $auth.isAuthenticated();
    activate();
    



    function activate(){
    	getProductsService.getSingleProduct($routeParams.productId).then(function(res){
    		
    		spc.product = res.data;	
    	});
		
    }
  }

})(window.angular);

(function(angular){
  'use strict';
angular.module('app.product')
  .controller('StoreProductListController',["$scope","$auth",'$location','scrollToIdService',"$routeParams","getProductsService","changeBrowserURL",StoreProductListController]);
  function StoreProductListController($scope,$auth,$location,scrollToIdService,$routeParams,getProductsService,changeBrowserURL){
    var splc = this;
    splc.storeProductsList = [];
    splc.pageNo = 0;
    splc.getSingleProduct = getSingleProduct;
    activate();

    function getSingleProduct(productId){
      var url = "/product/singleProduct/"+productId;
      changeBrowserURL.changeBrowserURLMethod(url);
    }
    function activate(){
    	getProductsService.getStoreProductsList($routeParams.storeId).then(function(response){
        
        splc.storeProductsList = response.data.docs;
      });
    }

  }

})(window.angular);

(function(angular){
  'use strict';

angular.module('app.product')
  .service('getProductCollectionService',["$http","baseUrlService",GetProductCollectionService]);

/*
  * This servic has a function to get collection of products`
*/
function GetProductCollectionService($http,baseUrlService){
  this.getProductCollection = getProductCollection;

  function getProductCollection(url,paramData){
    return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
}
})(window.angular);

(function(angular){
  'use strict';

angular.module('app.product')
  .service('getProductsService',["$http","storeData","baseUrlService",'changeBrowserURL',GetProductsService]);

/*
  * This servic has a function to get collection of stores`
*/
function GetProductsService($http,storeData,baseUrlService,changeBrowserURL){
  this.getStoreProductsList = getStoreProductsList;
  this.getSingleProduct = getSingleProduct;
this.getSingleProductPage = getSingleProductPage;
  function getStoreProductsList(storeId){
  	var pageNo = 1;
  	return $http.get(baseUrlService.baseUrl+'product/products/store/'+storeId+"/"+pageNo);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function getSingleProduct(productId){
  	return $http.get(baseUrlService.baseUrl+'product/products/singleProduct/'+productId);
    //return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
  function getSingleProductPage(product,scrollId){
        var url = "product/singleProduct/"+product._id+"/"+(product.myslug || ' ');
        if(scrollId){
          //url = url + "?scrollId="+scrollId;
          changeBrowserURL.changeBrowserURLMethod(url,scrollId);
        }
        changeBrowserURL.changeBrowserURLMethod(url);
      }
}
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.review')

  .controller('ProductReviewListController',["$scope","$auth","$routeParams",'$route','changeBrowserURL','reviewService','userData',ProductReviewListController]);
  function ProductReviewListController($scope,$auth,$routeParams,$route,changeBrowserURL,reviewService,userData){
    var plc = this;
    plc.activate = activate;
    plc.smallLoadingModel = {};
    plc.getProductReviews = getProductReviews;
    plc.getRating = getRating;
    plc.userReviewUpvoted = userReviewUpvoted;
    plc.authCheck = $auth.isAuthenticated();
    plc.submitUserReviewUpvote = submitUserReviewUpvote;
    plc.deleteUserReviewUpvote = deleteUserReviewUpvote;
    plc.getUserPage = userData.getUserPage;

    if(plc.authCheck){
      plc.userUpvotes  = userData.getUser().upvotes;
    }
    plc.submitUserReviewUpvote = submitUserReviewUpvote;
    plc.activate();
    function activate(){
      plc.getProductReviews();
    }
    function getUserPage(userId){
      var url = "/user/"+userId;
      changeBrowserURL.changeBrowserURLMethod(url);
    }
    function getProductReviews(){
      reviewService.getProductReviews().then(function(res){
        plc.reviewList = res.data;

      },function(res){

      });
    }
    function getRating(review){

      var rating2 = parseInt(review.rating);
      var x = [];
      for(var i=0;i<rating2;i++){
        x.push(i);
      }

      return x;
    }

    function userReviewUpvoted(locReview){

      var upArr = locReview.upvotes;
      for(var i=0;i<upArr.length;i++){
        if(plc.userUpvotes.indexOf(upArr[i])!=-1){

          plc.currentUpvoteId = upArr[i];

          return true;
        }
      }


      //return false;
    }

    function submitUserReviewUpvote(review){
      plc.smallLoadingModel[review._id] = true;

      reviewService.submitUserReviewUpvote({"reviewId":review._id,"productId":$routeParams.productId,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.push(res.data.id);
        plc.userUpvotes.push(res.data.id);userData.setUser();
        plc.smallLoadingModel[review._id] = false;


      });
    }
    function deleteUserReviewUpvote(review){
      plc.smallLoadingModel[review._id] = true;
      reviewService.deleteUserReviewUpvote({"reviewId":review._id,"productId":$routeParams.productId,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.splice(review.upvotes.indexOf(res.data.id), 1);userData.setUser();
        plc.smallLoadingModel[review._id] = false;
      });

    }

  }
})(window.angular);

(function(angular){
  'use strict';
  angular.module('app.review')
      .controller('ReviewSubmitController',['$auth','$routeParams','$route','userData','reviewService',ReviewSubmitController]);
      function ReviewSubmitController($auth,$routeParams,$route,userData,reviewService){
        var rsv  = this;
        rsv.review = {};
        rsv.user = {};
        if($routeParams.storeId){
          rsv.review.storeId = $routeParams.storeId;  
        }
        else if($routeParams.productId){
          rsv.review.productId = $routeParams.productId;  
        }
        
        rsv.ratingClick = ratingClick;

        if(userData.getUser()){
          rsv.review.userId = userData.getUser()._id;
          rsv.user.picture = userData.getUser().picture;
          rsv.user.displayName = userData.getUser().displayName;
        }
        else{
          rsv.review.userId = $auth.getPayload().sub;
        }

        rsv.submitReview = submitReview;
        function ratingClick(obj){

          var rating = 6-obj.currentTarget.attributes.value.nodeValue;

          rsv.review.rating = rating;
        }
        function submitReview(){
          if($routeParams.storeId){
          reviewService.submitStoreReview(rsv.review)
            .then(function(res){
              userData.setUser();
              $route.reload();
            },function(res){

            }); 
        }
        else if($routeParams.productId){
          reviewService.submitProductReview(rsv.review)
            .then(function(res){
              userData.setUser();
              $route.reload();
            },function(res){

            });
        }
          
        }

      }
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.review')

  .controller('StoreReviewListController',["$scope","$auth","$routeParams",'$route','reviewService','userData',StoreReviewListController]);
  function StoreReviewListController($scope,$auth,$routeParams,$route,reviewService,userData){
    var slc = this;
    slc.activate = activate;
    slc.smallLoadingModel = {};
    slc.getStoreReviews = getStoreReviews;
    slc.getRating = getRating;
    slc.userReviewUpvoted = userReviewUpvoted;
    slc.authCheck = $auth.isAuthenticated();
    slc.submitUserReviewUpvote = submitUserReviewUpvote;
    slc.deleteUserReviewUpvote = deleteUserReviewUpvote;
    slc.getUserPage = userData.getUserPage;
    
    if(slc.authCheck){
      slc.userUpvotes  = userData.getUser().upvotes;
    }
    
    slc.activate();
    function activate(){
      slc.getStoreReviews();
    }
    function getStoreReviews(){
      reviewService.getStoreReviews().then(function(res){
        slc.reviewList = res.data;
        
      },function(res){

      });
    }
    function getRating(review){

      var rating2 = parseInt(review.rating);
      var x = [];
      for(var i=0;i<rating2;i++){
        x.push(i);
      }

      return x;
    }

    function userReviewUpvoted(locReview){
      
      var upArr = locReview.upvotes;
      for(var i=0;i<upArr.length;i++){
        if(slc.userUpvotes.indexOf(upArr[i])!=-1){
          
          slc.currentUpvoteId = upArr[i];
          
          return true;
        }
      }
      
      
      //return false;
    }

    function submitUserReviewUpvote(review){
      slc.smallLoadingModel[review._id] = true;
      
      reviewService.submitUserReviewUpvote({"reviewId":review._id,"storeId":$routeParams.storeId,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.push(res.data.id);
        slc.userUpvotes.push(res.data.id);
        userData.setUser();
        slc.smallLoadingModel[review._id] = false;
        
        
      });
    }
    function deleteUserReviewUpvote(review){
      slc.smallLoadingModel[review._id] = true;
      reviewService.deleteUserReviewUpvote({"reviewId":review._id,"storeId":$routeParams.storeId,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.splice(review.upvotes.indexOf(res.data.id), 1);
        userData.setUser();
        slc.smallLoadingModel[review._id] = false;
      });

    }

  }
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.review')

  .controller('UserReviewListController',["$scope","$auth",'reviewService','userData','getSingleStore','getProductsService',UserReviewListController]);
  function UserReviewListController($scope,$auth,reviewService,userData,getSingleStore,getProductsService){
    var url = this;
    url.activate = activate;
    url.smallLoadingModel = {};
    url.getUserReviews = getUserReviews;
    url.getRating = getRating;
    url.userReviewUpvoted = userReviewUpvoted;
    url.authCheck = $auth.isAuthenticated();
    url.submitUserReviewUpvote = submitUserReviewUpvote;
    url.deleteUserReviewUpvote = deleteUserReviewUpvote;
    url.getUserPage = userData.getUserPage;
    url.getSingleStorePage = getSingleStore.getSingleStorePage;
    url.getSingleProductPage = getProductsService.getSingleProductPage;
    if(url.authCheck){
      url.userUpvotes  = userData.getUser().upvotes;
    }
    url.submitUserReviewUpvote = submitUserReviewUpvote;
    url.activate();
    function activate(){
      url.getUserReviews();
    }
    function getUserPage(userId){
      var url = "/user/"+userId;
      changeBrowserURL.changeBrowserURLMethod(url);
    }
    function getUserReviews(){
      reviewService.getUserReviews().then(function(res){
        url.reviewList = res.data;

      },function(res){

      });
    }
    function getRating(review){

      var rating2 = parseInt(review.rating);
      var x = [];
      for(var i=0;i<rating2;i++){
        x.push(i);
      }

      return x;
    }

    function userReviewUpvoted(locReview){

      var upArr = locReview.upvotes;
      for(var i=0;i<upArr.length;i++){
        if(url.userUpvotes.indexOf(upArr[i])!=-1){

          url.currentUpvoteId = upArr[i];

          return true;
        }
      }


      //return false;
    }

    function submitUserReviewUpvote(review){
      url.smallLoadingModel[review._id] = true;

      reviewService.submitUserReviewUpvote({"reviewId":review._id,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.push(res.data.id);
        url.userUpvotes.push(res.data.id);userData.setUser();
        url.smallLoadingModel[review._id] = false;


      });
    }
    function deleteUserReviewUpvote(review){
      url.smallLoadingModel[review._id] = true;
      reviewService.deleteUserReviewUpvote({"reviewId":review._id,"userId":userData.getUser()._id})
      .then(function(res){
        review.upvotes.splice(review.upvotes.indexOf(res.data.id), 1);userData.setUser();
        url.smallLoadingModel[review._id] = false;
      });

    }

  }
})(window.angular);

(function(angular){
  'use strict';
  angular.module('app.review')
      .service('reviewService',['$http','$routeParams','baseUrlService',ReviewService]);
      function ReviewService($http,$routeParams,baseUrlService){
        var rs  = this;
        rs.submitStoreReview = submitStoreReview;
        rs.getStoreReviews = getStoreReviews;
        rs.submitUserReviewUpvote = submitUserReviewUpvote;
        rs.deleteUserReviewUpvote  = deleteUserReviewUpvote;
        rs.getProductReviews = getProductReviews;
        rs.submitProductReview = submitProductReview;
        rs.getUserReviews = getUserReviews;
        function submitStoreReview(review){
          return $http.post(baseUrlService.baseUrl+'review/reviews/store/'+review.storeId,review);
        }
        function getStoreReviews(){
          var storeId = $routeParams.storeId;
          return $http.get(baseUrlService.baseUrl+'review/reviews/store/'+storeId);
        }
        function submitProductReview(review){
          return $http.post(baseUrlService.baseUrl+'review/reviews/product/'+review.productId,review);
        }
        function getProductReviews(){
          var productId = $routeParams.productId;
          return $http.get(baseUrlService.baseUrl+'review/reviews/product/'+productId);
        }

        function submitUserReviewUpvote(obj){
          console.log(obj);
          return $http.post(baseUrlService.baseUrl+'upvote/upvotes/review/',obj);
        }
        function deleteUserReviewUpvote(obj){
          
          return $http.delete(baseUrlService.baseUrl+'upvote/upvotes/review/',{"params":obj});
        }

        function getUserReviews(){
          var userId = $routeParams.userId;
         return $http.get(baseUrlService.baseUrl+'user/userReviews/'+userId); 
        }
        

      }
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.store')

  .controller('SingleStoreController',["$scope","$auth",'$location','scrollToIdService',"$routeParams","storeData","getSingleStore",'$mdDialog',SingleStoreController]);
  function SingleStoreController($scope,$auth,$location,scrollToIdService,$routeParams,storeData,getSingleStore,$mdDialog){
    var ssc = this;
    ssc.storeData = {};
    ssc.loading = true;
    ssc.authCheck = $auth.isAuthenticated();
    ssc.getAddressString = getAddressString;
    
    ssc.storeImagesObj = [];
    function getAddressString(){
      return Object.keys(ssc.storeData.address).map(function(key){return ssc.storeData.address[key];}).join(' ');
    }
     $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Claim Business')
        .textContent('If you are the owner of this store,then mail to us at shoppinsmail@gmail.com')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
    getSingleStore.getStore($routeParams.storeId)
    .then(function(res){
      storeData.setStore(res.data);
        ssc.storeData = res.data;
        for (var i = 0; i < ssc.storeData.storeImages.length; i++) {
          var obj = {};
          obj.src=ssc.storeData.storeImages[i];
          ssc.storeImagesObj.push(obj);
        }
        //ssc.showImagesCarousel = true;
        console.log(ssc.storeImagesObj);
        ssc.loading = false;
        if($location.search().param){
            scrollToIdService.scrollToId($location.search().param);
        }
      });
    getSingleStore.getStoreRating($routeParams.storeId)
    .then(function(res){
      ssc.storeData.storeRatingAvg = res.data;
    });

    }

})(window.angular);

(function(angular){
  angular.module('app.store')

    .controller('StoreCategoryCollectionController',["$scope","$routeParams","getCityLocalitiesService","getCityCategoriesService",StoreCategoryCollectionController]);

    function StoreCategoryCollectionController($scope,$routeParams,getCityLocalitiesService,getCityCategoriesService){
      var slcc = this;
      slcc.areaModel = {};
      slcc.launchFilterEvent = launchFilterEvent;
      slcc.areaRadioClicked = areaRadioClicked;
      slcc.majorFilter = {};
      slcc.clearAreaFilters = clearAreaFilters;
      function areaRadioClicked(){
        
        slcc.majorFilter.area=slcc.areaModel.area;
        launchFilterEvent(slcc.majorFilter);
      }
      function clearAreaFilters(){
        delete slcc.majorFilter.area;
        slcc.areaModel = {};
        launchFilterEvent(slcc.majorFilter);
      }

      var location = $routeParams.location;
      getCityLocalitiesService.getCityLocalities(location)
        .then(function(res){
          slcc.areas = res.data;
        },function(res){

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

(function(angular){


  angular.module('app.store')
    .controller('StoreController',["baseUrlService","$http",storeController]);
  function storeController(baseUrlService,$http){
    var sm = this;

    sm.address = {};
    sm.SendData = function () {
      data = {};
      data.name = sm.name;
      data.city = sm.address.city;
      data.address = sm.address;
      data.category = sm.categoryString.split(",");

      var config = {
        headers : {
          'Content-Type': 'application/json'
      }
    };
    $http.post(baseUrlService.baseUrl+"store/store", data, config)
      .then(
        function(response){
        },
        function(response){
          console.log(response);
        }
      );
    };
  }
})(window.angular);

(function(angular){
  'use strict';

  angular.module('app.store')

    .controller('StoreListController',["$scope","$routeParams","changeBrowserURL","$location","baseUrlService","getStoreCollectionService",StoreListController]);


    function StoreListController($scope,$routeParams,changeBrowserURL,$location,baseUrlService,getStoreCollectionService){
      var slc = this;
      slc.pageNo = 0;
      slc.storesList = [];
      slc.getSingleStore = getSingleStore;
      slc.getStoresCollection = getStoresCollection;
      slc.storesSearchHeader = $routeParams.slug;
      activate();
      $scope.$on('parent', function (event, data) {
        slc.pageNo = 0;
        slc.paramData = data;
        slc.getStoresCollection();
      });
      function getSingleStore(store,scrollId){
        var url = "store/singleStore/"+store._id+"/"+store.myslug;
        if(scrollId){
          //url = url + "?scrollId="+scrollId;
          changeBrowserURL.changeBrowserURLMethod(url,scrollId);
        }
        changeBrowserURL.changeBrowserURLMethod(url);
      }
      function getStoresCollection(){
        slc.loading = true;
        slc.pageNo = slc.pageNo + 1;
        var location = $routeParams.location;
        var url ='';
        if($location.absUrl().indexOf("/category/")!=-1){
          var category = $routeParams.category;
           url = 'store/storesCollection/category/'+category+'/'+location+'/'+slc.pageNo;
        }
        else if($location.absUrl().indexOf("/storeName/")!=-1){
          var storeName = $routeParams.storeName;
           url = 'store/storesCollection/storeName/'+storeName+'/'+location+'/'+slc.pageNo;
        }
        else{
           url = 'store/storesCollection/stores'+'/'+location+'/'+slc.pageNo;
        }
        /*
          * This will work with mongoose-paginate only because the existencce of the button
            in html is dependant on the total documents retrieved
          * I check the total documents available to the length of array displayed.. if they both are equal
            then the button is hidden
        */
        getStoreCollectionService.getStoreCollection(url,slc.paramData)
        .then(function(response){
          slc.totalStores = response.data.total;
          console.log(response);
          if(slc.storesList.length===0){
            var tempStoreList = [];
            for (var i = response.data.docs.length - 1; i >= 0; i--) {
              tempStoreList.push(response.data.docs[i]);

            }
            slc.storesList = tempStoreList;
          }
          else{

            if(slc.paramData&&slc.pageNo==1){
              slc.storesList = [];
            }
            for (var j = response.data.docs.length - 1; j >= 0; j--) {
              slc.storesList.push(response.data.docs[j]);
            }

          }
          slc.loading = false;
        },function(response){
          console.log(response);
        });
      }
      function activate(){
        slc.getStoresCollection();
      }

    }

})(window.angular);

(function(angular){
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

(function(angular){
  angular.module('app.store')

    .controller('StoreNameCollectionController',[storeNameCollectionController]);
    function storeNameCollectionController(){
    	
    }
})(window.angular);

(function(angular){
  angular.module('app.store')

    .controller('UserStoreFollowController',["$scope","$auth","$routeParams","userData","userFollowService",UserStoreFollowController]);

    function UserStoreFollowController($scope,$auth,$routeParams,userData,userFollowService){
      var usu = this;
      usu.follow = {};
      usu.followCheck = false;
      usu.getFollowParamObj = {};
      usu.submitFollow = submitFollow;
      usu.deleteFollow = deleteFollow;
      usu.getFollowParamObj.userId = userData.getUser()._id;
      usu.userStoreFollowed = false;

      activate();      
      function userStoreFollowed(){        
      }
      function submitFollow(){
        userFollowService.submitFollow(usu.follow)
            .then(function(res){
                    usu.userStoreFollowed = true;
                    userData.setUser();
                    
                  },
                  function(res){
                    console.log(res);
                  });
      }
      function deleteFollow(){
        userFollowService.deleteFollow(usu.follow)
            .then(function(res){
              usu.userStoreFollowed = false;
              userData.setUser();
              
             
            },
              function(res)
              {
                console.log(res);
              });
      }
      
      function activate(){
       
       usu.follow.userId = userData.getUser()._id;
        if($routeParams.storeId){
        usu.entity = $routeParams.storeId;
        usu.follow.storeId = $routeParams.storeId;
        
      }
      else if($routeParams.productId){
        usu.entity = $routeParams.productId;
        usu.follow.productId = $routeParams.productId;
        usu.getFollowParamObj.productId = $routeParams.productId;
      }
      if($auth.isAuthenticated()){
        if(userData.getUser().storeFollowing.indexOf($routeParams.storeId)!=-1){
          usu.userStoreFollowed = true;
        }
        
      }
      }

    }

})(window.angular);

(function(angular){
  angular.module('app.store')

    .controller('UserStoreUpvoteController',["$scope","$auth","$routeParams","userData","userUpvoteService",'storeData',UserStoreUpvoteController]);

    function UserStoreUpvoteController($scope,$auth,$routeParams,userData,userUpvoteService,storeData){
      var usu = this;
      usu.upvote = {};
      usu.upvoteCheck = false;
      usu.getUpvoteParamObj = {};
      usu.submitUpvote = submitUpvote;
      usu.deleteUpvote = deleteUpvote;
      usu.getUpvoteParamObj.userId = userData.getUser()._id;
      usu.userStoreUpvoted = false;

      activate();      
      function userStoreUpvoted(){        
      }
      function submitUpvote(){
        userUpvoteService.submitUpvote(usu.upvote)
            .then(function(res){
                    usu.userStoreUpvoted = true;
                    userData.setUser();
                    
                  },
                  function(res){
                    console.log(res);
                  });
      }
      function deleteUpvote(){
        userUpvoteService.deleteUpvote(usu.upvoteId)
            .then(function(res){
              usu.userStoreUpvoted = false;
              userData.setUser();
            },
              function(res)
              {
                console.log(res);
              });
      }
      
      function activate(){
        usu.upvote.userId = userData.getUser()._id;
        if($routeParams.storeId){
          usu.upvote.storeId = $routeParams.storeId;
          usu.upvote.type="store";
        }
        else if($routeParams.productId){
          usu.upvote.type="product";
          usu.upvote.productId = $routeParams.productId;
        
        }
        if($auth.isAuthenticated()){
          var currentStore = storeData.getStore();
          var currentUser = userData.getUser();
          for (var i = 0; i < currentStore.upvotes.length; i++) {
            for (var j = 0; j < currentUser.upvotes.length; j++) {
              if(currentStore.upvotes[i] == currentUser.upvotes[j]){
                usu.userStoreUpvoted = true;
                usu.upvoteId = currentStore.upvotes[i];
                console.log(usu.upvoteId);
              }
            }
            
          }
        }
      }

    }

})(window.angular);

(function(angular){
  angular.module('app.store')

    .controller('UserStoreVisitController',["$scope","$auth","$routeParams","userData","userVisitService",UserStoreVisitController]);

    function UserStoreVisitController($scope,$auth,$routeParams,userData,userVisitService){
      var usv = this;
      usv.visit = {};
      usv.visitCheck = false;
      usv.getVisitParamObj = {};
      usv.submitVisit = submitVisit;
      usv.deleteVisit = deleteVisit;
      usv.getVisitParamObj.userId = userData.getUser()._id;
      usv.userStoreVisited = false;

      activate();      
      function userStoreVisited(){        
      }
      function submitVisit(){
        userVisitService.submitVisit(usv.visit)
            .then(function(res){
                    userData.setUser();
                    usv.userStoreVisited = true;
                  },
                  function(res){
                    console.log(res);
                  });
      }
      function deleteVisit(){
        userVisitService.deleteVisit(usv.visit)
            .then(function(res){
              
              userData.setUser();
              usv.userStoreVisited = false;
             
            },
              function(res)
              {
                console.log(res);
              });
      }
      
      function activate(){
       
       usv.visit.userId = userData.getUser()._id;
        if($routeParams.storeId){
        usv.entity = $routeParams.storeId;
        usv.visit.storeId = $routeParams.storeId;
        usv.getVisitParamObj.storeId = $routeParams.storeId;
        
      }
      else if($routeParams.productId){
        usv.entity = $routeParams.productId;
        usv.visit.productId = $routeParams.productId;
        usv.getVisitParamObj.productId = $routeParams.productId;
      }
      if($auth.isAuthenticated()){
        userVisitService.getVisit(usv.visit)
            .then(function(res){
              
              
              if(res.data[0]){
              if(res.data[0]._id){
              
                usv.userStoreVisited = true;
              }}
              
             
            },
              function(res)
              {
                console.log(res);
              });
      }
      }

    }

})(window.angular);

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

(function(angular){
  angular.module('app.store')
  .directive('scrollToId',['scrollToIdService',scrollToIdDirective]);

  function scrollToIdDirective(scrollToIdService) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).on('click',function(){
          scrollToIdService.scrollToId(attrs.scrollToId);
        });
      }
    };
  }


})(window.angular);

(function(angular){
  'use strict';

angular.module('app.store')
  .service('getStoreCollectionService',["$http","storeData","baseUrlService",GetStoreCollectionService]);

/*
  * This servic has a function to get collection of stores`
*/
function GetStoreCollectionService($http,storeData,baseUrlService){
  this.getStoreCollection = getStoreCollection;

  function getStoreCollection(url,paramData){
    return $http.get(baseUrlService.baseUrl+url,{params:paramData});

  }
}
})(window.angular);

(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('getSingleStore',["$http","storeData","baseUrlService","changeBrowserURL",GetSingleStoreWithId]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function GetSingleStoreWithId($http,storeData,baseUrlService,changeBrowserURL){
  this.getStore = getStore;
  this.getStoreRating = getStoreRating;
  this.getSingleStorePage = getSingleStorePage;
  function getStore(id){
    return $http.get(baseUrlService.baseUrl+"store/singleStore/"+id);
    
  }
  function getStoreRating(id){
  	return $http.get(baseUrlService.baseUrl+"review/ratings/store/"+id);
  }
  function getSingleStorePage(store,scrollId){
        var url = "store/singleStore/"+store._id+"/"+(store.myslug || ' ');
        if(scrollId){
          //url = url + "?scrollId="+scrollId;
          changeBrowserURL.changeBrowserURLMethod(url,scrollId);
        }
        changeBrowserURL.changeBrowserURLMethod(url);
      }

}
})(window.angular);




(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('scrollToIdService',[ScrollToIdService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function ScrollToIdService(){
  this.scrollToId = scrollToId;

  function scrollToId(blockId){
    var container = $('body');
    console.log('Inside the service of scroll');

    var scrollTo = $('#'+blockId);
    console.log(scrollTo);
    container.animate({
        scrollTop: scrollTo.offset().top //- container.offset().top + container.scrollTop()
    });
  }
}
})(window.angular);

(function(angular){
  'use strict';

angular.module('app.store')
  .factory('storeData',["$window",storeData]);

/*
  * This factory is used to get store details from window storage
*/
function storeData($window) {
  var storage = $window.localStorage;
  var obj1 = {
    setStore: function (store) {
        storage.setItem('store',JSON.stringify(store));
    },
    getStore: function(){
      return JSON.parse(storage.getItem('store'));
    },
    removeStore: function(){

      storage.removeItem('store');
    }
  };
    return obj1;
  }



})(window.angular);

(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('userFollowService',["$http","baseUrlService",UserFollowService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function UserFollowService($http,baseUrlService){
  this.submitFollow = submitFollow;
  this.deleteFollow = deleteFollow;
  this.getFollow = getFollow;

  function getFollow(followData){
    return $http.get(baseUrlService.baseUrl+"follow/followed",{"params":followData});
  }

  function submitFollow(followData){
    return $http.post(baseUrlService.baseUrl+"store/submitStoreFollow",followData);
  }
  function deleteFollow(followObj){
    return $http.post(baseUrlService.baseUrl+"store/deleteStoreFollow",followObj);
  }
}
})(window.angular);

(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('userUpvoteService',["$http","baseUrlService",UserUpvoteService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function UserUpvoteService($http,baseUrlService){
  this.submitUpvote = submitUpvote;
  this.deleteUpvote = deleteUpvote;
  this.getUpvote = getUpvote;

  function getUpvote(upvoteData){
    return $http.get(baseUrlService.baseUrl+"upvote/upvoted",{"params":upvoteData});
  }

  function submitUpvote(upvoteData){
    return $http.post(baseUrlService.baseUrl+"upvote/upvotes/storeUpvote",upvoteData);
  }
  function deleteUpvote(upvoteId){
    return $http.delete(baseUrlService.baseUrl+"upvote/upvotes/"+upvoteId);//{"params":upvoteObj});
  }
}
})(window.angular);

(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.store')
  .service('userVisitService',["$http","baseUrlService",UserVisitService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function UserVisitService($http,baseUrlService){
  this.submitVisit = submitVisit;
  this.deleteVisit = deleteVisit;
  this.getVisit = getVisit;

  function getVisit(visitData){
    return $http.get(baseUrlService.baseUrl+"visit/visited",{"params":visitData});
  }

  function submitVisit(visitData){
    return $http.post(baseUrlService.baseUrl+"visit/visits/store",visitData);
  }
  function deleteVisit(visitObj){
    return $http.delete(baseUrlService.baseUrl+"visit/visits/",{"params":visitObj});
  }
}
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserActivityListController',["$scope",'$routeParams',"activityService",UserActivityListController]);
  function UserActivityListController($scope,$routeParams,activityService){
    var ual = this;
    ual.loading = true;
    activate();
    function activate(){

      ual.loading = true;
        activityService.getSingleUserActivity($routeParams.userId).then(function(result){        
        ual.activityData= result.data;

        ual.loading = false;
      }); 
      
    }


    }

})(window.angular);

(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserFeedController',["$scope","$auth","activityService",UserFeedController]);
  function UserFeedController($scope,$auth,activityService){
    var ual = this;
    ual.loading = true;
    ual.authCheck = $auth.isAuthenticated();
    activate();
    function activate(){

      ual.loading = true;
      if(ual.authCheck){
        activityService.getUserFollowingActivity($auth.getPayload().sub).then(function(result){
        ual.activityData= result.data;
        ual.loading = false;
      });  
      }
      else{
       activityService.getAllActivity().then(function(result){
        console.log("from the activity");
        console.log(result);
        ual.activityData= result.data;
        ual.loading = false;
      }); 
      }
      
      
    }


    }

})(window.angular);

(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserFollowersController',["$scope","$auth",'$location','$routeParams',"userData","userService",UserFollowersController]);
  function UserFollowersController($scope,$auth,$location,$routeParams,userData,userService){
    var ufc = this;
    activate();

    ufc.loading = true;
    ufc.authCheck = $auth.isAuthenticated();
    ufc.followersList = [];
    ufc.currentUserFollowed = currentUserFollowed;
    ufc.submitUserFollow = submitUserFollow;
    ufc.deleteUserFollow = deleteUserFollow;
    ufc.getUserPage = userData.getUserPage;

    function activate(){
      ufc.loading = true;

      userService.getUserFollowers($routeParams.userId)
    .then(function(res){
        ufc.followersList = res.data;
        
        ufc.loading = false;
      });
    }
    function submitUserFollow(followerId){
      userService.submitUserFollow(userData.getUser()._id,followerId).then(function(response){

        
        userData.setUser();
      });
    }
    function deleteUserFollow(followerId){
      userService.deleteUserFollow(userData.getUser()._id,followerId).then(function(response){
        
        userData.setUser();
      });
    }
    function currentUserFollowed(follower){

      if(userData.getUser().following.indexOf(follower)==-1){
        return false;
      }
      return true;
    }

    }

})(window.angular);

(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserFollowingController',["$scope","$auth",'$location','$routeParams',"userData","userService",UserFollowingController]);
  function UserFollowingController($scope,$auth,$location,$routeParams,userData,userService){
    var ufc = this;
    activate();

    ufc.loading = true;
    ufc.authCheck = $auth.isAuthenticated();
    ufc.followersList = [];
    ufc.currentUserFollowed = currentUserFollowed;
    ufc.submitUserFollow = submitUserFollow;
    ufc.deleteUserFollow = deleteUserFollow;
    ufc.getUserPage = userData.getUserPage;

    function activate(){
      ufc.loading = true;

      userService.getUserFollowing($routeParams.userId)
    .then(function(res){
        ufc.followersList = res.data;
        
        ufc.loading = false;
      });
    }
    function submitUserFollow(followerId){
      userService.submitUserFollow(userData.getUser()._id,followerId).then(function(response){

        
        userData.setUser();
      });
    }
    function deleteUserFollow(followerId){
      userService.deleteUserFollow(userData.getUser()._id,followerId).then(function(response){
        
        userData.setUser();
      });
    }
    function currentUserFollowed(follower){

      if(userData.getUser().following.indexOf(follower)==-1){
        return false;
      }
      return true;
    }

    }

})(window.angular);

(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserPageController',["$scope","$auth",'$routeParams',"userData","userService",UserPageController]);
  function UserPageController($scope,$auth,$routeParams,userData,userService){
    var upc = this;
    activate();
    upc.currentUserData = {};
    upc.loading = true;
    upc.authCheck = $auth.isAuthenticated();
    upc.submitUserFollow = submitUserFollow;
    upc.deleteUserFollow = deleteUserFollow;
    upc.userFollowed = userFollowed;
    upc.currentUser = currentUser;

    function currentUser(){
      return ($routeParams.userId == userData.getUser()._id);
    }
    function submitUserFollow(userId){
      userService.submitUserFollow(userData.getUser()._id,userId).then(function(res){
        userData.setUser();
      },function(res){

      });
    }

    function deleteUserFollow(userId){
      userService.deleteUserFollow(userData.getUser()._id,userId).then(function(res){
        var index = userData.getUser().following.indexOf(userId);
        userData.setUser();

      },function(res){

      });
    }

    function userFollowed(userId){

      if(userData.getUser().following.indexOf(userId)!=-1){

        return true;
      }
      return false;
    }
    function activate(){
      upc.loading = true;
      userService.getSingleUser($routeParams.userId)
    .then(function(res){
        upc.currentUserData = res.data;
        upc.loading = false;
        
      });
    }


    }

})(window.angular);

//inject angular file upload directives and services.
(function(angular){
  'use strict';
angular.module('app.user')
  .controller('UserProfileImageController', ['$scope', 'Upload', 'userData','baseUrlService',UserProfileImageController]);
  function UserProfileImageController($scope, Upload,userData, baseUrlService) {
      var upc = this;
      upc.spinnerLoading = false;
      upc.uploadFiles = function(file, errFiles) {
          console.log("Enterd file uploading");
          upc.f = file;
          upc.errFile = errFiles && errFiles[0];
          if (file) {
              file.upload = Upload.upload({
                  url: baseUrlService.baseUrl+'user/upload/profileImage/'+userData.getUser()._id,
                  data: {file: file}
              });
              upc.spinnerLoading = true;
              file.upload.then(function (response) {
                  
                      file.result = response.data;
                      userData.setUser();
                      userData.getUser().picture = response.data;
                      $('.userProfileImage').find('img').attr('src',response.data);
                      upc.spinnerLoading = false;
              });
          }
      };
  }
})(window.angular);

(function(angular){
  'use strict';
angular.module('app.user')

  .controller('UserStatisticsController',["$scope","$auth",'$location','$routeParams',"userData","userService",UserStatisticsController]);
  function UserStatisticsController($scope,$auth,$location,$routeParams,userData,userService){
    var upc = this;
    activate();
    function activate(){
      
    }


    }

})(window.angular);

(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.user')
  .service('activityService',["$http","baseUrlService",ActivityService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function ActivityService($http,baseUrlService){
  this.getSingleUserActivity = getSingleUserActivity;
  this.getAllActivity = getAllActivity;
  this.getUserFollowingActivity = getUserFollowingActivity;
  function getSingleUserActivity(id){
    return $http.get(baseUrlService.baseUrl+'activity/singleUserActivity/'+id);
  }
  function getAllActivity(){
    return $http.get(baseUrlService.baseUrl+'activity/allActivity/');
  }
  function getUserFollowingActivity(userId){
    return $http.get(baseUrlService.baseUrl+'activity/userFollowingActivity/'+userId);
  }



}
})(window.angular);

(function(angular){
  'use strict';
/*
  *Service for getting a single store with its id
*/
angular.module('app.user')
  .service('userService',["$http","baseUrlService",UserService]);

/*
  * This servic has a function names getStore which takes id as parameter and returns a promise
*/
function UserService($http,baseUrlService){
  this.getSingleUser = getSingleUser;
  this.getStoreRating = getStoreRating;
  this.submitUserFollow = submitUserFollow;
  this.deleteUserFollow = deleteUserFollow;
  this.checkUserFollow = checkUserFollow;
  this.getUserFollowers = getUserFollowers;
  this.getUserFollowing = getUserFollowing;
  this.getUserStores = getUserStores;
  function getSingleUser(id){
    return $http.get(baseUrlService.baseUrl+"user/singleUser/"+id);

  }
  function getStoreRating(id){
  	return $http.get(baseUrlService.baseUrl+"review/ratings/store/"+id);
  }

  function submitUserFollow(userId,followedId){

    return $http.post(baseUrlService.baseUrl+"user/submitFollow/"+userId+'/'+followedId);
  }
  function deleteUserFollow(userId,followedId){

    return $http.post(baseUrlService.baseUrl+"user/deleteFollow/"+userId+'/'+followedId);
  }
  function checkUserFollow(userId,followedId){
    
    return $http.get(baseUrlService.baseUrl+"user/checkFollow/"+userId+'/'+followedId);
  }
  function getUserFollowers(userId){
    return $http.get(baseUrlService.baseUrl+"user/userFollowers/"+userId);
  }
  function getUserFollowing(userId){
    return $http.get(baseUrlService.baseUrl+"user/userFollowing/"+userId);
  }
  function getUserStores(userId){
    return $http.get(baseUrlService.baseUrl+"user/singleUser/"+userId,{params: { 'select': 'name address.area address.locality' }});
  }



}
})(window.angular);
