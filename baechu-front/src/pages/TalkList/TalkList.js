import React, { useState, useEffect } from "react";
import socket from "../../server";
import TalkListHeader from "../../components/TalkListHeader/TalkListHeader";
import TalkListDetail from "../../components/TalkListDetail/TalkListDetail";

const TalkList = () => {
  const [data, setData] = useState([]);
  const [categoryItem, setCategoryItem] = useState("");
  const [onClickCategoryList, setOnClickCategoryList] = useState([]);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    const updateRoomListListener = rooms => {
      setData(rooms);
    };

    socket.on("rooms", updateRoomListListener);
  }, []);

  const selectCategoryList = categoryName => {
    let tempList = data.filter(room => room.category === categoryName);
    setOnClickCategoryList(tempList);
    setCategoryItem(categoryName);
  };

  return (
    <div>
      <TalkListHeader
        selectCategoryList={selectCategoryList}
        categoryItem={categoryItem}
        onClickCategoryList={setCategoryItem}
      />
      <TalkListDetail
        rooms={onClickCategoryList.length === 0 ? data : onClickCategoryList}
        // user={user}
      />
    </div>
  );
};

export default TalkList;
