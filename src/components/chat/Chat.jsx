import React, { useEffect, useState } from "react";

import { CHAT_MORE } from "../../lib/chatMore";
import ChatCard from "./ChatCard";
import { HiXMark } from "react-icons/hi2";
import Pusher from "pusher-js";
import axios from "../../axios";
import { useAuth } from "../../context/AuthContext";

const Chat = ({
  activeChatUser,
  showChatMore,
  setShowChatMore,
  showAttachment,
  setShowAttachment,
}) => {
  const { user, mongoUser } = useAuth();
  const [text, setText] = useState("");

  const [messages, setMessages] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    if (activeChatUser) {
      axios
        .get(
          `/messages/sync?receiverUid=${activeChatUser.uid}&senderUid=${mongoUser.uid}`
        )
        .then((response) => {
          setMessages(response.data);
        })
        .catch((err) => console.error(err));

      document.querySelector("#typeMessage").focus();
    }
  }, [activeChatUser, mongoUser]);

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
              <svg viewBox="0 0 24 24" height="24" width="24">
                <path
                  fill="#8696a0"
                  d="M15.9,14.3H15L14.7,14c1-1.1,1.6-2.7,1.6-4.3c0-3.7-3-6.7-6.7-6.7S3,6,3,9.7 s3,6.7,6.7,6.7c1.6,0,3.2-0.6,4.3-1.6l0.3,0.3v0.8l5.1,5.1l1.5-1.5L15.9,14.3z M9.7,14.3c-2.6,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6 s4.6,2.1,4.6,4.6S12.3,14.3,9.7,14.3z"
                ></path>
              </svg>
            </div>

            <div className="relative rounded-full">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-400 sidebar_right_icon active:bg-gray1Light ${
                  showChatMore && "bg-gray1Light"
                }`}
                onClick={() => setShowChatMore(true)}
              >
                <svg viewBox="0 0 24 24" height="24" width="24">
                  <path
                    fill="#8696a0"
                    d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
                  ></path>
                </svg>
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
                      onClick={() => {
                        if (menu === "Contact info") {
                          setShowContactInfo(true);
                          setShowSearch(false);
                        }
                        return;
                      }}
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
                <ChatCard key={index} message={message} />
              ))}
          </div>
        </div>

        <div className="bg-dark2 p-[10px] px-3 flex-[.05] flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-400 sidebar_right_icon active:bg-gray1Light">
              <svg viewBox="0 0 24 24" height="24" width="24">
                <path
                  fill="#8696a0"
                  d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"
                ></path>
              </svg>
            </div>

            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-400 sidebar_right_icon active:bg-gray1Light ${
                  showAttachment && "bg-gray1Light"
                }`}
                onClick={() => setShowAttachment(true)}
              >
                <svg viewBox="0 0 24 24" height="24" width="24">
                  <path
                    fill="#8696a0"
                    d="M1.816,15.556v0.002c0,1.502,0.584,2.912,1.646,3.972s2.472,1.647,3.974,1.647 c1.501,0,2.91-0.584,3.972-1.645l9.547-9.548c0.769-0.768,1.147-1.767,1.058-2.817c-0.079-0.968-0.548-1.927-1.319-2.698 c-1.594-1.592-4.068-1.711-5.517-0.262l-7.916,7.915c-0.881,0.881-0.792,2.25,0.214,3.261c0.959,0.958,2.423,1.053,3.263,0.215 c0,0,3.817-3.818,5.511-5.512c0.28-0.28,0.267-0.722,0.053-0.936c-0.08-0.08-0.164-0.164-0.244-0.244 c-0.191-0.191-0.567-0.349-0.957,0.04c-1.699,1.699-5.506,5.506-5.506,5.506c-0.18,0.18-0.635,0.127-0.976-0.214 c-0.098-0.097-0.576-0.613-0.213-0.973l7.915-7.917c0.818-0.817,2.267-0.699,3.23,0.262c0.5,0.501,0.802,1.1,0.849,1.685 c0.051,0.573-0.156,1.111-0.589,1.543l-9.547,9.549c-0.756,0.757-1.761,1.171-2.829,1.171c-1.07,0-2.074-0.417-2.83-1.173 c-0.755-0.755-1.172-1.759-1.172-2.828l0,0c0-1.071,0.415-2.076,1.172-2.83c0,0,5.322-5.324,7.209-7.211 c0.157-0.157,0.264-0.579,0.028-0.814c-0.137-0.137-0.21-0.21-0.342-0.342c-0.2-0.2-0.553-0.263-0.834,0.018 c-1.895,1.895-7.205,7.207-7.205,7.207C2.4,12.645,1.816,14.056,1.816,15.556z"
                  ></path>
                </svg>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 bottom-[150%]">
                <ul className="flex flex-col-reverse gap-4 attachment_wrapper">
                  <li
                    className={`bg-[#AC44CF] w-[53px] h-[53px] rounded-full transition-all duration-300 ${
                      showAttachment
                        ? "scale-100 opacity-100 origin-top"
                        : "scale-0 opacity-0 origin-bottom"
                    }`}
                  >
                    <span>
                      <svg viewBox="0 0 53 53" height="53" width="53">
                        <g>
                          <defs>
                            <circle
                              id="image-SVGID_1_"
                              cx="26.5"
                              cy="26.5"
                              r="25.5"
                              fill="#0063CB"
                            ></circle>
                          </defs>
                          <clipPath id="image-SVGID_2_">
                            <use overflow="visible"></use>
                          </clipPath>
                          <g clip-path="url(#image-SVGID_2_)">
                            <path
                              fill="#AC44CF"
                              d="M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z"
                            ></path>
                            <path
                              fill="#BF59CF"
                              d="M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z"
                            ></path>
                            <rect
                              x="17"
                              y="24.5"
                              fill="#AC44CF"
                              width="18"
                              height="9"
                            ></rect>
                          </g>
                        </g>
                        <g fill="#F5F5F5">
                          <path
                            id="svg-image"
                            d="M18.318 18.25 34.682 18.25C35.545 18.25 36.409 19.077 36.493 19.946L36.5 20.083 36.5 32.917C36.5 33.788 35.68 34.658 34.818 34.743L34.682 34.75 18.318 34.75C17.368 34.75 16.582 34.005 16.506 33.066L16.5 32.917 16.5 20.083C16.5 19.213 17.32 18.342 18.182 18.257L18.318 18.25 34.682 18.25ZM23.399 26.47 19.618 31.514C19.349 31.869 19.566 32.25 20.008 32.25L32.963 32.25C33.405 32.239 33.664 31.848 33.384 31.492L30.702 28.043C30.486 27.774 30.077 27.763 29.861 28.032L27.599 30.759 24.26 26.459C24.045 26.179 23.614 26.179 23.399 26.47ZM31.75 21.25C30.784 21.25 30 22.034 30 23 30 23.966 30.784 24.75 31.75 24.75 32.716 24.75 33.5 23.966 33.5 23 33.5 22.034 32.716 21.25 31.75 21.25Z"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </li>
                  <li
                    className={`transition-all delay-[25ms] duration-300 ${
                      showAttachment
                        ? "scale-100 opacity-100 origin-top"
                        : "scale-0 opacity-0 origin-bottom"
                    }`}
                  >
                    <span>
                      <svg
                        viewBox="0 0 53 53"
                        height="53"
                        width="53"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_850:74884)">
                          <circle
                            cx="26.5"
                            cy="26.5"
                            r="26.5"
                            fill="#0063CB"
                          ></circle>
                          <path
                            d="M53 26.5C53 41.1356 41.1355 53 26.5 53C11.8645 53 0 41.1356 0 26.5L53 26.5Z"
                            fill="#0070E6"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M36.0017 22.17V26.4891C35.762 26.8114 35.3783 27.0202 34.9458 27.0202H33.1413C29.7615 27.0202 27.0216 29.76 27.0216 33.1398V34.9443C27.0216 35.3777 26.812 35.7621 26.4886 36.0017H22.17C19.3147 36.0017 17 33.687 17 30.8317V22.17C17 19.3147 19.3147 17 22.17 17H30.8317C33.687 17 36.0017 19.3147 36.0017 22.17ZM30.5216 25.5L31.4591 23.4375L33.5216 22.5L31.4591 21.5625L30.5216 19.5L29.5841 21.5625L27.5216 22.5L29.5841 23.4375L30.5216 25.5ZM23.5 22.5L24.9062 25.5938L28 27L24.9062 28.4062L23.5 31.5L22.0938 28.4062L19 27L22.0938 25.5938L23.5 22.5Z"
                            fill="#F7F7F7"
                          ></path>
                          <path
                            d="M34.9458 28.5202C35.2984 28.5202 35.6358 28.4554 35.9469 28.337C35.8132 29.1226 35.439 29.8536 34.868 30.4246L30.4246 34.868C29.8539 35.4388 29.1232 35.8129 28.338 35.9467C28.4566 35.6353 28.5216 35.2974 28.5216 34.9443V33.1398C28.5216 30.5885 30.5899 28.5202 33.1413 28.5202H34.9458Z"
                            fill="#F7F7F7"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_850:74884">
                            <rect width="53" height="53" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </li>
                  <li
                    className={`bg-[#D3396D] w-[53px] h-[53px] rounded-full transition-all delay-[50ms] duration-300 ${
                      showAttachment
                        ? "scale-100 opacity-100 origin-top"
                        : "scale-0 opacity-0 origin-bottom"
                    }`}
                  >
                    <span>
                      <svg viewBox="0 0 53 53" height="53" width="53">
                        <g>
                          <defs>
                            <circle
                              id="camera-SVGID_1_"
                              cx="26.5"
                              cy="26.5"
                              r="25.5"
                            ></circle>
                          </defs>
                          <clipPath id="camera-SVGID_2_">
                            <use overflow="visible"></use>
                          </clipPath>
                          <g clip-path="url(#camera-SVGID_2_)">
                            <path
                              fill="#D3396D"
                              d="M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z"
                            ></path>
                            <path
                              fill="#EC407A"
                              d="M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z"
                            ></path>
                            <rect
                              x="17"
                              y="24.5"
                              fill="#D3396D"
                              width="15"
                              height="9"
                            ></rect>
                          </g>
                        </g>
                        <g fill="#F5F5F5">
                          <path
                            id="svg-camera"
                            d="M27.795 17C28.742 17 29.634 17.447 30.2 18.206L30.5 18.609C31.066 19.368 31.958 19.815 32.905 19.815L34.2 19.815C35.746 19.815 37 21.068 37 22.615L37 32C37 34.209 35.209 36 33 36L20 36C17.791 36 16 34.209 16 32L16 22.615C16 21.068 17.254 19.815 18.8 19.815L20.095 19.815C21.042 19.815 21.934 19.368 22.5 18.609L22.8 18.206C23.366 17.447 24.258 17 25.205 17L27.795 17ZM26.5 22.25C23.601 22.25 21.25 24.601 21.25 27.5 21.25 30.399 23.601 32.75 26.5 32.75 29.399 32.75 31.75 30.399 31.75 27.5 31.75 24.601 29.399 22.25 26.5 22.25ZM26.5 24C28.433 24 30 25.567 30 27.5 30 29.433 28.433 31 26.5 31 24.567 31 23 29.433 23 27.5 23 25.567 24.567 24 26.5 24Z"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </li>
                  <li
                    className={`bg-[#5157AE] w-[53px] h-[53px] rounded-full transition-all delay-[75ms] duration-300 ${
                      showAttachment
                        ? "scale-100 opacity-100 origin-top"
                        : "scale-0 opacity-0 origin-bottom"
                    }`}
                  >
                    <span>
                      <svg viewBox="0 0 53 53" height="53" width="53">
                        <g>
                          <defs>
                            <circle
                              id="document-SVGID_1_"
                              cx="26.5"
                              cy="26.5"
                              r="25.5"
                            ></circle>
                          </defs>
                          <clipPath id="document-SVGID_2_">
                            <use overflow="visible"></use>
                          </clipPath>
                          <g clip-path="url(#document-SVGID_2_)">
                            <path
                              fill="#5157AE"
                              d="M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z"
                            ></path>
                            <path
                              fill="#5F66CD"
                              d="M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z"
                            ></path>
                          </g>
                        </g>
                        <g fill="#F5F5F5">
                          <path
                            id="svg-document"
                            d="M29.09 17.09c-.38-.38-.89-.59-1.42-.59H20.5c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H32.5c1.1 0 2-.9 2-2V23.33c0-.53-.21-1.04-.59-1.41l-4.82-4.83zM27.5 22.5V18L33 23.5H28.5c-.55 0-1-.45-1-1z"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </li>
                  <li
                    className={`bg-[#0795DC] w-[53px] h-[53px] rounded-full transition-all delay-100 duration-300 ${
                      showAttachment
                        ? "scale-100 opacity-100 origin-top"
                        : "scale-0 opacity-0 origin-bottom"
                    }`}
                  >
                    <span>
                      <svg viewBox="0 0 53 53" height="53" width="53">
                        <g>
                          <defs>
                            <circle
                              id="contact-SVGID_1_"
                              cx="26.5"
                              cy="26.5"
                              r="25.5"
                            ></circle>
                          </defs>
                          <clipPath id="contact-SVGID_2_">
                            <use overflow="visible"></use>
                          </clipPath>
                          <g clip-path="url(#contact-SVGID_2_)">
                            <g>
                              <path
                                fill="#0795DC"
                                d="M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z"
                              ></path>
                              <path
                                fill="#0EABF4"
                                d="M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z"
                              ></path>
                            </g>
                          </g>
                        </g>
                        <g fill="#F5F5F5">
                          <path
                            id="svg-contact"
                            d="M26.5 26.5C28.986 26.5 31 24.486 31 22 31 19.514 28.986 17.5 26.5 17.5 24.014 17.5 22 19.514 22 22 22 24.486 24.014 26.5 26.5 26.5ZM26.5 28.75C23.496 28.75 17.5 30.258 17.5 33.25L17.5 34.375C17.5 34.994 18.006 35.5 18.625 35.5L34.375 35.5C34.994 35.5 35.5 34.994 35.5 34.375L35.5 33.25C35.5 30.258 29.504 28.75 26.5 28.75Z"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </li>
                  <li
                    className={`transition-all delay-250 duration-300 ${
                      showAttachment
                        ? "scale-100 opacity-100 origin-top"
                        : "scale-0 opacity-0 origin-bottom"
                    }`}
                  >
                    <span>
                      <svg
                        viewBox="0 0 53 53"
                        height="53"
                        width="53"
                        fill="none"
                      >
                        <circle
                          cx="26.5"
                          cy="26.5"
                          r="26.5"
                          fill="#02A698"
                        ></circle>
                        <path
                          opacity="0.15"
                          d="M26.5 0C11.8645 0 0 11.8645 0 26.5H53C53 11.8645 41.1355 0 26.5 0Z"
                          fill="#111B21"
                        ></path>
                        <rect
                          x="15.7051"
                          y="26.6035"
                          width="5.94055"
                          height="9.50487"
                          rx="1.21053"
                          fill="white"
                        ></rect>
                        <rect
                          x="24.0215"
                          y="14.7227"
                          width="5.94055"
                          height="21.386"
                          rx="1.21053"
                          fill="white"
                        ></rect>
                        <rect
                          x="32.3379"
                          y="21.8496"
                          width="5.94055"
                          height="14.2573"
                          rx="1.21053"
                          fill="white"
                        ></rect>
                      </svg>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full">
            <form className="flex items-center gap-2" onSubmit={handleMessage}>
              <div className="w-full h-10 bg-dark4 rounded-lg overflow-hidden">
                <input
                  type="text"
                  autoComplete="off"
                  value={text}
                  id="typeMessage"
                  onChange={(e) => setText(e.target.value)}
                  className="bg-transparent w-full h-full px-3 text-gray3 placeholder:text-gray-400 border-none outline-none placeholder:select-none text-sm"
                  placeholder="Type a message"
                />
              </div>

              <div>
                {text.trim() ? (
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-400 sidebar_right_icon active:bg-gray1Light"
                    type="submit"
                  >
                    <svg viewBox="0 0 24 24" height="24" width="24">
                      <path
                        fill="#8696a0"
                        d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                      ></path>
                    </svg>
                  </button>
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-400 sidebar_right_icon active:bg-gray1Light">
                    <svg viewBox="0 0 24 24" height="24" width="24">
                      <path
                        fill="#8696a0"
                        d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
            </form>
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
            !showSearch ? "mr-[-470px] opacity-0" : "z-10"
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
