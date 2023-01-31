import { BsFillChatLeftTextFill, BsFilter } from "react-icons/bs";

import { FaUsers } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { HiLockClosed } from "react-icons/hi";
import { MdDonutLarge } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import React from "react";
import SidebarCard from "./SidebarCard";

const Sidebar = () => {
  return (
    <div className="flex-[.3] border-r border-gray1Light select-none">
      <div className="bg-dark2 flex items-center justify-between p-[10px] px-3">
        <figure className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
          <img
            src="/assets/images/mohammad_rahi.jpg"
            alt="Mohammad Rahi"
            className="w-full h-auto"
          />
        </figure>
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 sidebar_right_icon"
            onMouseDown={(e) => e.currentTarget.classList.add("bg-gray1Light")}
          >
            <FaUsers className="w-6 h-6 text-gray1" />
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 sidebar_right_icon"
            onMouseDown={(e) => e.currentTarget.classList.add("bg-gray1Light")}
          >
            <MdDonutLarge className="w-5 h-5 text-gray1" />
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 sidebar_right_icon"
            onMouseDown={(e) => e.currentTarget.classList.add("bg-gray1Light")}
          >
            <BsFillChatLeftTextFill className="w-5 h-5 text-gray1" />
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 sidebar_right_icon"
            onMouseDown={(e) => e.currentTarget.classList.add("bg-gray1Light")}
          >
            <FiMoreVertical className="w-6 h-6 text-gray1" />
          </div>
        </div>
      </div>

      <div className="my-2 px-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-dark2 rounded-lg px-2 h-9 w-full">
            <div className="w-8 h-9 flex items-center justify-center">
              <MdSearch className="w-5 h-5 text-gray1" />
            </div>
            <input
              type="text"
              placeholder="Search or start new chat"
              className="border-none outline-none bg-transparent text-sm text-gray1 p-2 w-full h-full"
            />
          </div>

          <div className="w-[26px] h-[26px] flex justify-center items-center cursor-pointer">
            <BsFilter className="text-gray1 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="max-h-[79.9vh] overflow-y-auto overflow-x-hidden sidebar_card_wrapper">
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard />
        <SidebarCard isLastCard={true} />

        <div className="bg-gray1Light h-[1px] mt-3"></div>

        <div className="flex items-center justify-center gap-1 text-xs text-gray1 text-center py-3">
          <HiLockClosed />
          <p>
            Your personal messages are{" "}
            <span className="text-blue1 cursor-pointer">
              end-to-end-encrypted
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
