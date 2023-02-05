import { BsWhatsapp } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import React from "react";

const Loading = () => {
  return (
    <div className="justify-center items-center h-screen flex bg-dark1 text-gray1">
      <div className="flex items-center justify-center flex-col">
        <BsWhatsapp className="w-12 h-12 text-gray-500" />
        <div className="w-[320px] h-1 bg-dark4 mb-8 mt-10">
          <div className="h-1 bg-green2 w-11/12"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-medium">WhatsApp</p>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <HiLockClosed />
            <span>End-to-end encrypted</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
