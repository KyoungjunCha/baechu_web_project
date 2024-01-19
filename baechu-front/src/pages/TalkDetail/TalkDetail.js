import React, { useState, useEffect } from "react";
import MessageContainer from "../../components/MessageContainer/MessageContainer";
import InputField from "../../components/InputField/InputField";
import socket from "../../server";
import "./TalkDetail.css";
import VoteField from "../../components/VoteField/VoteField";
import ChatRoomTitle from "../../components/ChatRoomTitle/ChatRoomTitle";

export default function TalkDetail() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // const [voteData, setVoteData] = useState({
  //   title: "Default Title",
  //   image: "../images/imgg.png",
  // })

  useEffect(() => {
    const askUserName = () => {
      const userName = prompt("당신의 이름을 입력하세요.");
      console.log("uuu", userName);

      socket.emit("login", userName, (res) => {
        console.log("Res", res);
        if (res?.ok) {
          setUser(res.data);

          // 사용자 이름을 성공적으로 설정했을 때만 소켓에 join
          socket.emit("join", userName);
        }
      });

      // 'message' 이벤트 리스너 등록
      socket.on("message", (message) => {
        setMessageList((prevState) => prevState.concat(message));
      });
    };

    // 컴포넌트가 마운트될 때 한 번만 실행
    askUserName();

    // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
    return () => {
      socket.off("message");
    };
  }, []); // 빈 배열을 전달하여 마운트 시에만 실행

  // 메시지 보내는 부분
  const sendMessage = (event) => {
    // 화면 재라우팅 되는 것을 막음.
    event.preventDefault();
    socket.emit("sendMessage", message, (res) => {
      console.log("sendMessage res", res);
    });

    setMessage('');
  };

  // InputField의 위치test 조정
  // useEffect(() => {
  //   if (inputFieldRef.current) {
  //     const inputFieldHeight = inputFieldRef.current.offsetHeight;
  //     const messageContainer = document.querySelector(".message-container");
  //     // messageContainer.style.marginBottom = `${inputFieldHeight}px`;test
  //   }
  // }, [inputFieldRef]);



  // 더미 데이터 업데이트 예시 (5초마다 랜덤하게 변경)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const randomTitle = `Vote Title ${Math.floor(Math.random() * 100)}`;
  //     const randomImage = `/images/image${Math.floor(Math.random() * 5)}.png`;
  //     setVoteData({ title: randomTitle, image: randomImage });
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="containerWrap">
      <div className="VoteFields">
        <VoteField />
      </div>
      <div className="TalkDetail">
        <ChatRoomTitle/>
        <MessageContainer messageList={messageList} user={user} />
        {/* <div ref={inputFieldRef}> */}
        <div>
          <InputField
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
