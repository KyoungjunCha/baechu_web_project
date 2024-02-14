import React from 'react';
import './TalkListDetail.css';
// import imageIcon from '../../images/imgg.png';
import PropTypes from 'prop-types'; //컴포넌트 데이터 불러온거 사용?
import { useNavigate } from 'react-router-dom';
import TalkDetail from '../../pages/TalkDetail/TalkDetail';


// // 컴포넌트에서 불러온 데이터 타입을 정의
const propTypes = {
  data: PropTypes.array,
}

// // 데이터가 없을 경우, default 값을 명시
const defaultprops = {
  data: [],
}

// export default function TalkListDetail(props) {
//   const getTotalVotes = (data) => data.agree + data.disagree;

//   const getAgreePercentage = (data) => {
//     const totalVotes = getTotalVotes(data);
//     return totalVotes === 0 ? 0 : Math.round((data.agree / totalVotes) * 100);
//   };

//   const getDisagreePercentage = (data) => {
//     const totalVotes = getTotalVotes(data);
//     // console.log('Disagree Percentage:', (data.disagree / totalVotes) * 100);
//     return totalVotes === 0 ? 0 : Math.round((data.disagree / totalVotes) * 100);
//   };

//   const navigate = useNavigate();
//   const moveToChat = (rid) => {
//     navigate(`/TalkDetail/${rid}`);
//   };


function TalkListDetail({ rooms }) {
  const navigate = useNavigate();

  const getTotalVotes = (room) => room.agree + room.disagree;

  const getAgreePercentage = (room) => {
    const totalVotes = getTotalVotes(room);
    return totalVotes === 0 ? 0 : Math.round((room.agree / totalVotes) * 100);
  };

  const getDisagreePercentage = (room) => {
    const totalVotes = getTotalVotes(room);
    // console.log('Disagree Percentage:', (data.disagree / totalVotes) * 100);
    return totalVotes === 0 ? 0 : Math.round((room.disagree / totalVotes) * 100);
  };

  if (!rooms || rooms.length === 0) {
    // rooms가 없거나 빈 배열인 경우 렌더링할 내용이 없다면, null 또는 다른 표시할 내용 반환
    return null;
  }

  const moveToChat = (rid) => {
    navigate(`/TalkDetail/${rid}`);
  };


  return (
    <div className='TalkListDetailWrap'>
      <div className='TalkList'>
        {rooms.map((room) => (
          <div key={room._id} className='item' onClick={() => moveToChat(room._id)}>
            <div className='title'>{room.room}</div>
            <div className='detail-List'>
              <div className='category'>{room.category}</div>
              <div className='vote'>
                <div>
                  <h3>{room.name}</h3>
                </div>
                <div className='Talkgraph'>
                  <div>
                    Agree: {getAgreePercentage(room)}%
                    <div style={{ width: `${getAgreePercentage(room)}%`, background: 'green', height: '20px' }} />
                  </div>
                  <div>
                    Disagree: {getDisagreePercentage(room)}%
                    <div style={{ width: `${getDisagreePercentage(room)}%`, background: 'red', height: '20px' }} />
                  </div>
                </div>
              </div>
              <div className='personnel'>{room.members ? room.members.length : 0}명</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TalkListDetail;

{/* <div className='vote'>
              <div>
                <h3>{data.name}</h3>
              </div>
              <div className='Talkgraph'>
                <div>
                  Agree: {getAgreePercentage(data)}%
                  <div style={{ width: `${getAgreePercentage(data)}%`, background: 'green', height: '20px' }} />
                </div>
                <div>
                  Disagree: {getDisagreePercentage(data)}%
                  <div style={{ width: `${getDisagreePercentage(data)}%`, background: 'red', height: '20px' }} />
                </div>
              </div>
            </div> */}
{/* {data.hasimg ? (
                <img src={imageIcon} alt={data.name} />
              ) : (
                <div className='no-image'>이미지 없음</div>
              )} */}