import React, { useState } from 'react';
import "./TalkListHeader.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const dummyCategorys = [
    {
        id: 1,
        title: '음식'
    },
    {
        id: 2,
        title: '운동'
    },
    {
        id: 3,
        title: '카페'
    },
    {
        id: 4,
        title: '전자기기'
    },
    {
        id: 5,
        title: '음악'
    },
    {
        id: 6,
        title: '테스트1'
    },
    {
        id: 7,
        title: '테스트2'
    },
    {
        id: 8,
        title: '테스트3'
    },
];

export default function TalkListHeader() {
    // const [visibleCategories, setVisibleCategories] = useState(5);

    // const handleShowMore = () => {
    //     setVisibleCategories(visibleCategories + 1);
    // };

    return (
        <div className='TalkListHeaderWrap'>
            <div className='TalkAddress'>
                경기도 수원시 장안구
            </div>
            <div className='TalkSearch'>
                <input type="text" placeholder="검색어를 입력하세요" />
                <button type="button">
                    <FontAwesomeIcon icon={faSearch} aria-label="search icon" />
                </button>
            </div>
            <div className='TalkCategory'>
                {dummyCategorys.map((category) => (
                    <div key={category.id} className='categoryItem'>
                        {category.title}
                    </div>
                ))}
            </div>
            {/* {visibleCategories < dummyCategorys.length && (
                <button onClick={handleShowMore} className="showMoreButton">
                    더 보기
                </button>
            )} */}
        </div>
    );
}
