// ChatRoomTitle.js
import React, { useState, useEffect } from 'react';
import socket from '../../server';
import './ChatRoomTitle.css';

export default function ChatRoomTitle({ title }) {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);

  useEffect(() => {
    // 서버로부터 온라인 사용자 수 업데이트를 수신
    socket.on('updateOnlineUsers', (count) => {
      setOnlineUsers(count);
    });

    // 서버로부터 전체 채팅 수 업데이트를 수신
    socket.on('updateTotalMessages', (count) => {
      setTotalMessages(count);
    });

    // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
    return () => {
      socket.off('updateOnlineUsers');
      socket.off('updateTotalMessages');
    };
  }, []);

  const handleUserButtonClick = () => {
    // 인원 확인 버튼을 눌렀을 때 실행되는 로직 추가
    // 예를 들어, 모달 창 열기 등
    setShowOnlineUsers(!showOnlineUsers);
    console.log('User Button Clicked');
  };

  return (
    <div className='Titlewrap'>
      <div>{title}</div>
      <button onClick={handleUserButtonClick}>인원 확인</button>
      {showOnlineUsers && (
        <div className='onlineUsers'>
          온라인 사용자 수: {onlineUsers}
        </div>
      )}
      <div className='totalMessages'>{totalMessages}</div>
    </div>
  );
}
