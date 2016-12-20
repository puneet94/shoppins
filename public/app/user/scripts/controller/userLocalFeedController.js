(function(angular) {
    'use strict';
    angular.module('app.user')

    .controller('UserLocalFeedController', ["$scope", "$auth", "activityService", UserLocalFeedController]);

    function UserLocalFeedController($scope, $auth, activityService) {

        var ual = this;
        ual.loading = true;
        ual.authCheck = $auth.isAuthenticated();
        activate();

        function activate() {
            ual.loading = true;
            activityService.getAllActivity().then(function(result) {
                ual.activityData = result.data;
                ual.loading = false;
            });
        }
    }

})(window.angular);
