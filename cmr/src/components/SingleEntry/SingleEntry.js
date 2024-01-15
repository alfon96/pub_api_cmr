import ItemCard from "./ItemCard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SingleEntry = ({ dish }) => {
  return (
    <Row className="p-1 m-2 position-relative d-flex align-items-center justify-content-center  ">
      <Col xs={12} className="">
        <ItemCard dish={dish}></ItemCard>
      </Col>
    </Row>
  );
};

export default SingleEntry;
