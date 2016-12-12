(function(angular) {
    angular.module('app.chat')

    .controller('ChatRoomListController', ['$scope','$routeParams', 'userData', 'chatService', 'changeBrowserURL',ChatRoomListController]);

    function ChatRoomListController($scope,$routeParams, userData, chatService,changeBrowserURL) {
        
        var cbc = this;
        cbc.currentUser = userData.getUser()._id;
        activate();
        cbc.openChatbox = openChatbox;
        function openChatbox(chatRoom){
            changeBrowserURL.changeBrowserURLMethod('/chatBox/'+chatRoom.creator1._id+'/'+chatRoom.creator2._id);
        }
        function getChatRoomList(){

          chatService.getChatRoomList(cbc.currentUser).then(function(res){
              cbc.chatRoomList = res.data;
                
            },function(res){
              console.log(res);
            });

        }

        function activate() {
            getChatRoomList();
        }
        

    }
})(window.angular);
