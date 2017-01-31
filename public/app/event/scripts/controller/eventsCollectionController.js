(function(angular) {
  'use strict';
  angular.module('app.event')
    .controller('EventsCollectionController', ["$scope", "$auth", "$routeParams", "changeBrowserURL", "eventService", EventsCollectionController]);

  function EventsCollectionController($scope, $auth, $routeParams, changeBrowserURL, eventService) {
    var occ = this;
    occ.pageNo = 0;
    occ.eventsList = [];
    occ.getSingleevent = getSingleevent;
    occ.getEventsCollection = getEventsCollection;

    activate();
    $scope.$on('parent', function(event, data) {
      occ.pageNo = 0;
      occ.paramData = data;
      occ.geteventsCollection();

    });

    function getSingleevent(event) {
      var url = "event/" + event._id;
      changeBrowserURL.changeBrowserURLMethod(url);
    }

    function getEventsCollection() {
      occ.loading = true;
      occ.pageNo = occ.pageNo + 1;
      var location = $routeParams.location;
      occ.paramData = {'store': $routeParams.storeId,'limit':100,'page':1,'populate':'store'};
      eventService.getEventCollection( occ.paramData)
        .then(function(response) {
          console.log("events collection");
          console.log(response);
          if (response.data.docs.length === 0) {
            occ.noeventsToShow = true;

          } else {
            occ.noeventsToShow = false;
            occ.eventsList = response.data.docs;
          }

          occ.loading = false;
        }, function(response) {
          console.log(response);
        });
    }

    function activate() {
      occ.getEventsCollection();
    }

  }




})(window.angular);
