(function(angular) {
	'use strict';
	angular.module('app.store')
		.directive('storesList', ['getStoreCollectionService', storesList]);

	function storesList(getStoreCollectionService) {
		return {
			restrict: 'E',
			templateUrl: 'app/store/views/storesListTemplate.html',
			scope: {
				paramData: '=paramData'
			},
			
			controller: ['$scope',function($scope) {
				$scope.storesList = [];
				$scope.loadMoreStores = loadMoreStores;
				$scope.getStores = getStores;
				activate();
				$scope.$on('filterClicked', function() {
					$scope.storesList = [];
					$scope.paramData.page = 1;
					getStores();
				});

				function loadMoreStores() {
					$scope.paramData.page = $scope.paramData.page + 1;
					getStores();
				}

				function getStores() {
					$scope.spinnerLoading = true;
					console.log("paramdata");
					console.log($scope.paramData);
					getStoreCollectionService.storesCollection($scope.paramData).then(function(response) {
						
						$scope.totalStores = response.data.total;
						
						angular.forEach(response.data.docs, function(value) {
							$scope.storesList.push(value);
						});
						
						$scope.spinnerLoading = false;

					}).catch(function(error) {
						console.log('error');
						console.log(error);
					});
				}

				function activate() {
					getStores();
				}


			}]
		};
	}



})(window.angular);
