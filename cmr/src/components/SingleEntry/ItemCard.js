import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardForm from "./CardForm";
import ImgDropAndCrop from "../Images/ImageUploader";

function ItemCard(props) {
  return (
    <>
      <Row className="border shadow-lg rounded-4 ">
        <Col xs={12} md={6} className="p-0  ">
          <ImgDropAndCrop
            foodData={props.foodData}
            sectionName={props.sectionName}
          ></ImgDropAndCrop>
        </Col>
        <Col xs={12} md={6} className="p-0  rounded-end-4 bg-light">
          <CardForm
            foodData={props.foodData}
            sectionName={props.sectionName}
          ></CardForm>
        </Col>
      </Row>
    </>
  );
}

export default ItemCard;
