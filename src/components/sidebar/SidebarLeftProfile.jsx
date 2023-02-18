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
              <svg viewBox="0 0 24 24" height="24" width="24">
                <path
                  fill="#d9dee0"
                  d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
                ></path>
              </svg>
            </div>

            <span className="text-[#d9dee0] font-medium text-[19px]">
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
              {mongoUser && mongoUser.photoURL ? (
                <img
                  id="profile_pic"
                  src={mongoUser.photoURL}
                  alt={mongoUser.displayName}
                  className="w-full h-auto"
                />
              ) : (
                <svg viewBox="0 0 212 212">
                  <path
                    fill="#6a7175"
                    d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"
                  ></path>
                  <g>
                    <path
                      fill="#FFFFFF"
                      d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"
                    ></path>
                    <path
                      fill="#FFFFFF"
                      d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"
                    ></path>
                  </g>
                </svg>
              )}
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
                    <svg viewBox="0 0 20 20" height="20" width="20">
                      <path
                        fill="#8696a0"
                        d="M9.5,1.7C4.8,1.7,1,5.5,1,10.2s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S14.2,1.7,9.5,1.7z  M9.5,17.6c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S13.6,17.6,9.5,17.6z"
                      ></path>
                      <path
                        fill="#8696a0"
                        d="M6.8,9.8C7.5,9.7,8,9.1,7.9,8.4C7.8,7.8,7.4,7.3,6.8,7.3C6.1,7.3,5.6,8,5.7,8.7 C5.7,9.3,6.2,9.7,6.8,9.8z"
                      ></path>
                      <path
                        fill="#8696a0"
                        d="M13.9,11.6c-1.4,0.2-2.9,0.3-4.4,0.4c-1.5,0-2.9-0.1-4.4-0.4c-0.2,0-0.4,0.1-0.4,0.3 c0,0.1,0,0.2,0,0.2c0.9,1.8,2.7,2.9,4.7,3c2-0.1,3.8-1.2,4.8-3c0.1-0.2,0-0.4-0.1-0.5C14.1,11.6,14,11.6,13.9,11.6z M9.8,13.6 c-2.3,0-3.5-0.8-3.7-1.4c2.3,0.4,4.6,0.4,6.9,0C13,12.3,12.6,13.6,9.8,13.6L9.8,13.6z"
                      ></path>
                      <path
                        fill="#8696a0"
                        d="M12.2,9.8c0.7-0.1,1.2-0.7,1.1-1.4c-0.1-0.6-0.5-1.1-1.1-1.1c-0.7,0-1.2,0.7-1.1,1.4 C11.2,9.3,11.6,9.7,12.2,9.8z"
                      ></path>
                    </svg>
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
                    <svg viewBox="0 0 24 24" height="24" width="24">
                      <path
                        fill="#8696a0"
                        d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"
                      ></path>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" height="24" width="24">
                      <path
                        fill="#8696a0"
                        d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"
                      ></path>
                    </svg>
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
                    <svg viewBox="0 0 20 20" height="20" width="20">
                      <path
                        fill="#8696a0"
                        d="M9.5,1.7C4.8,1.7,1,5.5,1,10.2s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S14.2,1.7,9.5,1.7z  M9.5,17.6c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S13.6,17.6,9.5,17.6z"
                      ></path>
                      <path
                        fill="#8696a0"
                        d="M6.8,9.8C7.5,9.7,8,9.1,7.9,8.4C7.8,7.8,7.4,7.3,6.8,7.3C6.1,7.3,5.6,8,5.7,8.7 C5.7,9.3,6.2,9.7,6.8,9.8z"
                      ></path>
                      <path
                        fill="#8696a0"
                        d="M13.9,11.6c-1.4,0.2-2.9,0.3-4.4,0.4c-1.5,0-2.9-0.1-4.4-0.4c-0.2,0-0.4,0.1-0.4,0.3 c0,0.1,0,0.2,0,0.2c0.9,1.8,2.7,2.9,4.7,3c2-0.1,3.8-1.2,4.8-3c0.1-0.2,0-0.4-0.1-0.5C14.1,11.6,14,11.6,13.9,11.6z M9.8,13.6 c-2.3,0-3.5-0.8-3.7-1.4c2.3,0.4,4.6,0.4,6.9,0C13,12.3,12.6,13.6,9.8,13.6L9.8,13.6z"
                      ></path>
                      <path
                        fill="#8696a0"
                        d="M12.2,9.8c0.7-0.1,1.2-0.7,1.1-1.4c-0.1-0.6-0.5-1.1-1.1-1.1c-0.7,0-1.2,0.7-1.1,1.4 C11.2,9.3,11.6,9.7,12.2,9.8z"
                      ></path>
                    </svg>
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
                    <svg viewBox="0 0 24 24" height="24" width="24">
                      <path
                        fill="#8696a0"
                        d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"
                      ></path>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" height="24" width="24">
                      <path
                        fill="#8696a0"
                        d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"
                      ></path>
                    </svg>
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
