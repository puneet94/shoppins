(function(angular) {
    'use strict';

    angular.module('app.home')
        .controller('SearchBoxController', ["$scope", "$window", "$routeParams", "cityStorage", "citiesService", "searchService", "changeBrowserURL", 'baseUrlService',SearchBoxController]);


    function SearchBoxController($scope, $window, $routeParams, cityStorage, citiesService, searchService, changeBrowserURL,baseUrlService) {
        var hm = this;
        
        if ($routeParams.location) {
            hm.selectedItem = $routeParams.location;
        } else if (cityStorage.isCityExists()) {
            hm.selectedItem = cityStorage.getCity();
        } else {

            hm.selectedItem = 'hyderabad';
        }
        activate();
        hm.userSearches = [];
        hm.selectedItemChange = selectedItemChange;
        hm.userSearchItemChange = userSearchItemChange;
        hm.locationSearch = locationSearch;
        hm.userSearchTextChange = userSearchTextChange;
        hm.openSearchBox = openSearchBox;
        
        $scope.$watch(function () {
            return hm.userSearchSelectedItem;
            },function(value){
                
            if(value){
                userSearchItemChange(value);                
            }
        });
        

        function openSearchBox() {
            hm.mobileSearchBoxVisible = true;
        }
        hm.selectedItemChange(hm.selectedItem);
        function userSearchItemChange(item) {
            
            if (!item) {
                item = {};
            }
            var changeEntity = item.userSearchString.split("#&#")[1];
            var entityName = item.userSearchString.split("#&#")[0];
            var location = hm.selectedItem;
            hm.slug = entityName + "-" + changeEntity.split("-")[0] + "s-in-" + location;
           
            if (changeEntity == "store") {

                hm.url = "/store/storesCollection/storeName/";
                $window.location.href =baseUrlService.baseUrl+ '#' + hm.url + entityName + "/" + location + "/" + hm.slug;

            } else if (changeEntity == "store-category") {

                hm.url = "/store/storesCollection/category/";
                $window.location.href =baseUrlService.baseUrl+ '#' + hm.url + entityName + "/" + location + "/" + hm.slug;

            } else if (changeEntity == "product") {

                hm.url = "/productsCollectionName/";
                $window.location.href =baseUrlService.baseUrl+ '#' + hm.url + entityName + "/" + location + "/" + hm.slug;

            } else if (changeEntity == "product-category") {

                hm.url = "/productsCollectionCategory/";
                $window.location.href =baseUrlService.baseUrl+ '#' + hm.url + entityName + "/" + location + "/" + hm.slug;


            } else if (changeEntity == "product-subcategory") {

                hm.url = "/productsCollectionSubCategory/";
                $window.location.href =baseUrlService.baseUrl+ '#' + hm.url + entityName + "/" + location + "/" + hm.slug;

            } else if (changeEntity.trim().indexOf("products")!=-1) {
                
                locationProductsSearchUrl();

            } else if (changeEntity.trim().indexOf("offers")!=-1) {
               
                locationOffersSearchUrl();

            } else {

                locationStoresSearchUrl();
            }
           
            



        }
        //md-search-text-change="sbc.searchTextChange(sbc.searchText)"
        function userSearchTextChange(city, userSearchText) {

            if (userSearchText.length >= 1) {
                searchService.getAjaxSearches(city, userSearchText)
                    .then(function(resource) {
                        hm.userSearches = [];
                        hm.userSearches = resource.data;
                        
                    });
            } else {
                if (hm.selectedItem) {
                    setSearches(hm.selectedItem);
                }
            }
        }
        function setSearches(item){
            searchService.getSearches(item).then(function(resource) {
                var allStoresItem = { "userSearchString": "All stores#&#stores#&#" + hm.selectedItem };
                var allProductsItem = { "userSearchString": "All products#&#products#&#" + hm.selectedItem };
                var allOffersItem = { "userSearchString": "All offers#&#offers#&#" + hm.selectedItem };
                hm.userSearches = resource.data;
                hm.userSearches.unshift(allStoresItem, allProductsItem,allOffersItem);
                

            }, function(data) {
                console.log(data);
            });

        }
        function selectedItemChange(item) {

            cityStorage.setCity(item);
            setSearches(item);
            
        }

        function locationSearch() {
            if (hm.cities.indexOf(hm.selectedItem) != -1) {
                if (!hm.userSearchText || hm.userSearchText.length === 0) {
                    locationStoresSearchUrl();
                }
            }
        }

        function locationStoresSearchUrl() {
            
            hm.url = "/store/storesCollection/location";
            var myLocation = hm.selectedItem;
            hm.slug = "stores-in-" + myLocation;
            $window.location.href =baseUrlService.baseUrl+ '#' + hm.url+ "/" + myLocation + "/" + hm.slug; 
            //changeBrowserURL.changeBrowserURLMethod(hm.url + "/" + myLocation + "/" + hm.slug);
            //$window.location.href =baseUrlService.baseUrl+ '#' + hm.url +  "/" + location + "/" + hm.slug;

        }

        function locationProductsSearchUrl() {

            hm.url = "/productsCollectionLocation";
            var myLocation = hm.selectedItem;
            hm.slug = "products-in-" + myLocation;
            $window.location.href =baseUrlService.baseUrl+ '#' + hm.url+ "/" + myLocation + "/" + hm.slug; 
            //changeBrowserURL.changeBrowserURLMethod(hm.url + "/" + myLocation + "/" + hm.slug);


        }
        function locationOffersSearchUrl() {

            hm.url = "/offers";
            var myLocation = hm.selectedItem;
            hm.slug = "offers-in-" + myLocation;
            $window.location.href =baseUrlService.baseUrl+ '#' + hm.url+ "/" + myLocation + "/" + hm.slug; 
            //changeBrowserURL.changeBrowserURLMethod(hm.url + "/" + myLocation + "/" + hm.slug);


        }

        function activate() {

            citiesService.getCities()
                .then(function(obj) {

                    hm.cities = obj.data;

                }, function(obj) {
                    hm.cities = obj;
                });
        }

    }
})(window.angular);
