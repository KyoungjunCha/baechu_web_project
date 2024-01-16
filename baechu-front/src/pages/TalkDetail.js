import {useEffect, useState} from 'react'
import InputField from '../components/InputField/InputField';
import MessageContainer from '../components/MessageContainer/MessageContainer';
import socket from '../server';
import "../pages/TalkDetail";


export default function TalkDetail() {

    const [user,setUser] = useState(null);
    const [message,setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    console.log("messageList",messageList);
    useEffect(() => {
      socket.on('message',(message)=>{
        // console.log("res",message);
        //기존 메시지 저장 및 새로운 메시지 덧붙이기
        setMessageList((prevState)=>prevState.concat(message))
      })
      askUserName();
    }, []);
    
    const askUserName = () => {
      const userName = prompt("당신의 이름을 입력하세요.")
      console.log("uuu", userName);
  
      socket.emit("login",userName,(res)=>{
        console.log("Res",res);
        if(res?.ok){
          setUser(res.data);
        }
      });
    }
    
    //메시지 보내는 부분
    const sendMessage = (event) =>{
      //화면 재라우팅 되는 것을 막음.
      event.preventDefault();
      socket.emit("sendMessage",message,(res)=>{
        console.log("sendMessage res",res);
      })
    };


  return (
    <div>
      <div className="TalkDetail">
        <MessageContainer messageList={messageList} user={user}/>
        <InputField
          message={message} setMessage={setMessage} sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}
