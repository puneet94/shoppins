(function(angular) {
    'use strict';

    angular.module('app.home')
        .controller('MobileFooterController', ["$scope", '$auth',"changeBrowserURL", MobileFooterController]);

    function MobileFooterController($scope,$auth ,changeBrowserURL) {
        var mfc = this;
        mfc.authCheck = $auth.isAuthenticated();
    }

})(window.angular);
/*git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo*/
