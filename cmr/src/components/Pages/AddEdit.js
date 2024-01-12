import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Title from "../Title/Title";
import SearchBar from "../SearchBar/SearchBar";
import SectionsAccordion from "../Sections/Sections";
import { useDispatch } from "react-redux";
import { setMenu } from "../store/foodSlice";
import Sidebar from "../sidebar/Sidebar";
import test from "../data/test.json";

const AddEdit = () => {
  const dataFromServer = test;

  const dispatch = useDispatch();
  dispatch(setMenu(dataFromServer));

  return (
    <>
      {/* //Title */}
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col xs={12} className="mt-5">
            <Title></Title>
          </Col>

          <Col xs={1}>
            <div className="bg-dark"></div>
          </Col>

          <Col xs={10}>
            <SectionsAccordion></SectionsAccordion>
          </Col>
        </Row>
        <Sidebar />
      </Container>
    </>
  );
};

export default AddEdit;
