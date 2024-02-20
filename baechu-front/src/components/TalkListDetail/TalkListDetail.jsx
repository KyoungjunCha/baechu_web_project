import React from 'react';
import './TalkListDetail.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function TalkListDetail({ rooms }) {
  const navigate = useNavigate();

  // 투표 합계 계산
  const getTotalVotes = room => room.voteData?.agreeCount + room.voteData?.disagreeCount || 0;

  // 찬성 퍼센트 계산
  const getAgreePercentage = room => {
    const totalVotes = getTotalVotes(room);
    return totalVotes ? Math.round((room.voteData?.agreeCount / totalVotes) * 100) : 0;
  };

  // 반대 퍼센트 계산
  const getDisagreePercentage = room => {
    const totalVotes = getTotalVotes(room);
    return totalVotes ? Math.round((room.voteData?.disagreeCount / totalVotes) * 100) : 0;
  };

  const moveToChat = roomId => navigate(`/TalkDetail/${roomId}`);

  return (
    <div className='TalkListDetailWrap'>
      {rooms.map(room => (
        <div key={room._id} className='item' onClick={() => moveToChat(room._id)}>
          <div className='title'>{room.room}</div>
          <div className='category'>{room.category}</div>
          <div className='Talkgraph'>
            <div className='agree'>
              찬성: {getAgreePercentage(room)}%
              <div className='graph' style={{ width: `${getAgreePercentage(room)}%`, backgroundColor: 'green', height: '20px' }}></div>
            </div>
            <div className='disagree'>
              반대: {getDisagreePercentage(room)}%
              <div className='graph' style={{ width: `${getDisagreePercentage(room)}%`, backgroundColor: 'red', height: '20px' }}></div>
            </div>
          </div>
          <div className='personnel'>{room.members?.length || 0}명 참여</div>
        </div>
      ))}
    </div>
  );
}

TalkListDetail.propTypes = {
  rooms: PropTypes.array.isRequired,
};

export default TalkListDetail;
