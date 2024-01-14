import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardForm from "./CardForm";
import ImgDropAndCrop from "../Images/ImageUploader";

function ItemCard({ dish }) {
  return (
    <>
      <Row className="border shadow rounded-4 border-0  ">
        <Col xs={12} md={6} className="p-0  overflow-hidden ">
          <ImgDropAndCrop dish={dish}></ImgDropAndCrop>
        </Col>
        <Col xs={12} md={6} className="p-0  rounded-end-4 bg-light">
          <CardForm dish={dish}></CardForm>
        </Col>
      </Row>
    </>
  );
}

export default ItemCard;
