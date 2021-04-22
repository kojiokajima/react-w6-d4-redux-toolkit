import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { MicNone } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FlipMove from "react-flip-move";

import { selectChatId, selectChatName } from "../features/chatSlice";
import { selectUser } from "../features/userSlice";
import firebase, { db } from "../firbase/firebase";
import Message from "./Message";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;
  height: 100vh;
  background-color: white;
`;

const ChatHeaderContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  background-color: #f5f5f5;
`;

const ChatHeader = styled.div`
  font-weight: 500;
  color: gray;
`;

const ChatName = styled.span`
  color: black;
`;

const ChatMessagesContainer = styled.div`
  flex: 1;
  overlow: scroll;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid lightgray;
  background-color: #f5f5f5;
`;

const ChatForm = styled.form`
  flex: 1;
`;

const ChatInput = styled.input`
  width: 98%;
  outline-width: 0;
  border: 1px solid lightgray;
  border-radius: 999px;
  padding: 5px;
`;

const ChatSubmitButton = styled.button`
  display: none;
`;

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <ChatContainer>
      <ChatHeaderContainer>
        <ChatHeader>
          Room: <ChatName>{chatName}</ChatName>
        </ChatHeader>
      </ChatHeaderContainer>
      <ChatMessagesContainer>
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </ChatMessagesContainer>
      <ChatInputContainer>
        <ChatForm>
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
            disabled={!chatId}
          />
          <ChatSubmitButton onClick={sendMessage}>
            Send Message
          </ChatSubmitButton>
        </ChatForm>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default Chat;
