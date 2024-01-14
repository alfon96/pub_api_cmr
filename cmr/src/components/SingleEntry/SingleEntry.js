import ItemCard from "./ItemCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AdditionalData from "./AdditionalData";
import ClearIcon from "@mui/icons-material/Clear";
const SingleEntry = ({ dish }) => {
  const handleDeleteEntry = () => {
    // props.setItems((prevValue) =>
    //   prevValue.filter((item) => item.id != props.item.values.id)
    // );
  };

  return (
    <Row className="p-1 m-2 position-relative d-flex align-items-center justify-content-center  ">
      <Col xs={11} sm={8} md={10} lg={7} xxl={4} className="py-3 py-sm-0">
        <ItemCard dish={dish}></ItemCard>
      </Col>
      <Col xs={12} sm={11} md={11} lg={5} xxl={6} className="">
        <AdditionalData dish={dish}></AdditionalData>
      </Col>

      <ClearIcon
        onClick={handleDeleteEntry}
        style={{
          height: "45px",
          width: "45px",
          color: "#c038ff",
          cursor: "pointer",
        }}
        className="position-absolute top-0 start-100 translate-middle m-2 d-flex align-items-center justify-content-center "
      ></ClearIcon>
    </Row>
  );
};

export default SingleEntry;
