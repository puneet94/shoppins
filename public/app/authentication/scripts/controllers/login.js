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
  .controller('LoginController', ["$location","$window","$auth","userData",LoginCtrl]);

  function LoginCtrl($location,$window,$auth,userData) {
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
          //socketStart();
          $window.location.reload();
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
