(function(angular) {
    angular.module('app.chat')

    .controller('ChatBoxController', ['$scope', 'Socket', '$routeParams', 'userData', 'chatService', ChatBoxController]);

    function ChatBoxController($scope, Socket, $routeParams, userData, chatService) {
        var cbc = this;
        cbc.currentUser = userData.getUser()._id;
        cbc.chatRoomId = '';
        cbc.messageLoading = false;
        activate();
        //socketStart();
        function getChatMessages(){
          chatService.getChatMessages(cbc.chatRoomId).then(function(res){
              cbc.chatList = res.data[0].chats;
               $('.chatBoxUL').animate({ scrollTop: 99999999 }, 'slow');
            },function(res){
              console.log(res);
            });

        }
        function activate() {
            chatService.getChatRoom().then(function(res) {
                cbc.chatRoomId = res.data[0]._id;
                socketJoin();
                getChatMessages();
            }, function(res) {
                console.log(res);
            });
        }
        function socketStart() {
            Socket.on("connect", function() {
                Socket.on('messageSaved',function(message){
                  cbc.chatList.push(message);
                });
            });
        }

        function socketJoin() {
            Socket.emit('addToRoom', { 'roomId': cbc.chatRoomId });
            Socket.on('messageSaved',function(message){
                  cbc.chatList.push(message);
                  $('.chatBoxUL').animate({ scrollTop: 99999999 }, 'slow');
                });
        }
        cbc.sendMsg = function($event) {
            if ($event.which == 13 && !$event.shiftKey && cbc.myMsg) {
                cbc.messageLoading = true;
                var chatObj = { 'message': cbc.myMsg, 'user': cbc.currentUser, 'roomId': cbc.chatRoomId };
                chatService.sendChatMessage(chatObj).then(function(res){
                  cbc.myMsg = '';
                  cbc.messageLoading = false;
                },function(res){
                  console.log(res);
                });
                
            }
        };
        cbc.clickSubmit = function(){
          if (cbc.myMsg) {
                cbc.messageLoading = true;
                var chatObj = { 'message': cbc.myMsg, 'user': cbc.currentUser, 'roomId': cbc.chatRoomId };
                chatService.sendChatMessage(chatObj).then(function(res){
                  cbc.myMsg = '';
                  cbc.messageLoading = false;
                },function(res){
                  console.log(res);
                });
                
            }  
        };

    }
})(window.angular);
