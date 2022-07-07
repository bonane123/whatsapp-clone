import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsMic } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { MdAttachFile, MdInsertEmoticon } from "react-icons/md";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./Chat.css";
function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  useEffect(() => {
    if (roomId) {
      const docRef = doc(db, "rooms", roomId);
      getDoc(docRef).then((doc) => {
        setRoomName(doc.data().name);
      });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >> ", input);
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
        <p className={`chat__message ${true && "chat__receiver"} `}>
          <span className="chat__name">Yeobo</span>
          Hy Sweetie
          <span className="chat__timestamp">3:05pm</span>
        </p>
        <p className={`chat__message ${false && "chat__receiver"} `}>
          <span className="chat__name">nbus</span>
          Hy Darling
          <span className="chat__timestamp">3:06pm</span>
        </p>
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
