import React, { useState, useCallback } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { TiDelete } from "react-icons/ti";

const ImgDropAndCrop = (props) => {
  const [file, setFile] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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
      setFile(uploadedFile);

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
    setPosition(newPosition);
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
    setFile(null);
  };

  const onChangeScale = (e) => setScale(parseFloat(e.target.value));

  return (
    <div
      style={{ width: "100%", height: "100%", background: "#777" }}
      className=" position-relative rounded-start-4  overflow-hidden d-flex flex-column align-items-center justify-content-center"
    >
      {file === null && (
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
      {file && (
        <AvatarEditor
          image={file}
          border={0}
          height={imageHeight}
          width={imageWidth}
          scale={scale}
          color={[255, 255, 255, 0.6]} // RGBA
          rotate={0}
          style={divStyle}
          className=""
          onPositionChange={handleChangedPosition}
        />
      )}

      {file && (
        <Row className="position-absolute fixed-bottom  p-1 d-flex align-items-center justify-content-center">
          <Col xs={6}>
            <Form.Range
              value={scale}
              onChange={onChangeScale}
              min=".5"
              max="2"
              step="0.05"
              className=" opacity-75 rounded-pill"
            />
          </Col>
          <Col xs={6}>
            <Button
              variant="danger"
              id="search-keyword"
              type="submit"
              className="d-flex ms-auto "
              onClick={handleDeleteImg}
            >
              <TiDelete />
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ImgDropAndCrop;
