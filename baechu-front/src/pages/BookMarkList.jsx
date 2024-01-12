import React, { useState } from 'react';
import imageIcon from '../images/imgy.png';
import noImageIcon from '../images/imgn.png';
import trashIcon from '../images/trashcan-icon-white.png';
import bookMarkIcon from '../images/bookMark.png'
import './BookMarkList.css';
import dummyData from './BookMarkDummy'

const pageSize = 5; // 한 페이지당 아이템 수를 5로 변경

export default function BookMarkList() {
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
    <div className='bookMark'>
      <div className='bookMarkHeader'>
        <div className='totalfont'>북마크</div>
        <img 
          style={{ width: '50px', height: '50px', display: 'flex', marginLeft: 'auto', color:'white'}} 
          src={trashIcon} alt='전체삭제'
          onClick={{}}
        />
      </div>
      {currentPageData.map((e) => (
        <div key={e.id} className='bookMarkList'>
          {e.hasImage ?
            <img src={imageIcon} alt="이미지 첨부됨" className="board-img" /> :
            <img src={noImageIcon} alt="이미지 첨부 안됨" className="board-img" />
          }
          <div style={{ marginLeft: '20px' }}>
            <div className='title'>글제목: {e.title}</div>
            <div className='detail'>{e.detail}</div>
          </div>
          <img src={bookMarkIcon} alt='북마크' className='board-img' onClick={{}}/>
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
