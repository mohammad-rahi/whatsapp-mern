import React from "react";

const ChatCard = ({ className, text }) => {
  return (
    <div className={`chat_card_wrapper flex my-[10px] ${className}`}>
      <p
        className={`chat_card text-gray3 bg-dark2 w-fit text-sm px-[10px] py-[6px] rounded-lg relative max-w-[65%]`}
      >
        {text}
      </p>
    </div>
  );
};

export default ChatCard;
