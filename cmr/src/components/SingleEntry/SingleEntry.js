import Ingredients from "./Ingredients";
import ItemCard from "./ItemCard";
import Keywords from "./Keywords";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SingleEntry = () => {
  return (
    <Container fluid className="m-0 p-0">
      {/* First Row */}
      <Row className="g-0 gy-5 d-flex align-items-center justify-content-center">
        <Col xs={3}></Col>

        <Col xs={6}>
          <ItemCard></ItemCard>
        </Col>

        <Col xs={3}></Col>

        {/* Second Row */}

        <Col xs={10}>
          <Ingredients></Ingredients>
        </Col>

        <Col xs={10}>
          <Keywords></Keywords>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleEntry;
