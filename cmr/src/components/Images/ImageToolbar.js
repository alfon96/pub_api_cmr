import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import classes from "./ImageToolbar.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import Slider from "@mui/material/Slider";
import { motion } from "framer-motion";

const ImageToolbar = (props) => {
  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0.4 }}
      animate={{ fontSize: 50, color: "#ff294", x: 0, y: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0.75 }}
      className="position-absolute fixed-bottom m-0 p-0 "
    >
      <Row
        className={`d-flex align-items-center justify-content-center w-100  m-0 p-0 ${
          props.pointerState === 1 ? classes.imageToolbar : "d-none"
        }`}
        style={{ maxHeight: "32px" }}
      >
        <Col
          xs={1}
          className="d-flex align-items-center justify-content-center me-auto mx-2"
        >
          <ClearIcon
            sx={{ color: "#ff7700", cursor: "pointer", height: "28px" }}
            onClick={props.handleDeleteImg}
            className={` `}
          ></ClearIcon>
        </Col>
        <Col
          xs={8}
          className="d-flex align-items-center justify-content-center me-auto"
        >
          <Slider
            aria-label="Zoom"
            value={props.scale}
            defaultValue={props.scale}
            color="warning"
            onChange={props.onChangeScale}
            onMouseUp={props.handleImageScaleTicket}
            min={0.5}
            max={2}
            step={0.025}
            className=""
            size="small"
          />
        </Col>
      </Row>
    </motion.div>
  );
};

export default ImageToolbar;
