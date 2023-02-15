import React, { useState } from "react";

import { Cropper } from "react-cropper";
import { GrUndo } from "react-icons/gr";
import { HiXMark } from "react-icons/hi2";

const ProfileAdjast = ({
  uploadProfile,
  setUploadProfile,
  image,
  setCropData,
}) => {
  const [cropper, setCropper] = useState(null);

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL("image/webp", 0.8));

      setUploadProfile("");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-10 ${
        !uploadProfile && "asjast_image_wrapper"
      }`}
    >
      <div
        className="fixed top-0 left-0 bottom-0 right-0 bg-[rgb(17_27_33_/_85%)]"
        onClick={() => setUploadProfile("")}
      ></div>

      <div
        className={`aspect-square w-[500px] bg-dark5 shadow-xl text-text2 z-10 transition-all duration-300 ${
          !uploadProfile && "adjast_canvas"
        }`}
      >
        <div className="bg-dark2 p-3 pl-7 flex items-center gap-8">
          <HiXMark
            className="text-text2 text-3xl cursor-pointer"
            onClick={() => setUploadProfile("")}
          />
          <div className="flex items-center justify-between w-full">
            <p className="font-bold text-lg">Drag the image to adjast</p>
            <button
              className="flex items-end gap-2 justify-self-end"
              onClick={getCropData}
            >
              <GrUndo className="text-[#E9EDEF] text-[22px] self-start" />
              <span className="text-xs">Uplaod</span>
            </button>
          </div>
        </div>
        <div
          className="bg-[#080E11] h-[365px] overflow-auto relative"
          id="image_canvas_wrapper"
        >
          <Cropper
            className="cropper"
            zoomTo={0.5}
            style={{ height: "320px" }}
            aspectRatio={1}
            src={image}
            viewMode={1}
            minCropBoxHeight={500}
            minCropBoxWidth={500}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            center={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileAdjast;
