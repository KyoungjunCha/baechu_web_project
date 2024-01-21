import React, { useState } from 'react';
import imageIcon from '../../images/imgy.png';
import noImageIcon from '../../images/imgn.png';
import trashIcon from '../../images/trashcan-icon-white.png';
import dummyData from '../../dummy/TalkList.dummy'
import TalkListHeader from '../../components/TalkListHeader/TalkListHeader';
import TalkListDetail from '../../components/TalkList/TalkListDetail';

const pageSize = 5; // 한 페이지당 아이템 수를 5로 변경

export default function TalkList() {
  const [selectedCategory, setSelectedCategory] = useState(null);
    // 1. 헤더에 값들 보냄. 2. 헤어에서 받은 값을 sort 값만을 변경 3. 변경값을 메인에 보냄?
    
  // 카테고리 변경 시 호출되는 콜백 함수
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // 선택된 카테고리에 따라 데이터를 필터링
  const filteredData = selectedCategory
    ? dummyData.filter((data) => data.category === selectedCategory)
    : dummyData;

  return (
    <div>
      <TalkListHeader onSelectCategory={handleCategoryChange} />
      <TalkListDetail data={filteredData} />
    </div>
  );
}

