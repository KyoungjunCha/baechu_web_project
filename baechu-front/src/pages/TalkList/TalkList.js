import React, { useState } from 'react';
import imageIcon from '../images/imgy.png';
import noImageIcon from '../images/imgn.png';
import trashIcon from '../images/trashcan-icon-white.png';
// import '../css/MyCommentList.css';
import dummyData from '../../dummy/TalkList.dummy'
import TalkListHeader from '../../components/TalkListHeader/TalkListHeader';
import TalkListDetail from '../../components/TalkList/TalkListDetail';

const pageSize = 5; // 한 페이지당 아이템 수를 5로 변경

export default function TalkList() {
  
    return(
        <div>
            <TalkListHeader/>
            <TalkListDetail/>
        </div>
    )
  }


