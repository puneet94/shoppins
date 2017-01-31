(function(angular) {
	'use strict';
	angular.module('app.product')
		.directive('productsList', ['getProductCollectionService', productsList]);

	function productsList(getProductCollectionService) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/product/views/productListTemplate.html',
			scope: {
				paramData: '=paramData'
			},
			controller: ['$scope', function($scope) {
				$scope.productsList = [];
				$scope.loadMoreProducts = loadMoreProducts;
				$scope.getProducts = getProducts;
				activate();
				$scope.$on('filterClicked', function() {
					$scope.productsList = [];
					$scope.paramData.page = 1;
					getProducts();
				});

				function loadMoreProducts() {
					$scope.paramData.page = $scope.paramData.page + 1;
					getProducts();
				}

				function getProducts() {
					$scope.loading = true;
					console.log("the params");
					console.log($scope.paramData);
					getProductCollectionService.productsCollection($scope.paramData).then(function(response) {
						console.log("products");
						console.log(response.data);
						if (response.data.docs.length === 0) {
							$scope.noProductsToShow = true;
						}
						else{
           						$scope.noProductsToShow = false; 
          					}
						$scope.totalProducts = response.data.total;

						angular.forEach(response.data.docs, function(value) {
							$scope.productsList.push(value);
						});
						
						$scope.loading = false;

					}).catch(function(error) {
						console.log('error');
						console.log(error);
					});
				}

				function activate() {
					getProducts();
				}
			}]
		};
	}


})(window.angular);
