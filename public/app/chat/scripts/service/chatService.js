(function(angular){
  'use strict';
  angular.module('app.chat')
      .service('chatService',['$http','$routeParams','baseUrlService',ReviewService]);
      function ReviewService($http,$routeParams,baseUrlService){
        var rs  = this;
        rs.sendChatMessage = sendChatMessage;
        rs.getChatMessages = getChatMessages;
        rs.getChatRoom = getChatRoom;
        rs.getChatRoomList = getChatRoomList;
        function sendChatMessage(chat){
          return $http.post(baseUrlService.baseUrl+'chat/chats/'+chat.roomId,chat);
        }
        function getChatMessages(chatRoomId){
          
          return $http.get(baseUrlService.baseUrl+'chat/chats/'+chatRoomId);
        }
        function getChatRoom(){
        	return $http.get(baseUrlService.baseUrl + 'chat/chatBox/' + $routeParams.creator1 + '/' + $routeParams.creator2);
                
        }
        function getChatRoomList(userId){
          return $http.get(baseUrlService.baseUrl + 'chat/chatRooms/' + userId);
        }
        

      }
})(window.angular);
