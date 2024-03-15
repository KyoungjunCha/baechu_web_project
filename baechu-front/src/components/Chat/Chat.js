import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import chatIcon from '../../images/user.png';

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
    {
      id: 4,
      category: '음식',
      roomName: '붕어빵',
      unreadMessages: 7,
    },

  ]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // 채팅방이 추가될 때 스크롤이 생기도록 처리
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatRooms]);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleExitRoom = (roomId) => {
    const updatedChatRooms = chatRooms.filter(room => room.id !== roomId);
    
    // 나머지 채팅방이 6개 미만이면 빈 칸 추가
    const remainingEmptyChatCount = Math.max(0, 6 - updatedChatRooms.length);
    for (let i = 0; i < remainingEmptyChatCount; i++) {
      updatedChatRooms.push({ id: `empty-${i}`, isEmpty: true });
    }
    
    setChatRooms(updatedChatRooms);
  };

  return (
    <div className="ChatWrapper">
      {showChat ? (
        <div className="chat-container" ref={chatContainerRef}>
          <h2>경기도 수원시 장안구</h2>
          {chatRooms.map(room => (
            <div key={room.id} className={`chat-room ${room.isEmpty ? 'empty-chat' : ''}`}>
              <div className="room-info">
                <span className="category">{room.category}</span>
                <span className="room-name">{room.roomName}</span>
                {room.unreadMessages > 0 && (
                  <span className="unread-count">
                    <span className="count-number">{room.unreadMessages}</span>
                  </span>
                )}
              </div>
              {!room.isEmpty && (
                <button className="exit-button" onClick={() => handleExitRoom(room.id)}>
                  나가기
                </button>
              )}
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
