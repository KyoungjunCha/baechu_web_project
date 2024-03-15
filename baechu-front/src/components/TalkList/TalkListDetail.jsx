import React from 'react';
import './TalkListDetail.css';
import imageIcon from '../../images/imgn.png';

const dummyDatas = [
  {
    id: 1,
    category: '음식',
    hasimg: true,
    title: '수원 맛집 가성비 판별',
    personnel: 100,
    agree: 60,
    disagree: 40
  },
  {
    id: 2,
    category: '카페',
    hasimg: true,
    title: '수원 카페 가성비 판별',
    personnel: 97,
    agree: 42,
    disagree: 55
  },
  {
    id: 3,
    category: '음식',
    hasimg: true,
    title: '수원 맛집 가성비 판별',
    personnel: 97,
    agree: 42,
    disagree: 55
  },
  {
    id: 4,
    category: '음식',
    hasimg: true,
    title: '수원 맛집 가성비 판별',
    personnel: 97,
    agree: 42,
    disagree: 55
  },
  {
    id: 5,
    category: '음식',
    hasimg: true,
    title: '수원 맛집 가성비 판별',
    personnel: 97,
    agree: 42,
    disagree: 55
  },
  {
    id: 6,
    category: '음식',
    hasimg: true,
    title: '수원 맛집 가성비 판별',
    personnel: 97,
    agree: 42,
    disagree: 55
  },
  {
    id: 7,
    category: '음식',
    hasimg: true,
    title: '수원 맛집 가성비 판별',
    personnel: 97,
    agree: 42,
    disagree: 55
  },
  {
    id: 8,
    category: '음식',
    hasimg: true,
    title: '수원 맛집 가성비 판별',
    personnel: 97,
    agree: 42,
    disagree: 55
  },
];

export default function TalkListDetail() {
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
        {dummyDatas.map((data) => (
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

