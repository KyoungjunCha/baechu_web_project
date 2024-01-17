import React, { useEffect, useRef } from "react";
import "./MessageContainer.css";

const MessageContainer = ({ messageList, user }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때만 참조
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <div ref={containerRef} className="message-container">
      {messageList.map((message) => (
        <div key={message._id}>
          {message.user.name === "system" ? (
            <div className="system-message-container">
              <p className="system-message">{message.chat}</p>
            </div>
          ) : (
            <div
              className={
                message.user.name === user.name
                  ? "my-message-container"
                  : "your-message-container"
              }
              key={message._id}
            >
              {message.user.name !== user.name && (
                <>
                  <div className="sender-info">
                    <img
                      src="/profile.jpeg"
                      className="profile-image"
                      alt="Profile"
                    />
                    <div className="sender-name">{message.user.name}</div>
                  </div>
                </>
              )}
              <div className={message.user.name === user.name ? "my-message" : "your-message"}>
                {message.chat}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
