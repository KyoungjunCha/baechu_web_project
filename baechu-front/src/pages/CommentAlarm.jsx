import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import imageIcon from '../images/imgy.png';
import noImageIcon from '../images/imgn.png';
import '../components/CommentAlarm/CommentAlarm.css';
// import dummyData from '../dummy/CommentAlarmDummy';

const pageSize = 5; // 한 페이지당 아이템 수를 5로 변경

export default function CommentAlarm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentAlarm, setCommentAlarm] = useState([]);

  useEffect(() => {
    const getCommentAlarm = async () => {
      try {
        const userId = '2';
  
        const response = await axios.get('http://localhost:3000/commentAlarm', {
          params: { userId },
        });
        console.log(response.data.data);
        
        setCommentAlarm(response.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    getCommentAlarm();
  }, []);  

  const handleDelete = async (commentAlarmId ) => {
    console.log(commentAlarmId);
  
    try {
      await axios.delete('http://localhost:3000/commentAlarm', {
        data: { commentAlarmId: commentAlarmId },
      });

    } catch (error) {
      console.error('북마크 삭제 중 오류 발생:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalItemsCount = Array.isArray(commentAlarm) ? commentAlarm.length : 0;
  const totalPages = Math.ceil(totalItemsCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItemsCount);
  const currentPageData = Array.isArray(commentAlarm) ? commentAlarm.slice(startIndex, endIndex) : [];

  return (
    <div className='commentAlarm'>
      <div className='commentAlarmHeader'>
        <div className='commentAlarmTotalfont'>댓글 알림</div>
      </div>
      {currentPageData.map((commentAlarm) => (
        <Link
          to={`/post/${commentAlarm.board_id}`}
          key={commentAlarm.commentalarm_id} // 여기에 key 속성을 추가합니다.
          onClick={() => handleDelete(commentAlarm.commentalarm_id)}
        >
          <div key={commentAlarm.commentalarm_id} className='commentAlarmList'>
            {commentAlarm.board_img === '001' ? (
              <img src={imageIcon} alt='이미지 첨부됨' className='myPostImg' />
            ) : (
              <img src={noImageIcon} alt='이미지 첨부 안됨' className='myPostImg' />
            )}
            <div style={{ marginLeft: '20px' }}>
              <div className='commentAlarmTitle'>"{commentAlarm.board_title}"에 댓글이 달렸습니다.</div>
              <div className='commentAlarmCreatDate'>{commentAlarm.commentalarm_date}</div>
            </div>
          </div>
        </Link>
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
