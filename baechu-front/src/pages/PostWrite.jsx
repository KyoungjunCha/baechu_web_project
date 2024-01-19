import React, { useState } from 'react';
import imageIcon from '../images/imgy.png';
import youTubeIcon from '../images/free-icon-youtube.png';
import postIcon from '../images/free-icon-bullet-point.png';
import DropdownMenu from '../components/DropdownMenu ';
import '../components/PostWrite/PostWrite.css';

import dummyData from '../dummy/CityDummy.js';
import categoryOptions from '../dummy/Category.js'

export default function PostWrite() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({
    province: dummyData[0]?.province || null,
    city: dummyData[0]?.city || null,
  });
  const [title, setTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleLocationChange = ({ selectedProvince, selectedCity }) => {
    setSelectedLocation({ province: selectedProvince, city: selectedCity });
  };

  const handleWritePost = () => {
    // API 호출을 위한 데이터 준비
    const postData = {
      category: selectedCategory,
      title,
      content: newPostContent,
      location: selectedLocation, // 수정된 부분: 선택된 지역 정보 추가
      // 추가적인 정보나 필요한 데이터를 여기에 추가할 수 있습니다.
    };
  };

  return (
    <div className="postWrite">
      <div className='postType'>
        <div className='postWriteCategory'>
          <label>카테고리:</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value=''>선택하세요</option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        {/* DropdownMenu에 onSelect prop 전달 */}
        <DropdownMenu data={dummyData} onSelect={handleLocationChange} />
      </div>
      <input
        className='postWriteTitle'
        placeholder='제목을 입력하세요'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className='linkImg'>
        <img src={imageIcon} alt='이미지' className="board-img" onClick={{}} />
        <img src={youTubeIcon} alt='유튜브' className="board-img" onClick={{}} />
        <button className='url' onClick={{}}>url</button>
        <img src={postIcon} alt='글' className="board-img" onClick={{}} />
      </div>
      <textarea
        className='postDetail'
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        placeholder="글을 작성하세요..."
      ></textarea>
      <div className='board'></div>
      <div className='buttonStyle'>
        {/* 뒤로 가기 버튼 */}
        <button className='postWritebutton'>뒤로가기</button>
        {/* 작성하기 버튼 */}
        <button className='postWritebutton' onClick={handleWritePost}>
          작성하기
        </button>
      </div>
    </div>
  );
}
