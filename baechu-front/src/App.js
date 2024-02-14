import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoardList from "./pages/BoardList/BoardList";
import TalkDetail from "./pages/TalkDetail/TalkDetail";
import TalkPost from "./pages/TalkPost/TalkPost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import TalkList from "./pages/TalkList/TalkList";
import socket from "./server";

const App = () => {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);

  const askUserName = () => {
    const userName = prompt("당신의 이름을 입력하세요.");

    socket.emit("login", userName, (res) => {
      console.log("Res", res);
      if (res?.ok) {
        setUser(res.data);

        // 이전에 등록된 rooms 이벤트 리스너를 제거
      socket.off("rooms");

        // 유저 정보를 받은 후에 방 목록 요청
        socket.on("rooms", (roomsRes) => {
          setRooms(roomsRes);
        });
      }
    });
  };

  useEffect(() => {
    askUserName();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route path="/TalkDetail/:id" element={<TalkDetail user={user} rooms={rooms}/>} />
          <Route path="/TalkList" element={<TalkList rooms={rooms} />} />
          <Route path="/TalkPost" element={<TalkPost />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
