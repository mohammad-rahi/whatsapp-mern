import React from "react";

const ChatCard = ({ className, text }) => {
  return (
    <div className={`chat_card_wrapper flex my-[10px] ${className}`}>
      <p
        className={`chat_card text-gray3 bg-dark2 w-fit text-sm px-[10px] py-[6px] rounded-[0_0.5rem_0.5rem_0.5rem] relative max-w-[65%] inline-block`}
      >
        {text}
      </p>
    </div>
  );
};

export default ChatCard;
