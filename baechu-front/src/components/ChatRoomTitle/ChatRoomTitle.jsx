import React, { useState, useEffect } from 'react';
import socket from '../../server';
import './ChatRoomTitle.css';

function ChatRoomTitle({ roomData }) {

  const uniqueUserIds = new Set(roomData.members);
  const userCount = uniqueUserIds.size;


  return (
    <div className='Titlewrap'>
      <div>{roomData.room}</div>
      <div className='onlineUsers'>채팅방 인원: {userCount}</div>
      <div className='totalMessages'>{roomData.totalMessages}</div>
    </div>
  );
}
export default ChatRoomTitle;
