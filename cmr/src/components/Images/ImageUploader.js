import React, { useState, useCallback, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { allowDrag, stopDrag } from "../store/draggableSlice";
import useTicketHandler from "../hook/ticketHandler";
import ImageToolbar from "./ImageToolbar";

const ImgDropAndCrop = (props) => {
  const dispatch = useDispatch();
  const values = props.section.child[props.itemKey];

  const [img, setImg, handleImageFileTicket] = useTicketHandler({
    initialValue: values.imagePreview ?? null,
    pathKey: [props.sectionKey, props.itemKey],
    fieldName: "imagePreview",
  });

  const [offset, setOffset, handleImageOffsetTicket] = useTicketHandler({
    initialValue: values.offset,
    pathKey: [props.sectionKey, props.itemKey],

    fieldName: "offset",
  });

  const [scale, setScale, handleImageScaleTicket] = useTicketHandler({
    initialValue: parseFloat(values.scale),
    pathKey: [props.sectionKey, props.itemKey],

    fieldName: "scale",
  });

  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  useEffect(() => {
    if (img) {
      const image = new Image();
      image.src = img;

      image.onload = () => {
        setImageWidth(image.naturalWidth);
        setImageHeight(image.naturalHeight);
      };
    }
  }, [img]);

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
        setImageWidth(this.width);
        setImageHeight(this.height);
        setScale(this.width / this.height);
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
    console.log(
      "Nuova posizione:",
      newPosition,
      "scale",
      scale,
      "aspect-ratio",
      imageHeight / imageWidth
    ); // Mostra le informazioni sulla traslazione con console.log
  };
  const handleDeleteImg = () => {
    setImg(null);
  };

  const onChangeScale = (e) => setScale(parseFloat(e.target.value));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#777",
        maxHeight: "250px",
      }}
      className=" position-relative rounded-start-4 overflow-hidden d-flex flex-column align-items-center justify-content-center"
      onMouseEnter={() => dispatch(stopDrag())}
      onMouseLeave={() => dispatch(allowDrag())}
    >
      {(img === null || img === "") && (
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #333",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
          // className="m-2"
        >
          <input {...getInputProps()} />
          <p className="fw-semibold text-white">
            Drag and drop a file here, or click to select one
          </p>
        </div>
      )}
      {img && (
        <AvatarEditor
          image={img}
          border={0}
          height={imageHeight}
          width={imageWidth}
          scale={scale}
          position={offset}
          color={[255, 255, 255, 0.6]} // RGBA
          rotate={0}
          style={divStyle}
          className=""
          onPositionChange={handleChangedPosition}
          onMouseUp={handleImageOffsetTicket}
        />
      )}

      {img && (
        <ImageToolbar
          scale={scale}
          onChangeScale={onChangeScale}
          handleImageScaleTicket={handleImageScaleTicket}
          handleDeleteImg={handleDeleteImg}
        />
      )}
    </div>
  );
};

export default ImgDropAndCrop;
