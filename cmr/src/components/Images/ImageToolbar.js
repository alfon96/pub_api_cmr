import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import classes from "./ImageToolbar.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import Slider from "@mui/material/Slider";

const ImageToolbar = (props) => {
  return (
    <Row
      className={`position-absolute fixed-bottom m-0  d-flex align-items-center justify-content-center  ${
        props.isPointerOnImage ? "d-block" : "d-none "
      } ${classes.imageToolbar}`}
      style={{ maxHeight: "32px" }}
    >
      <Col xs={8} className="d-flex align-items-center justify-content-center">
        <Slider
          aria-label="Temperature"
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
      <Col xs={3} className="d-flex align-items-center justify-content-center">
        <ClearIcon
          sx={{ color: "#ff7700", cursor: "pointer" }}
          onClick={props.handleDeleteImg}
          className={`ms-auto rounded-circle `}
        ></ClearIcon>
      </Col>
    </Row>
  );
};

export default ImageToolbar;
