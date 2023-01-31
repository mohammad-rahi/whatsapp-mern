import { MdKeyboardVoice, MdSearch } from "react-icons/md";
import React, { useEffect, useState } from "react";

import { BsEmojiLaughing } from "react-icons/bs";
import ChatCard from "./ChatCard";
import { FiMoreVertical } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import axios from "../../axios";

const Chat = ({ messages }) => {
  const [text, setText] = useState("");

  const handleMessage = (e) => {
    e.preventDefault();

    if (text.trim()) {
      axios
        .post("messages/new", {
          massage: text,
          name: "Mohammad Rahi",
          timestamp: new Date(),
          received: "Akhi",
        })
        .then((response) => {
          setText("");
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    document.querySelector(".chat_body").scrollTop =
      document.querySelector(".chat_body").scrollHeight + 500;
  }, [messages]);

  return (
    <div className="flex-[.7] flex flex-col">
      <div className="bg-dark2 p-[10px] px-3 flex items-center justify-between gap-4 select-none flex-[.05]">
        <div className="flex items-center gap-4 cursor-pointer w-full">
          <figure className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
            <img
              src="/assets/images/mohammad_rahi.jpg"
              alt="Mohammad Rahi"
              className="w-full h-auto"
            />
          </figure>

          <div className="text-gray1">
            <p className="font-medium text-lg text-gray3">Mohammad Rahi</p>
            {/* <p className="leading-none">
              <small>
                <em>You deleted this message</em>
              </small>
            </p> */}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 sidebar_right_icon"
            onMouseDown={(e) => e.currentTarget.classList.add("bg-gray1Light")}
          >
            <MdSearch className="w-6 h-6 text-gray1" />
          </div>

          <div
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 sidebar_right_icon"
            onMouseDown={(e) => e.currentTarget.classList.add("bg-gray1Light")}
          >
            <FiMoreVertical className="w-6 h-6 text-gray1" />
          </div>
        </div>
      </div>

      <div className="chat_body_wrapper flex-[.9] overflow-hidden relative">
        <div className="h-[78.9vh] overflow-y-auto overflow-x-hidden py-3 px-16 chat_body">
          {messages.map((message, index) => (
            <ChatCard
              key={index}
              text={message.massage}
              className={message.received === "Rahi" ? "chat_receiver" : null}
            />
          ))}
        </div>
      </div>

      <div className=" bg-dark2 p-[10px] px-3 flex-[.05] flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 sidebar_right_icon"
            onMouseDown={(e) => e.currentTarget.classList.add("bg-gray1Light")}
          >
            <BsEmojiLaughing className="w-6 h-6 text-gray1" />
          </div>

          <div
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 sidebar_right_icon"
            onMouseDown={(e) => e.currentTarget.classList.add("bg-gray1Light")}
          >
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
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 sidebar_right_icon"
              onMouseDown={(e) =>
                e.currentTarget.classList.add("bg-gray1Light")
              }
            >
              <MdKeyboardVoice className="w-6 h-6 text-gray1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
