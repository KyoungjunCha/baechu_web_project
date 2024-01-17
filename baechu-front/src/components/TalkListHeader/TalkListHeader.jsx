import React from 'react'
import "./TalkListHeader.css"


export default function TalkListHeader() {
  return (
    <div className='TalkListHeaderWrap'>
        <div className='TalkAddress'>
            경기도 수원시 장안구
        </div>
        <div className='TalkSearch'>
            돋보기
        </div>
        <div className='TalkCategory'>
            카테고리들
        </div>
    </div>
  )
}
