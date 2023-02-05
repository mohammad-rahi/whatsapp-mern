import { BeforeActiveChat, Chat, Sidebar } from "../components";
import React, { useEffect, useState } from "react";

import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

const Index = () => {
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState(null);

  return (
    <div
      className="bg-dark1"
      onClick={() => showSidebarMenu && setShowSidebarMenu(false)}
    >
      <div className="flex max-w-[1600px] mx-auto overflow-hidden h-screen p-[20px]">
        <Sidebar
          showSidebarMenu={showSidebarMenu}
          setShowSidebarMenu={setShowSidebarMenu}
          setActiveChatUser={setActiveChatUser}
          activeChatUser={activeChatUser}
        />
        {activeChatUser && activeChatUser.uid ? (
          <Chat activeChatUser={activeChatUser} />
        ) : (
          <BeforeActiveChat />
        )}
      </div>
    </div>
  );
};

export default Index;
