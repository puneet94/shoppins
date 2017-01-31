(function(angular){
'use strict';



angular.module('app.chat')
	.factory('SocketUserService', ['socketFactory','userData',socketFactoryFunction]);
    function socketFactoryFunction(socketFactory,userData) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect('/'+userData.getUser()._id)
        });
    }
})(window.angular);