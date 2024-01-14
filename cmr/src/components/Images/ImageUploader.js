import React, { useState, useCallback, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";
import useTicketHandler from "../hook/useTicketHandler";
import ImageToolbar from "./ImageToolbar";

const ImgDropAndCrop = ({ dish }) => {
  const values = dish.content;
  const [isPointerOnImage, setIsPointerOnImage] = useState(false);

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
    width: "100%",
    height: "100%",
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
    // Aggiorna lo stato con le nuove informazioni sulla traslazione
    setOffset(newPosition);
    console.log("Nuova posizione:", newPosition, "scale", scale); // Mostra le informazioni sulla traslazione con console.log
  };
  const handleDeleteImg = () => {
    setImg(null);
  };

  const onChangeScale = (e) => setScale(parseFloat(e.target.value));

  return (
    <div
      style={{
        background: "#777",
        maxHeight: "250px",
      }}
      className="position-relative rounded-start-4 w-100 h-100 d-flex align-items-center ustify-content-center "
      onMouseEnter={() => setIsPointerOnImage(true)}
      onMouseLeave={() => setIsPointerOnImage(false)}
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
            onMouseUp={handleImageOffsetTicket}
          />

          <ImageToolbar
            isPointerOnImage={isPointerOnImage}
            scale={scale}
            onChangeScale={onChangeScale}
            handleImageScaleTicket={handleImageScaleTicket}
            handleDeleteImg={handleDeleteImg}
          />
        </>
      )}
    </div>
  );
};

export default ImgDropAndCrop;
