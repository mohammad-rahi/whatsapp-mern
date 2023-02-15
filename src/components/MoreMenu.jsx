import React from "react";

const MoreMenu = ({ showMenu, menus, onLogout }) => {
  return (
    <div
      className={`bg-dark3 text-gray-300 text-[15px] absolute z-[100] w-[195px] sidebar_menu rounded-[3px] py-[10px] top-[110%] right-1 transition-all duration-300 origin-top-right  ${
        showMenu ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <ul>
        {menus.map((menu, i) => (
          <li
            key={i}
            className="py-[9px] px-6 hover:bg-dark1 transition-all duration-100 cursor-pointer"
            onClick={() => (menu === "Log out" ? onLogout() : null)}
          >
            {menu}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoreMenu;
