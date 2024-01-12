import ItemCard from "./ItemCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AdditionalData from "./AdditionalData";

const SingleEntry = (props) => {
  const handleDeleteEntry = () => {
    props.setItems((prevValue) =>
      prevValue.filter((item) => item.id != props.item.values.id)
    );
  };

  return (
    <Container fluid className="m-0 py-4 position-relative  ">
      <Row className="g-5 px-3 d-flex align-items-center justify-content-center">
        <Col xs={11} sm={8} md={10} lg={7} className="py-3 py-sm-0">
          <ItemCard
            itemKey={props.itemKey}
            section={props.section}
            sectionKey={props.sectionKey}
          ></ItemCard>
        </Col>
        <Col xs={12} sm={11} md={11} lg={5}>
          <AdditionalData
            itemKey={props.itemKey}
            section={props.section}
            sectionKey={props.sectionKey}
          ></AdditionalData>
        </Col>
      </Row>
      <Button
        variant="outline-dark"
        className="position-absolute top-0 end-0 rounded-3 btn-sm my-1 mx-3 d-flex align-items-center justify-content-center "
        style={{ height: "25px", width: "38px" }}
        onClick={handleDeleteEntry}
      >
        {"\u2a09"}
      </Button>
    </Container>
  );
};

export default SingleEntry;
