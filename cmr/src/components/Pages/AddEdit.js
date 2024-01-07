import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Title from "../Title/Title";
import SearchBar from "../SearchBar/SearchBar";
import SectionsAccordion from "../Sections/Sections";
import SingleEntry from "../SingleEntry/SingleEntry";
const AddEdit = () => {
  const items = [SingleEntry(), SingleEntry(), SingleEntry()];

  return (
    <>
      {/* To be deleted */}
      <Container fluid className="m-0 p-0">
        <Row className="g-0">
          <Col xs={1}>
            <div className="bg-primary">r</div>
          </Col>
          <Col xs={1}>
            <div className="bg-secondary">r</div>
          </Col>
          <Col xs={1}>
            <div className="bg-warning">r</div>
          </Col>
          <Col xs={6}>
            <div className="bg-info">r</div>
          </Col>

          <Col xs={1}>
            <div className="bg-success">r</div>
          </Col>
          <Col xs={1}>
            <div className="bg-danger">r</div>
          </Col>
          <Col xs={1}>
            <div className="bg-dark">r</div>
          </Col>
        </Row>
      </Container>
      {/* //Title */}
      <Container fluid className="mt-5 p-0">
        <Row className="g-0">
          <Col xs={3}>
            <div className="bg-primary"></div>
          </Col>

          <Col xs={6}>
            <Title></Title>
          </Col>

          <Col xs={3}>
            <div className="bg-dark"></div>
          </Col>
        </Row>
      </Container>

      {/* //Search Bar */}
      <Container fluid className="mt-5 p-0">
        <Row className="g-0">
          <Col xs={3}>
            <div className="bg-primary"></div>
          </Col>

          <Col xs={6}>
            <SearchBar></SearchBar>
          </Col>

          <Col xs={3}>
            <div className="bg-dark"></div>
          </Col>
        </Row>
      </Container>

      {/* //Sections Accordion */}
      <Container fluid className="mt-5 p-0">
        <Row className="g-0">
          <Col xs={1}>
            <div className="bg-primary"></div>
          </Col>

          <Col xs={10}>
            <SectionsAccordion
              title={"Pizze"}
              items={items}
            ></SectionsAccordion>
          </Col>

          <Col xs={1}>
            <div className="bg-primary"></div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddEdit;
