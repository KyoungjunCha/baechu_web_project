import React from 'react';
import './TalkListDetail.css';
import imageIcon from '../../images/imgg.png';
import PropTypes from 'prop-types'; //컴포넌트 데이터 불러온거 사용?


// 컴포넌트에서 불러온 데이터 타입을 정의
const propTypes = {
  data : PropTypes.array,
}

// 데이터가 없을 경우, default 값을 명시
const defaultprops = {
  data : [],
}

export default function TalkListDetail(props) {
  const getTotalVotes = (data) => data.agree + data.disagree;

  const getAgreePercentage = (data) => {
    const totalVotes = getTotalVotes(data);
    return totalVotes === 0 ? 0 : Math.round((data.agree / totalVotes) * 100);
  };

  const getDisagreePercentage = (data) => {
    const totalVotes = getTotalVotes(data);
    // console.log('Disagree Percentage:', (data.disagree / totalVotes) * 100);
    return totalVotes === 0 ? 0 : Math.round((data.disagree / totalVotes) * 100);
  };


  return (
    <div className='TalkListDetailWrap'>
      <div className='TalkList'>
        {props.data.map((data) => (
          <div key={data.id} className='item'>
            <div className='title'>{data.title}</div>
            <div className='detail-List'>
              <div className='category'>{data.category}</div>
              <div className='personnel'>{data.personnel}명</div>
              <div className='vote'>
                <div>
                  <h3>{data.title}</h3>
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
              </div>
              {data.hasimg ? (
                <img src={imageIcon} alt={data.title} />
              ) : (
                <div className='no-image'>이미지 없음</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

