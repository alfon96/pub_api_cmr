import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import classes from "./ImageToolbar.module.css";

const ImageToolbar = (props) => {
  return (
    <Row
      className={`position-absolute fixed-bottom p-1 d-flex align-items-center justify-content-center ${classes.toolbarBkg}`}
    >
      <Col xs={6} className=" d-flex align-items-center justify-content-center">
        <Form.Range
          value={props.scale}
          onChange={props.onChangeScale}
          min=".5"
          max="2"
          step="0.025"
          className={` ${classes.toolbarItemOpacity} `}
          onMouseUp={props.handleImageScaleTicket}
        />
      </Col>
      <Col xs={6}>
        <Button
          variant="danger"
          className={`${classes.toolbarItemOpacity} ${classes.btnDeleteSize} d-flex justify-content-center p-0 align-items-center ms-auto`}
          style={{ height: "20px", width: "28px" }}
          onClick={props.handleDeleteImg}
        >
          {"\u2a09"}
        </Button>
      </Col>
    </Row>
  );
};

export default ImageToolbar;
