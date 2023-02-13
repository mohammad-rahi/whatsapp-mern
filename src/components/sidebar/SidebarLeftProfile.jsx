import React, { useEffect, useState } from "react";

import { BsEmojiLaughing } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import MoreMenu from "../MoreMenu";
import PropTypes from "prop-types";
import { SIDEBAR_MENU } from "../../lib/sidebarMore";
import { useAuth } from "../../context/AuthContext";

const SidebarLeftProfile = ({
  showSidebarLeftProfle,
  setShowSidebarLeftProfle,
  setShowProfileClickMenu,
  showProfileClickMenu,
}) => {
  const { user } = useAuth();

  const [editName, setEditName] = useState(false);
  const [editBio, setEditBio] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setEditName(false);
      }
    });

    if (editName) {
      document.getElementById("edit_name").focus();
    }
  }, [editName]);

  useEffect(() => {
    // document.addEventListener("click", (e) => {
    //   let profieMore = document.querySelector("#profile_pic_more");
    //   let isClosest = e.target.closest("#profile_pic_more");
    //   console.log(isClosest);
    //   if (!isClosest && profieMore.classList.contains("show")) {
    //     profieMore.classList.remove("show");
    //   }
    // });
  }, []);

  const handleProfileClick = (e) => {
    let profieMore = document.querySelector("#profile_pic_more");

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.

    profieMore.setAttribute("style", `left: ${x}px; top: ${y}px`);
    setShowProfileClickMenu(true);
  };

  return (
    <div
      className={`absolute w-full h-full bg-dark1 z-10 transition-all duration-500 sidebarLeftProfile ${
        showSidebarLeftProfle ? "active left-0" : "-left-[300%]"
      }`}
    >
      <header className="bg-dark2 px-3 pt-[60px]">
        <div className="px-2 h-12 pt-1 sidebarleft_header_text transition-all duration-500 delay-300">
          <div className="flex items-center gap-6">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition duration-300 sidebar_right_icon"
              onClick={() => {
                setShowSidebarLeftProfle(false);
                setEditName(false);
              }}
            >
              <HiArrowLeft className="w-5 h-5 text-gray-200" />
            </div>

            <span className="text-gray-200 font-medium text-[19px]">
              Profile
            </span>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-7">
        <div className="relative">
          {/* <MoreMenu showMenu={showProfileClickMenu} menus={SIDEBAR_MENU} /> */}
          <div
            id="profile_pic_more"
            className={`bg-dark3 text-gray-300 text-[15px] absolute z-10 w-[195px] sidebar_menu rounded-[3px] py-[10px] transition-all duration-300 origin-top-left  ${
              showProfileClickMenu
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0"
            }`}
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            <ul>
              {SIDEBAR_MENU.map((menu, i) => (
                <li
                  key={i}
                  className="py-[9px] px-6 hover:bg-dark1 transition-all duration-100 cursor-pointer"
                >
                  {menu}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="relative cursor-pointer profile_pic_wrapper transition-all duration-700 delay-300"
            onClick={handleProfileClick}
          >
            <div
              className={`absolute top-0 left-0 right-0 bottom-0 bg-[rgb(32_44_51_/_80%)] flex flex-col items-center justify-center gap-4 profile_pic_overlay transition duration-75 rounded-full ${
                showProfileClickMenu && "active"
              }`}
            >
              <FaCamera className="w-6 h-6 text-gray1" />
              <span className="uppercase text-sm text-gray1 text-center leading-none font-medium">
                chage <br /> profile photo
              </span>
            </div>
            <figure className="w-[200px] h-[200px] rounded-full overflow-hidden cursor-pointer">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-full h-auto"
              />
            </figure>
          </div>
        </div>
      </div>

      <div className="px-7 py-[14px] sidebar_left_info transition-all duration-700 delay-300">
        <div>
          <div className="text-sm text-green4">Your name</div>
          <div className="my-4 flex items-center justify-between">
            <div
              className={`flex items-center gap-2 w-full ${
                editName && "border-b-2"
              } border-gray4 transition-all duration-100`}
            >
              <div
                id="edit_name"
                className="text-lg text-gray-300 w-full outline-none border-none"
                contentEditable={editName}
                onFocus={(e) => {
                  e.currentTarget.parentElement.classList.add("border-green4");
                  e.currentTarget.parentElement.classList.remove(
                    "border-gray4"
                  );
                }}
                onBlur={(e) => {
                  e.currentTarget.parentElement.classList.add("border-gray4");
                  e.currentTarget.parentElement.classList.remove(
                    "border-green4"
                  );
                }}
              >
                {user.displayName}
              </div>

              <div className="flex items-center gap-1">
                {editName && (
                  <div
                    className={`w-6 h-6 cursor-pointer flex items-center justify-center`}
                    title={"Open emojis panel"}
                  >
                    <BsEmojiLaughing className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                <div
                  className={`w-6 h-6 cursor-pointer flex items-center justify-center`}
                  title={
                    editName ? "Click to save, ESC to cancel" : "Click to edit"
                  }
                  onClick={(e) => {
                    if (editName) {
                      setEditName(false);
                    } else {
                      setEditName(true);
                    }
                  }}
                >
                  {editName ? (
                    <IoCheckmarkOutline className="w-5 h-5 text-gray-400" />
                  ) : (
                    <MdModeEdit className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400 my-7">
            This is not your username or pin. This name will be visible to your
            WhatsApp contacts.
          </p>
        </div>
        <div className="my-10">
          <div className="text-sm text-green4">About</div>
          <div className="mt-5 flex justify-between">
            <div
              className="text-gray-300 leading-5 text-[17px]"
              contentEditable={editBio}
            >
              {user.bio}
            </div>
            <div
              className="w-7 h-7 cursor-pointer flex items-center justify-center"
              title="Click to edit About"
              onClick={() => setEditBio(true)}
            >
              <MdModeEdit className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SidebarLeftProfile.propTypes = {
  showSidebarLeftProfle: PropTypes.bool.isRequired,
  setShowSidebarLeftProfle: PropTypes.any.isRequired,
};

export default SidebarLeftProfile;
