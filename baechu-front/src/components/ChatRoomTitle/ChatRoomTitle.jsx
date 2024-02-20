import React, { useState, useEffect } from 'react';
import './ChatRoomTitle.css';

function ChatRoomTitle({ roomData }) {


  const initialUserCount = roomData.userCount || (roomData.members ? roomData.members.length : 0);

  // // userCount 상태를 초기화하고, roomData의 변경을 감지하여 업데이트
  const [userCount, setUserCount] = useState(initialUserCount);

  useEffect(() => {
    // roomData 업데이트 시 userCount도 업데이트
    // roomData에 userCount가 직접 포함되어 있으면 그 값을 사용하고,
    // 그렇지 않으면 roomData.members의 길이를 사용 (없으면 0으로 가정)
    const newUserCount = roomData.userCount || (roomData.members ? roomData.members.length : 0);
    setUserCount(newUserCount);
  }, [roomData]);


  return (
    <div className='Titlewrap'>
      <div>{roomData.room}</div>
      <div className='onlineUsers'>채팅방 인원: {userCount}</div>
      <div className='totalMessages'>{roomData.totalMessages}</div>
    </div>
  );
}
export default ChatRoomTitle;
