import React from "react";
import { RxCaretDown } from "react-icons/rx";
import { useAuth } from "../../context/AuthContext";

const SidebarCard = ({
  isLastCard,
  userData,
  setActiveChatUser,
  activeChatUser,
}) => {
  const { user } = useAuth();

  return (
    <div
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
          alt={user.displayName}
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
            title={userData.uid === user.uid ? "Myself" : userData.displayName}
          >
            {userData.uid === user.uid ? "Myself" : userData.displayName}
          </p>
          <p className="leading-none" title="You deleted this message">
            <small>
              <em>You deleted this message</em>
            </small>
          </p>
        </div>

        <div className="self-start relative">
          <p className="text-gray1">
            <small>Friday</small>
          </p>
          <div className="absolute flex items-center justify-end text-3xl sidbar_card_caret_icon transition-all duration-100">
            <RxCaretDown className="text-gray1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarCard;
