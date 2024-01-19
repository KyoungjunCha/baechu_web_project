import React, { useState } from 'react';
import imageIcon from '../images/imgy.png';
import noImageIcon from '../images/imgn.png';
import trashIcon from '../images/trashcan-icon-white.png';
import '../components/MyCommentList/MyCommentList.css';
import dummyData from '../dummy/CommentDummy'

const pageSize = 5; // 한 페이지당 아이템 수를 5로 변경

export default function MyCommentList() {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState(
    dummyData.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleCheckboxChange = (id) => {
    setCheckboxStates((prevCheckboxStates) => ({
      ...prevCheckboxStates,
      [id]: !prevCheckboxStates[id],
    }));
  };

  const handleSelectAllChange = () => {
    setSelectAllChecked((prevSelectAllChecked) => {
      const newCheckboxStates = {};
      for (const key in checkboxStates) {
        newCheckboxStates[key] = !prevSelectAllChecked;
      }
      setCheckboxStates(newCheckboxStates);
      return !prevSelectAllChecked;
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalItemsCount = dummyData.length;
  const totalPages = Math.ceil(totalItemsCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItemsCount);
  const currentPageData = dummyData.slice(startIndex, endIndex);

  return (
    <div className='myComment'>
      <div className='myCommentHeader'>
        <input
          type='checkbox'
          className='myCommentCheckBox'
          checked={selectAllChecked}
          onChange={handleSelectAllChange}
        />
        <div className='myCommentTotalfont'>전체선택</div>
        <img 
          style={{ width: '50px', height: '50px', display: 'flex', marginLeft: 'auto', color:'white'}} 
          src={trashIcon} alt='전체삭제'
          onClick={{}}
        />
      </div>
      {currentPageData.map((e) => (
        <div key={e.id} className='myCommentList'>
          <input
            type='checkbox'
            className='myCommentCheckBox'
            checked={checkboxStates[e.id]}
            onChange={() => handleCheckboxChange(e.id)}
          />
          {e.hasImage ?
            <img style={{ marginLeft: '20px' }} src={imageIcon} alt="이미지 첨부됨" className="myCommentIcon" /> :
            <img style={{ marginLeft: '20px' }} src={noImageIcon} alt="이미지 첨부 안됨" className="myCommentIcon" />
          }
          <div style={{ marginLeft: '20px' }}>
            <div className='myCommentTitle'>글제목: {e.title}</div>
            <div className='myCommentCreatDate'>{e.date} 작성자:{e.author}</div>
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
