(function(angular){
  angular.module('app.store')

    .controller('UserStoreVisitController',["$scope","$auth","$routeParams","userData","userVisitService",UserStoreVisitController]);

    function UserStoreVisitController($scope,$auth,$routeParams,userData,userVisitService){
      var usv = this;
      usv.visit = {};
      usv.visitCheck = false;
      usv.getVisitParamObj = {};
      usv.submitVisit = submitVisit;
      usv.deleteVisit = deleteVisit;
      usv.getVisitParamObj.userId = userData.getUser()._id;
      usv.userStoreVisited = false;

      activate();      
      function userStoreVisited(){        
      }
      function submitVisit(){
        userVisitService.submitVisit(usv.visit)
            .then(function(res){
                    userData.setUser();
                    usv.userStoreVisited = true;
                  },
                  function(res){
                    console.log(res);
                  });
      }
      function deleteVisit(){
        userVisitService.deleteVisit(usv.visit)
            .then(function(res){
              
              userData.setUser();
              usv.userStoreVisited = false;
             
            },
              function(res)
              {
                console.log(res);
              });
      }
      
      function activate(){
       
       usv.visit.userId = userData.getUser()._id;
        if($routeParams.storeId){
        usv.entity = $routeParams.storeId;
        usv.visit.storeId = $routeParams.storeId;
        usv.getVisitParamObj.storeId = $routeParams.storeId;
        
      }
      else if($routeParams.productId){
        usv.entity = $routeParams.productId;
        usv.visit.productId = $routeParams.productId;
        usv.getVisitParamObj.productId = $routeParams.productId;
      }
      if($auth.isAuthenticated()){
        userVisitService.getVisit(usv.visit)
            .then(function(res){
              
              
              if(res.data[0]){
              if(res.data[0]._id){
              
                usv.userStoreVisited = true;
              }}
              
             
            },
              function(res)
              {
                console.log(res);
              });
      }
      }

    }

})(window.angular);
