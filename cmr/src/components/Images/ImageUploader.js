import React, { useState, useCallback, useEffect, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";
import useTicketHandler from "../hook/useTicketHandler";
import ImageToolbar from "./ImageToolbar";
import { AnimatePresence } from "framer-motion";
const ImgDropAndCrop = ({ dish }) => {
  const values = dish.content;
  const [pointerState, setPointerState] = useState(0);

  const [img, setImg, handleImageFileTicket] = useTicketHandler({
    initialValue: values?.imagePreview,

    fieldName: "imagePreview",
  });

  const [offset, setOffset, handleImageOffsetTicket] = useTicketHandler({
    initialValue: values.offset,

    fieldName: "offset",
  });

  const [scale, setScale, handleImageScaleTicket] = useTicketHandler({
    initialValue: parseFloat(values.scale),

    fieldName: "scale",
  });

  const divStyle = {
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    width: "250px",
    height: "200px",
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Ensure that only image files are processed
    if (acceptedFiles.length === 0) return;

    const uploadedFile = acceptedFiles[0];
    if (uploadedFile.type.startsWith("image/")) {
      setImg(uploadedFile);

      // Create a URL for the file
      const imageUrl = URL.createObjectURL(uploadedFile);

      // Load the image to get its dimensions
      const img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(imageUrl); // Clean up the URL after use
      };
      img.src = imageUrl;
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".png", ".webp"],
    },
    multiple: false,
  });

  const handleChangedPosition = (newPosition) => {
    setOffset(newPosition);
    console.log("Nuova posizione:", newPosition, "scale", scale);
    setPointerState(2);
  };
  const handleDeleteImg = () => {
    setImg(null);
  };

  const onChangeScale = (e) => {
    setScale(parseFloat(e.target.value));
    setPointerState(1);
  };
  const animateToolbar = pointerState !== 0;
  console.log("");
  return (
    <div
      style={{
        background: "#777",
        height: "200px",
      }}
      className="position-relative  d-flex align-items-center justify-content-center "
      onMouseEnter={() => setPointerState(1)}
      onMouseLeave={() => setPointerState(0)}
    >
      {(img === null || img === "") && (
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #bbb",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
          className="m-2"
        >
          <input {...getInputProps()} />
          <p className=" text-white text-center" style={{ color: "#aaa" }}>
            Drag and drop a file here, or click to select one
          </p>
        </div>
      )}
      {img && (
        <>
          <AvatarEditor
            image={img}
            border={0}
            scale={scale}
            position={offset}
            color={[255, 255, 255, 0.6]} // RGBA
            rotate={0}
            style={divStyle}
            onPositionChange={handleChangedPosition}
            onMouseUp={() => {
              handleImageOffsetTicket();
              setPointerState(1);
            }}
          />

          <AnimatePresence>
            {animateToolbar && (
              <ImageToolbar
                pointerState={pointerState}
                scale={scale}
                onChangeScale={onChangeScale}
                handleImageScaleTicket={handleImageScaleTicket}
                handleDeleteImg={handleDeleteImg}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default ImgDropAndCrop;
