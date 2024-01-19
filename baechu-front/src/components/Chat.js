import React, { useState } from 'react';
import './Chat.css';
import chatIcon from '../images/user.png';

const Chat = () => {
  const [showChat, setShowChat] = useState(true);
  const [chatRooms, setChatRooms] = useState([
    {
      id: 1,
      category: '음식',
      roomName: '망포 맛집 추천',
      unreadMessages: 3,
    },
    {
      id: 2,
      category: '음식',
      roomName: '경기도 맛집 공유',
      unreadMessages: 9,
    },
    {
      id: 3,
      category: '음식',
      roomName: '붕어빵',
      unreadMessages: 7,
    },
  ]);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleExitRoom = (roomId) => {
    // 채팅방 나가기 미완
    const updatedChatRooms = chatRooms.filter(room => room.id !== roomId);
    setChatRooms(updatedChatRooms);
  };

  return (
    <div className="ChatWrapper">
      {showChat ? (
        <div className="chat-container">
          <h2>경기도 수원시 장안구</h2>
          {chatRooms.map(room => (
            <div key={room.id} className="chat-room">
              <div className="room-info">
                <span className="category">{room.category}</span>
                <span className="room-name">{room.roomName}</span>
                {room.unreadMessages > 0 && <span className="unread-count">{`알림 ${room.unreadMessages}개`}</span>}
              </div>
              <button className="exit-button" onClick={() => handleExitRoom(room.id)}>나가기</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="chat-icon-container" onClick={toggleChat}>
          <img src={chatIcon} alt="Chat Icon" />
        </div>
      )}
    </div>
  );
};

export default Chat;
