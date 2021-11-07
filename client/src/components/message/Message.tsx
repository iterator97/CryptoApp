import React from "react";
import "./Message.css";

interface MessageProps {
  firstName?: string;
  lastName?: string;
  content?: string;
}

const Message = (props: MessageProps) => {
  return (
    <div className="hhhh">
      <div className="message-author">
        <div className="message-first-name">{props?.firstName}</div>
        <div className="message-last-name">{props?.lastName}:</div>
      </div>
      <div>{props?.content}</div>
    </div>
  );
};

export default Message;
