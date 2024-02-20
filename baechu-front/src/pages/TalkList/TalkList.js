import React, { useState, useEffect } from "react";
import socket from "../../server"; // 가정한 경로, 실제 프로젝트에 맞게 조정해야 함
import TalkListHeader from "../../components/TalkListHeader/TalkListHeader";
import TalkListDetail from "../../components/TalkListDetail/TalkListDetail";

const TalkList = () => {
  const [data, setData] = useState([]);
  const [categoryItem, setCategoryItem] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // 방 목록과 투표 정보를 불러오는 로직
    socket.on("rooms", async rooms => {
      const roomsWithVoteData = await Promise.all(
        rooms.map(async room => {
          // 예시: 각 방의 투표 정보를 서버로부터 가져오는 과정
          return new Promise(resolve => {
            socket.emit("getVoteCounts", room._id, response => {
              if (response.ok) {
                // 투표 정보를 포함한 방 정보를 생성
                resolve({ ...room, voteData: response.data });
              } else {
                console.error("Failed to fetch vote counts:", response.error);
                resolve(room); // 투표 정보 없이 원래의 방 정보를 반환
              }
            });
          });
        })
      );

      setData(roomsWithVoteData);
    });

    return () => {
      socket.off("rooms");
    };
  }, []);

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm); // 검색어 상태 업데이트
  };

  const selectCategoryList = categoryName => {
    setCategoryItem(categoryName);
  };

  const filteredRooms = data
    .filter(room => categoryItem === "all" || room.category === categoryItem)
    .filter(room => room.room.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <TalkListHeader
        selectCategoryList={selectCategoryList}
        categoryItem={categoryItem}
        onSearch={handleSearch}
      />
      <TalkListDetail rooms={filteredRooms} />
    </div>
  );
};

export default TalkList;
