import React, { useState } from 'react';
import imageIcon from '../images/imgy.png';
import noImageIcon from '../images/imgn.png';
import trashIcon from '../images/trashcan-icon-white.png';
import '../components/CommentAlarm/CommentAlarm.css';
import dummyData from '../dummy/CommentAlarmDummy'

const pageSize = 5; // 한 페이지당 아이템 수를 5로 변경

export default function CommentAlarm() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalItemsCount = dummyData.length;
  const totalPages = Math.ceil(totalItemsCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItemsCount);
  const currentPageData = dummyData.slice(startIndex, endIndex);

  return (
    <div className='commentAlarm'>
      <div className='commentAlarmHeader'>
        <div className='commentAlarmTotalfont'>댓글 알림</div>
        {/* <img 
          style={{ width: '50px', height: '50px', display: 'flex', marginLeft: 'auto', color:'white'}} 
          src={trashIcon} alt='전체삭제'
          onClick={{}}
        /> */}
      </div>
      {currentPageData.map((e) => (
        <div key={e.id} className='commentAlarmList'>
          {e.hasImage ?
            <img src={imageIcon} alt="이미지 첨부됨" className="commentAlarmImg" /> :
            <img src={noImageIcon} alt="이미지 첨부 안됨" className="commentAlarmImg" />
          }
          <div style={{ marginLeft: '20px' }}>
            <div className='commentAlarmTitle'>"{e.title}"에 댓글이 달렸습니다.</div>
            <div className='commentAlarmCreatDate'>{e.date}</div>
          </div>
        </div>
      ))}
      <div style={{marginBottom:'10px'}} className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
