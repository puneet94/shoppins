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


		}
		//md-search-text-change="sbc.searchTextChange(sbc.searchText)"
		function userSearchTextChange(city,userSearchText){
			if(userSearchText.length>=2){
				searchService.getAjaxSearches(city,userSearchText)
					.then(function(resource){
						hm.loading = true;
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
			else{
				if(hm.selectedItem){
					selectedItemChange(hm.selectedItem);
				}
			}
		}
		function selectedItemChange(item){
			hm.loading = true;
			cityStorage.setCity(item);
			searchService.getSearches(item).then(function(resource){
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
