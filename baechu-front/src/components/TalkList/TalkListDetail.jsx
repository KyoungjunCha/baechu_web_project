import React from 'react';
import './TalkListDetail.css';

const dummyDatas = [
  {
    id: 1,
    category: '음식',
    image:"../../images/imgg.png",
    title: '수원 맛집 가성비 판별',
    personnel: 55,
    agree:42,
    disagree: 55
  },
  {
    id: 2,
    category: '카페',
    image:"../../images/imgg.png",
    title: '수원 카페 가성비 판별',
    personnel: 55,
    agree:42,
    disagree: 55
  },
  {
    id: 3,
    category: '음식',
    image:"../../images/imgg.png",
    title: '수원 맛집 가성비 판별',
    personnel: 55,
    agree:42,
    disagree: 55
  },
  {
    id: 4,
    category: '음식',
    image:"../../images/imgg.png",
    title: '수원 맛집 가성비 판별',
    personnel: 55,
    agree:42,
    disagree: 55
  },
  {
    id: 5,
    category: '음식',
    image:"../../images/imgg.png",
    title: '수원 맛집 가성비 판별',
    personnel: 55,
    agree:42,
    disagree: 55
  },
  {
    id: 6,
    category: '음식',
    image:"../../images/imgg.png",
    title: '수원 맛집 가성비 판별',
    personnel: 55,
    agree:42,
    disagree: 55
  },
  {
    id: 7,
    category: '음식',
    image:"../../images/imgg.png",
    title: '수원 맛집 가성비 판별',
    personnel: 55,
    agree:42,
    disagree: 55
  },
  {
    id: 8,
    category: '음식',
    image:"../../images/imgg.png",
    title: '수원 맛집 가성비 판별',
    personnel: 55,
    agree:42,
    disagree: 55
  },
];

export default function TalkListDetail() {
  return (
    <div className='TalkListDetailWrap'>
      <div className='TalkList'>
        {dummyDatas.map((data) => (
          <div key={data.id} className='item'>
            <img src={data.image} alt={data.title} />
            <div className='title'>{data.title}</div>
            <div className='category'>{data.category}</div>
            <div className='personnel'>{data.personnel}</div>
            <div className='agree'>{data.agree}</div>
            <div className='disagree'>{data.disagree}</div>
          </div>
        ))}
      </div>
    </div>
  );
}