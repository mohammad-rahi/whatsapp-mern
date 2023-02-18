import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

const ChatCard = ({ message }) => {
  const { user } = useAuth();

  const [isSender, setIsSender] = useState(false);

  useEffect(() => {
    if (message && message.senderUid === user.uid) {
      setIsSender(true);
    }
  }, [user, message]);

  return (
    <>
      {isSender ? (
        <div className={`chat_card_wrapper flex my-[10px] chat_sender`}>
          <p
            className={`chat_card text-gray3 bg-dark2 w-fit text-sm px-[10px] py-[6px] rounded-[0_0.5rem_0.5rem_0.5rem] relative max-w-[65%] inline-block`}
          >
            {message.massage}
          </p>
        </div>
      ) : (
        <div className={`chat_card_wrapper flex my-[10px] chat_sender`}>
          <p
            className={`chat_card text-gray3 bg-dark2 w-fit text-sm px-[10px] py-[6px] rounded-[0_0.5rem_0.5rem_0.5rem] relative max-w-[65%] inline-block`}
          >
            {message.massage}
          </p>
        </div>
      )}
    </>
  );
};

export default ChatCard;
