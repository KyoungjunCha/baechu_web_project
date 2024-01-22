import React, { useState } from 'react';
import imageIcon from '../../images/imgy.png';
import noImageIcon from '../../images/imgn.png';
import trashIcon from '../../images/trashcan-icon-white.png';
import dummyData from '../../dummy/TalkList.dummy'
import TalkListHeader from '../../components/TalkListHeader/TalkListHeader';
import TalkListDetail from '../../components/TalkList/TalkListDetail';
import { dummyDatas } from '../../dummy/TalkListDetail_dummy';

const pageSize = 5; // 한 페이지당 아이템 수를 5로 변경

export default function TalkList() {
    const [data, setData] = useState(dummyDatas);
    const [categoryItem, setCategoryItem] = useState("");
    const [onClickCategoryList, setOnClickCategoryList] = useState([]);

    const selectCategoryList = (categoryName) =>{
        let tempList = [];
        if (categoryName === '음식'){
            // setOnClickCategoryList(data.filter(함수작성)) 방법1
            // tempList = data.filter(함수작성); 방법2
        }
        console.log(categoryName);
        // setOnClickCategoryList(tempList) 방법2 연계
    }

    return (
        <div>
            <TalkListHeader 
                selectCategoryList = {(categoryName)=>{selectCategoryList(categoryName)}}
                categoryItem = {categoryItem}
                onClickCategoryList = {setCategoryItem}
            />
            <TalkListDetail 
                data = {onClickCategoryList.length === 0 ? data : onClickCategoryList}
            />
        </div>
    );
}

