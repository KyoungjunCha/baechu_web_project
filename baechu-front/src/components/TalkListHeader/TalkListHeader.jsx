import React, { useState } from 'react';
import "./TalkListHeader.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TalkListDetail from '../TalkList/TalkListDetail';

const dummyCategorys = [
    {
        id: 1,
        category: '음식'
    },
    {
        id: 2,
        category: '운동'
    },
    {
        id: 3,
        category: '카페'
    },
    {
        id: 4,
        category: '전자기기'
    },
    {
        id: 5,
        category: '음악'
    },
];

function TalkListHeader() {
    //함수를 적는다?
    // <TalkListHeader />
    const [isopenmodal,setIsopenmodal] = useState(false);

    const renderBody = () => {
        return (
            <div className='TalkListHeaderWrap'>
                <div className='TalkAddress'>
                    경기도 수원시 장안구
                </div>
                <div className='TalkSearch'>
                    <input type="text" placeholder="검색어를 입력하세요" />
                    <button type="button" onClick={()=>{setIsopenmodal(!isopenmodal)}}>
                        <FontAwesomeIcon icon={faSearch} aria-label="search icon" />
                    </button>
                </div>
                <div className='TalkCategory'>
                    {dummyCategorys.map((categorys) => (
                        <div key={categorys.id} className='categoryItem'>
                            {categorys.category}
                        </div>
                    ))}
                </div>

            </div>
        );
    }

    return (
        <div>
            {renderBody()}
            { isopenmodal ? <TalkListDetail /> : null} 
        </div>
    )

}

export default TalkListHeader;

