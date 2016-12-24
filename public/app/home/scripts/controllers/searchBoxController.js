(function(angular) {
    'use strict';

    angular.module('app.home')
        .controller('SearchBoxController', ["$scope", "$window", "$routeParams", "cityStorage", "citiesService", "searchService", "changeBrowserURL", "userLocationService", SearchBoxController]);


    function SearchBoxController($scope, $window, $routeParams, cityStorage, citiesService, searchService, changeBrowserURL, userLocationService) {
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

        function openSearchBox() {
            hm.mobileSearchBoxVisible = true;
        }
        hm.selectedItemChange(hm.selectedItem);

        function userSearchItemChange(item) {
        	console.log("the item");
        	console.log(item);
        	if(!item){
        		item = {};
        	}
            var changeEntity = item.userSearchString.split("#&#")[1];
            var entityName = item.userSearchString.split("#&#")[0];
            var location = hm.selectedItem;
            hm.slug = entityName + "-" + changeEntity.split("-")[0] + "s-in-" + location;
            
            if (changeEntity == "store") {

                hm.url = "/store/storesCollection/storeName/";


            } else if (changeEntity == "store-category") {

                hm.url = "/store/storesCollection/category/";


            } else if (changeEntity == "product") {

                hm.url = "/productsCollectionName/";

            } else if (changeEntity == "product-category") {

                hm.url = "/productsCollectionCategory/";


            } else if (changeEntity == "product-subcategory") {

                hm.url = "/productsCollectionSubCategory/";

            } else if (changeEntity.trim() == "All products in") {

                locationProductsSearchUrl();

            } else {

                locationStoresSearchUrl();
            }
            $window.location= '#'+hm.url + entityName + "/" + location + "/" + hm.slug;
            /*$timeout(function(){
            	changeBrowserURL.changeBrowserURLMethod(hm.url + entityName + "/" + location + "/" + hm.slug);	
            }, 0);*/
            


        }
        //md-search-text-change="sbc.searchTextChange(sbc.searchText)"
        function userSearchTextChange(city, userSearchText) {
            console.log("ola");
            console.log(userSearchText.length);
            if (userSearchText.length >= 1) {
                searchService.getAjaxSearches(city, userSearchText)
                    .then(function(resource) {

                        hm.userSearches = [];
                        var allStoresItem = { "userSearchString": "All stores  #&#" + hm.selectedItem };
                        var allProductsItem = { "userSearchString": "All products  #&#" + hm.selectedItem };
                        hm.userSearches = [allStoresItem, allProductsItem];
                        //hm.userSearches = 
                        for (var i = 0; i < resource.data.length; i++) {
                            hm.userSearches.push(resource.data[i]);
                        }

                    });
            } else {
                if (hm.selectedItem) {
                    selectedItemChange(hm.selectedItem);
                }
            }
        }

        function selectedItemChange(item) {

            cityStorage.setCity(item);
            searchService.getSearches(item).then(function(resource) {
                var allStoresItem = { "userSearchString": "All stores  #&#" + hm.selectedItem };
                var allProductsItem = { "userSearchString": "All products  #&#" + hm.selectedItem };
                hm.userSearches = [allStoresItem, allProductsItem];
                for (var i = 0; i < resource.data.length; i++) {
                    hm.userSearches.push(resource.data[i]);
                }

            }, function(data) {
                console.log(data);
            });
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
            changeBrowserURL.changeBrowserURLMethod(hm.url + "/" + myLocation + "/" + hm.slug);

        }

        function locationProductsSearchUrl() {

            hm.url = "/productsCollectionLocation";
            var myLocation = hm.selectedItem;
            hm.slug = "products-in-" + myLocation;

            changeBrowserURL.changeBrowserURLMethod(hm.url + "/" + myLocation + "/" + hm.slug);


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
