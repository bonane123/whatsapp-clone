import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsMic } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { MdAttachFile, MdInsertEmoticon } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import "./Chat.css";
function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    if (roomId) {
      const docRef = doc(db, "rooms", roomId);
      getDoc(docRef).then((doc) => setRoomName(doc.data().name));
      const messageRef = collection(db, `rooms/${roomId}/messages`);

      getDocs(messageRef).then((snapshot) =>
        // @ts-ignore
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [roomId, messages]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    addDoc(collection(db, `rooms/${roomId}/messages`), {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <AiOutlineSearch />
          </IconButton>
          <IconButton>
            <MdAttachFile />
          </IconButton>
          <IconButton>
            <FiMoreVertical />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            } `}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <MdInsertEmoticon className="chat__icon" />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <BsMic className="chat__icon" />
      </div>
    </div>
  );
}

export default Chat;
