(function(angular) {
    'use strict';
    angular.module('app.user')

    .controller('UserCustomFeedController', ["$scope", "$auth", "activityService", UserCustomFeedController]);

    function UserCustomFeedController($scope, $auth, activityService) {

        var ual = this;
        ual.loading = true;
        ual.authCheck = $auth.isAuthenticated();
        activate();

        function activate() {
            ual.loading = true;
            if (ual.authCheck) {
                activityService.getUserFollowingActivity($auth.getPayload().sub).then(function(result) {
                    ual.activityData = result.data;
                    ual.loading = false;
                });
            }
        }


    }

})(window.angular);
