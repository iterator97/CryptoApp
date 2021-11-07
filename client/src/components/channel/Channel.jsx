import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getMessagesByChannel,
  sendMessage,
  userSelector,
} from "../../features/UserSlice";
import "./Channel.css";
import { Input, Button } from "antd";
import { io } from "socket.io-client";
import Message from "../message/Message";

const Channels = () => {
  const [message, setMessage] = useState("");
  const socket = useRef();
  const dispatch = useDispatch();
  const { channelName } = useParams();
  const { token, activeChannelMessages, id } = useSelector(userSelector);
  const userId = id;

  const onSendMessage = async () => {
    let input = {
      token: token,
      channel: channelName,
      message: message,
    };
    dispatch(sendMessage(input));
    await socket.current.emit("sendMessage", userId);
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      console.log("Active users:");
      console.log(users);
    });
  }, [id]);

  useEffect(() => {
    socket.current.on("getDataFromSrv", () => {
      dispatch(getMessagesByChannel({ name: channelName, token: token }));
    });
  }, [activeChannelMessages]);

  useEffect(() => {
    dispatch(getMessagesByChannel({ name: channelName, token: token }));
  }, []);

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="messages-container">
          {activeChannelMessages.map((m) => {
            return m.userId === userId ? (
              <div className="own-message">
                <Message
                  firstName={m.firstName}
                  lastName={m.lastName}
                  content={m.content}
                />
              </div>
            ) : (
              <div className="not-own-message">
                <Message
                  firstName={m.firstName}
                  lastName={m.lastName}
                  content={m.content}
                />
              </div>
            );
          })}
        </div>
        <div className="input-container">
          <div className="text-input">
            <Input
              allowClear={true}
              shape="round"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="add-message-btn">
              <Button type="primary" shape="round" onClick={onSendMessage}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
