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
  const [showAttachment, setShowAttachment] = useState(false);

  return (
    <div
      className="bg-dark1"
      onContextMenu={() => {
        showSidebarMenu && setShowSidebarMenu(false);
        showProfileClickMenu && setShowProfileClickMenu(false);
        showMoreMenu && setShowMoreMenu(false);
        showChatMore && setShowChatMore(false);
        showAttachment && setShowAttachment(false);
      }}
      onClick={() => {
        showSidebarMenu && setShowSidebarMenu(false);
        showProfileClickMenu && setShowProfileClickMenu(false);
        showMoreMenu && setShowMoreMenu(false);
        showChatMore && setShowChatMore(false);
        showAttachment && setShowAttachment(false);
      }}
    >
      <div className="flex max-w-[1600px] mx-auto overflow-hidden h-screen p-[20px] whatsapp_home">
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
            showAttachment={showAttachment}
            setShowAttachment={setShowAttachment}
          />
        ) : (
          <BeforeActiveChat />
        )}
      </div>
    </div>
  );
};

export default Index;
