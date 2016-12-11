(function(angular) {
    angular.module('app.chat')

    .controller('ChatRoomListController', ['$scope','$routeParams', 'userData', 'chatService', ChatRoomListController]);

    function ChatRoomListController($scope,$routeParams, userData, chatService) {
        
        var cbc = this;
        cbc.currentUser = userData.getUser()._id;
        activate();
        function getChatRoomList(){

          chatService.getChatRoomList(cbc.currentUser).then(function(res){
              cbc.chatRoomList = res.data;
                console.log(cbc.chatRoomList);
            },function(res){
              console.log(res);
            });

        }

        function activate() {
            getChatRoomList();
        }
        

    }
})(window.angular);
