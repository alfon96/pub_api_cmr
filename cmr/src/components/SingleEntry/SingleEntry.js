import ItemCard from "./ItemCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AdditionalData from "./AdditionalData";

const SingleEntry = (props) => {
  return (
    <Container fluid className="m-0 p-0" id={props.id}>
      <Row className="g-5 gy-5 px-2 d-flex align-items-center justify-content-center">
        <Col xs={12} md={12} lg={6}>
          <ItemCard
            foodData={props.foodData}
            sectionName={props.sectionName}
          ></ItemCard>
        </Col>
        <Col xs={12} md={12} lg={5}>
          <AdditionalData
            foodData={props.foodData}
            sectionName={props.sectionName}
          ></AdditionalData>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleEntry;
