import React from 'react';
import "./TalkListHeader.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const dummyCategories = [
    { id: 1, category: 'all' },
    { id: 2, category: 'food' },
    { id: 3, category: 'cafe' },
    { id: 4, category: 'travel' }
];

function TalkListHeader({ selectCategoryList, categoryItem, onSearch }) {

    const [searchTerm, setSearchTerm] = React.useState("");

    // 검색어 입력 핸들러
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 검색 실행 핸들러
    const handleSearchSubmit = () => {
        onSearch(searchTerm);
    };

    return (
        <div className='TalkListHeaderWrap'>
            <div className='TalkAddress'>
                경기도 수원시 장안구
            </div>
            <div className='TalkSearch'>
                <input type="text" placeholder="검색어를 입력하세요" value={searchTerm} onChange={handleSearchChange} />
                <button type="button" onClick={handleSearchSubmit}>
                    <FontAwesomeIcon icon={faSearch} aria-label="search icon" />
                </button>
            </div>
            <div className='TalkCategory'>
                {dummyCategories.map((item) => (
                    <button
                        onClick={() => selectCategoryList(item.category)}
                        key={item.id}
                        className={`categoryItem ${categoryItem === item.category ? 'active' : ''}`}>
                        {item.category}
                    </button>
                ))}
            </div>
        </div>
    );
}

TalkListHeader.propTypes = {
    selectCategoryList: PropTypes.func.isRequired,
    categoryItem: PropTypes.string,
    onSearch: PropTypes.func.isRequired // 검색 함수 prop 타입 정의
};

// TalkListHeader.defaultProps = {
//     categoryItem: "",
// };

export default TalkListHeader;
