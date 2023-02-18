import React, { useEffect, useState } from "react";

import { RxCaretDown } from "react-icons/rx";
import { USER_MORE } from "../../lib/UserMore";
import axios from "../../axios";
import { useAuth } from "../../context/AuthContext";

const SidebarCard = ({
  isLastCard,
  userData,
  setActiveChatUser,
  activeChatUser,
  showMoreMenu,
  setShowMoreMenu,
}) => {
  const { user } = useAuth();
  const [lastMessage, setLastMessage] = useState({});

  const handleUserCardClick = (e) => {
    e.preventDefault();

    let userMore = document.querySelector(`.user_more`);

    var x = e.clientX - 10; //x position within the element.
    var y = e.clientY - 10; //y position within the element.

    userMore.setAttribute("style", `left: ${x}px; top: ${y}px`);

    setShowMoreMenu(true);
  };

  useEffect(() => {
    if (userData) {
      axios
        .get(`/messages/sync/user?uid=${userData.uid}`)
        .then((response) => {
          setLastMessage(response.data[response.data.length - 1]);
        })
        .catch((err) => console.error(err));
    }
  }, [userData]);

  return (
    <>
      <div
        className={`bg-dark3 text-gray-300 text-[15px] absolute z-10 w-[195px] sidebar_menu rounded-[3px] py-[10px] transition-all duration-300 origin-top-left user_more user_more ${
          showMoreMenu ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <ul>
          {USER_MORE.map((menu, i) => (
            <li
              key={i}
              className="py-[9px] px-6 hover:bg-dark1 transition-all duration-100 cursor-pointer"
            >
              {menu}
            </li>
          ))}
        </ul>
      </div>

      <div
        id={`sidebar_card_${userData.uid}`}
        onContextMenu={handleUserCardClick}
        className={`flex items-center gap-4 cursor-pointer transition duration-100 pl-4 sidebar_card ${
          activeChatUser && activeChatUser.uid === userData.uid
            ? "bg-dark4"
            : "hover:bg-dark3"
        }`}
        onClick={() => setActiveChatUser(userData)}
      >
        <figure className="w-[52px] h-[52px] flex items-center justify-center">
          <img
            src={userData.photoURL}
            alt={userData.displayName}
            className="max-w-full h-auto rounded-full"
          />
        </figure>

        <div
          className={`flex items-center justify-between w-full pr-3 py-3 gap-2 ${
            !isLastCard && "border-b border-gray1Light"
          }`}
        >
          <div className="text-gray1 w-full">
            <p
              className="text-lg text-gray3"
              title={
                userData.uid === user.uid ? "Myself" : userData.displayName
              }
            >
              {userData.uid === user.uid ? "Myself" : userData.displayName}
            </p>
            <p className="leading-none" title="You deleted this message">
              <small>{lastMessage && lastMessage.massage}</small>
            </p>
          </div>
          <div className="self-start relative">
            <p className="text-gray1">
              <small>
                {lastMessage &&
                  [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ][new Date(lastMessage.timestamp).getDay()]}
              </small>
            </p>
            <div
              className="absolute flex items-center justify-end text-3xl sidbar_card_caret_icon transition-all duration-100"
              onClick={handleUserCardClick}
            >
              <svg viewBox="0 0 19 20" height="20" width="20">
                <path
                  fill="#8696a0"
                  d="M3.8,6.7l5.7,5.7l5.7-5.7l1.6,1.6l-7.3,7.2L2.2,8.3L3.8,6.7z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarCard;
