import React, { useState } from 'react';
import "./TalkListHeader.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TalkListDetail from '../TalkListDetail/TalkListDetail';
import PropTypes from 'prop-types';

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

const propTypes = {
    selectCategoryList: PropTypes.func,
    categoryItem: PropTypes.string,
    onClickCategoryList: PropTypes.func,
}

const defaultprops = {
    selectCategoryList: () => { },
    categoryItem: "",
    onClickCategoryList: () => { },
}


function TalkListHeader(props) {
    //함수를 적는다?
    //modal 사용법
    const [isopenmodal, setIsopenmodal] = useState(false);


    const renderBody = () => {
        return (
            <div className='TalkListHeaderWrap'>
                <div className='TalkAddress'>
                    경기도 수원시 장안구
                </div>
                <div className='TalkSearch'>
                    <input type="text" placeholder="검색어를 입력하세요" />
                    <button type="button" onClick={() => { setIsopenmodal(!isopenmodal) }}>
                        <FontAwesomeIcon icon={faSearch} aria-label="search icon" />
                    </button>
                </div>
                <div className='TalkCategory'>
                    {dummyCategorys.map((item) => (
                        <label value={item.category} onClick={(e) => { props.onClickCategoryList(item.category); props.selectCategoryList(item.category) }} key={item.id} className='categoryItem'>
                            {item.category}
                        </label>
                    ))}
                </div>

            </div>
        );
    }

    return (
        <div>
            {renderBody()}
            {isopenmodal ? <TalkListDetail /> : null}
        </div>
    )

}

export default TalkListHeader;


