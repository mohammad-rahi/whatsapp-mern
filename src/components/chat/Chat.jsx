import { MdKeyboardVoice, MdSearch } from "react-icons/md";
import React, { useEffect, useState } from "react";

import { BsEmojiLaughing } from "react-icons/bs";
import { CHAT_MORE } from "../../lib/chatMore";
import ChatCard from "./ChatCard";
import { FiMoreVertical } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";
import { ImAttachment } from "react-icons/im";
import Pusher from "pusher-js";
import axios from "../../axios";
import { useAuth } from "../../context/AuthContext";

const Chat = ({ activeChatUser, showChatMore, setShowChatMore }) => {
  const { user, mongoUser } = useAuth();
  const [text, setText] = useState("");

  const [messages, setMessages] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    if (activeChatUser) {
      axios
        .get(`/messages/sync?receiverUid=${activeChatUser.uid}`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((err) => console.error(err));
    }
  }, [activeChatUser]);

  useEffect(() => {
    const pusher = new Pusher("3981867da7b75ce73d65", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    document.querySelector(".chat_body").scrollTop =
      document.querySelector(".chat_body").scrollHeight + 500;

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  const handleMessage = (e) => {
    e.preventDefault();

    if (text.trim()) {
      axios
        .post("messages/new", {
          massage: text,
          senderUid: user.uid,
          receiverUid: activeChatUser.uid,
          timestamp: new Date(),
        })
        .then((response) => {
          setText("");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="flex-[.7] flex">
      <div
        className={`${
          showSearch || showContactInfo
            ? "border-gray1Light"
            : "border-transparent"
        } border-r flex-1 transition-all duration-300`}
      >
        <div className="bg-dark2 p-[10px] px-3 flex items-center justify-between gap-4 select-none flex-[.05]">
          <div
            className="flex items-center gap-4 cursor-pointer w-full"
            onClick={() => {
              setShowContactInfo(true);
              setShowSearch(false);
            }}
          >
            <figure className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
              <img
                src={activeChatUser.photoURL}
                alt={
                  activeChatUser.uid === user.uid
                    ? "Myself"
                    : activeChatUser.displayName
                }
                className="w-full h-auto"
              />
            </figure>

            <div className="text-gray1">
              <p className="font-medium text-lg text-gray3">
                {activeChatUser.uid === user.uid
                  ? "Myself"
                  : activeChatUser.displayName}
              </p>
              {/* <p className="leading-none">
              <small>
                <em>You deleted this message</em>
              </small>
            </p> */}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-400 sidebar_right_icon active:bg-gray1Light`}
              onClick={() => {
                setShowSearch(true);
                setShowContactInfo(false);
              }}
            >
              <MdSearch className="w-6 h-6 text-gray1" />
            </div>

            <div className="relative rounded-full">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-400 sidebar_right_icon active:bg-gray1Light ${
                  showChatMore && "bg-gray1Light"
                }`}
                onClick={() => setShowChatMore(true)}
              >
                <FiMoreVertical className="w-6 h-6 text-gray1" />
              </div>

              <div
                className={`bg-dark3 text-gray-300 text-[15px] absolute z-[100] w-[230px] sidebar_menu rounded-[3px] py-[10px] top-[110%] right-1 transition-all duration-300 origin-top-right whitespace-nowrap  ${
                  showChatMore ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
              >
                <ul>
                  {CHAT_MORE.map((menu, i) => (
                    <li
                      key={i}
                      className={`py-[9px] px-6 hover:bg-dark1 transition-all duration-100 cursor-pointer`}
                    >
                      {menu}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="chat_body_wrapper flex-[.9] overflow-hidden relative">
          <div className="h-[78.9vh] overflow-y-auto overflow-x-hidden py-3 px-16 chat_body">
            {messages.length > 0 &&
              messages.map((message, index) => (
                <ChatCard
                  key={index}
                  text={message.massage}
                  className={
                    message.senderUid === user.uid ? "chat_receiver" : null
                  }
                />
              ))}
          </div>
        </div>

        <div className="bg-dark2 p-[10px] px-3 flex-[.05] flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-400 sidebar_right_icon active:bg-gray1Light">
              <BsEmojiLaughing className="w-6 h-6 text-gray1" />
            </div>

            <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-400 sidebar_right_icon active:bg-gray1Light">
              <ImAttachment className="w-6 h-6 text-gray1" />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <form
              className="w-full h-10 bg-dark4 rounded-lg overflow-hidden"
              onSubmit={handleMessage}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-transparent w-full h-full px-3 text-gray3 placeholder:text-gray1 border-none outline-none placeholder:select-none"
                placeholder="Type a message"
              />
            </form>

            <div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-400 sidebar_right_icon active:bg-gray1Light">
                <MdKeyboardVoice className="w-6 h-6 text-gray1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex whitespace-nowrap">
        <div
          className={`h-screen w-[470px] bg-dark1 transition-all duration-150 ${
            !showContactInfo ? "mr-[-470px] opacity-0" : "z-10"
          }`}
        >
          <div className="bg-dark2 p-[10px] px-6 flex items-center gap-8 select-none h-[60px]">
            <HiXMark
              className="text-gray-300 text-2xl cursor-pointer"
              onClick={() => {
                setShowContactInfo(false);
              }}
            />

            <p className="text-white">Contact info</p>
          </div>

          <div className="flex items-center justify-center p-7">
            <div className="relative cursor-pointer transition-all duration-700 delay-300">
              <figure className="w-[200px] h-[200px] rounded-full overflow-hidden cursor-pointer">
                <img
                  id="profile_pic"
                  src={mongoUser.photoURL}
                  alt={mongoUser.displayName}
                  className="w-full h-auto"
                />
              </figure>
            </div>
          </div>
        </div>

        <div
          className={`h-screen w-[470px] bg-dark1 transition-all duration-150 ${
            !showSearch && "mr-[-470px] opacity-0"
          }`}
        >
          <div className="bg-dark2 p-[10px] px-6 flex items-center gap-8 select-none h-[60px]">
            <HiXMark
              className="text-gray-300 text-2xl cursor-pointer"
              onClick={() => {
                setShowSearch(false);
              }}
            />

            <p className="text-white">Search Messages</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
