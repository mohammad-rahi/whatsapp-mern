import "cropperjs/dist/cropper.css";

import React, { useEffect, useState } from "react";

import { BsEmojiLaughing } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import MoreMenu from "../MoreMenu";
import { PROFILE_PIC_MORE } from "../../lib/profilePicMore";
import ProfileAdjast from "./ProfileAdjast";
import PropTypes from "prop-types";
import axios from "../../axios";
import { useAuth } from "../../context/AuthContext";

const SidebarLeftProfile = ({
  showSidebarLeftProfle,
  setShowSidebarLeftProfle,
  setShowProfileClickMenu,
  showProfileClickMenu,
}) => {
  const { mongoUser } = useAuth();

  const [editName, setEditName] = useState(false);
  const [name, setName] = useState("");
  const [tempName, setTempName] = useState("");
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState("");
  const [tempBio, setTempBio] = useState("");
  const [uploadProfile, setUploadProfile] = useState("");

  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");

  useEffect(() => {
    if (cropData) {
      axios
        .put(`/users/${mongoUser._id}`, {
          photoURL: cropData,
        })
        .then(() => {
          alert("Profile updated successfully. Please reload!");
        });
    }
  }, [cropData, mongoUser]);

  useEffect(() => {
    if (mongoUser._id) {
      setTempName(mongoUser.displayName);
      setTempBio(mongoUser.bio);
    }
  }, [mongoUser]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (document.activeElement === document.getElementById("edit_name")) {
          setEditName(false);
        }

        if (document.activeElement === document.getElementById("edit_bio")) {
          setEditBio(false);
        }

        return;
      }
    });
  }, []);

  useEffect(() => {
    if (editName) {
      document.getElementById("edit_name").focus();
    }

    if (editBio) {
      document.getElementById("edit_bio").focus();
    }
  }, [editBio, editName]);

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

  const handleEditName = () => {
    if (name.trim()) {
      axios.get(`/users/sync/${mongoUser.uid}`).then((res) => {
        if (res.data._id) {
          axios
            .put(`/users/${res.data._id}`, {
              displayName: name,
            })
            .then(() => {
              setEditName(false);
            })
            .catch((err) => {
              console.error(err);
              setEditName(false);
            });
        }
      });
    }
    setEditName(false);
  };

  const handleEditBio = () => {
    if (bio.trim()) {
      axios.get(`/users/sync/${mongoUser.uid}`).then((res) => {
        if (res.data._id) {
          axios
            .put(`/users/${res.data._id}`, {
              bio,
            })
            .then(() => {
              setEditBio(false);
            })
            .catch((err) => {
              console.error(err);
              setEditBio(false);
            });
        }
      });
    }

    setEditBio(false);
  };

  const handleProfilePicChange = (ev) => {
    setUploadProfile(ev.target.value);

    try {
      let url = URL.createObjectURL(ev.target.files[0]);
      setImage(url);
    } catch (error) {
      console.error(error);
    }
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

      <ProfileAdjast
        image={image}
        uploadProfile={uploadProfile}
        setUploadProfile={setUploadProfile}
        setCropData={setCropData}
      />

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
              {PROFILE_PIC_MORE.map((menu, i) => (
                <>
                  {menu === "Upload Photo" ? (
                    <li key={i}>
                      <label className="py-[9px] px-6 hover:bg-dark1 transition-all duration-100 cursor-pointer inline-block w-full">
                        {menu}

                        <input
                          type="file"
                          onChange={handleProfilePicChange}
                          className="hidden"
                          value={uploadProfile}
                          accept=".png, .jpg, .jpeg"
                        />
                      </label>
                    </li>
                  ) : (
                    <li
                      key={i}
                      className="py-[9px] px-6 hover:bg-dark1 transition-all duration-100 cursor-pointer"
                    >
                      {menu}
                    </li>
                  )}
                </>
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
                id="profile_pic"
                src={mongoUser.photoURL}
                alt={mongoUser.displayName}
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
              className={`flex gap-2 w-full ${
                editName && "border-b-2"
              } border-gray4 transition-all duration-100`}
            >
              <div
                id="edit_name"
                className="text-lg text-gray-300 w-full outline-none border-none"
                contentEditable={editName}
                onInput={(e) => setName(e.target.innerText)}
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
                {tempName}
              </div>

              <div className="flex items-center gap-1 h-fit">
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
                      handleEditName();
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
              className={`flex gap-2 w-full ${
                editBio && "border-b-2"
              } border-gray4 transition-all duration-100`}
            >
              <div
                id="edit_bio"
                className="text-gray-300 leading-5 text-[17px] w-full outline-none border-none"
                contentEditable={editBio}
                onInput={(e) => setBio(e.target.innerText)}
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
                {tempBio}
              </div>
              <div className="flex items-center gap-1 h-fit">
                {editBio && (
                  <div
                    className={`w-6 h-6 cursor-pointer flex items-center justify-center`}
                    title={"Open emojis panel"}
                  >
                    <BsEmojiLaughing className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                <div
                  className="w-6 h-6 cursor-pointer flex items-center justify-center"
                  title={
                    editBio
                      ? "Click to save, ESC to cancel"
                      : "Click to edit About"
                  }
                  onClick={() => {
                    if (editBio) {
                      handleEditBio();
                    } else {
                      setEditBio(true);
                    }
                  }}
                >
                  {editBio ? (
                    <IoCheckmarkOutline className="w-5 h-5 text-gray-400" />
                  ) : (
                    <MdModeEdit className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
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
