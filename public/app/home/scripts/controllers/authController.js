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
