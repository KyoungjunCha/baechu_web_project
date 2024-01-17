import React from 'react'
import "./TalkListHeader.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function TalkListHeader() {
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
                카테고리들
            </div>
        </div>
    )
}
