import { BeforeActiveChat, Chat, Sidebar } from "../components";
import React, { useEffect, useState } from "react";

import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

const Index = () => {
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);
  const [showProfileClickMenu, setShowProfileClickMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showChatMore, setShowChatMore] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState(null);

  return (
    <div
      className="bg-dark1"
      onContextMenu={() => {
        showSidebarMenu && setShowSidebarMenu(false);
        showProfileClickMenu && setShowProfileClickMenu(false);
        showMoreMenu && setShowMoreMenu(false);
        showChatMore && setShowChatMore(false);
      }}
      onClick={() => {
        showSidebarMenu && setShowSidebarMenu(false);
        showProfileClickMenu && setShowProfileClickMenu(false);
        showMoreMenu && setShowMoreMenu(false);
        showChatMore && setShowChatMore(false);
      }}
    >
      <div className="flex max-w-[1600px] mx-auto overflow-hidden h-screen p-[20px]">
        <Sidebar
          showSidebarMenu={showSidebarMenu}
          setShowSidebarMenu={setShowSidebarMenu}
          showProfileClickMenu={showProfileClickMenu}
          setShowProfileClickMenu={setShowProfileClickMenu}
          setActiveChatUser={setActiveChatUser}
          activeChatUser={activeChatUser}
          showMoreMenu={showMoreMenu}
          setShowMoreMenu={setShowMoreMenu}
        />
        {activeChatUser && activeChatUser.uid ? (
          <Chat
            activeChatUser={activeChatUser}
            setShowChatMore={setShowChatMore}
            showChatMore={showChatMore}
          />
        ) : (
          <BeforeActiveChat />
        )}
      </div>
    </div>
  );
};

export default Index;
