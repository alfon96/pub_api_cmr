import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import allDietOptions from "../../food.json";
import allAllergens from "../../allergens.json";
import Autocomplete from "../input/Autocomplete";

import { TiDelete } from "react-icons/ti";

const AdditionalData = () => {
  const handleDeleteItem = () => {};
  return (
    <Row className="g-3  px-5 d-flex align-items-center justify-content-end border border-2  shadow-sm rounded-4 ">
      <Col xs={12} className="text-center fw-bold fs-5 text-muted">
        Additional Data
      </Col>

      <Col xs={12}>
        {/* Ingredients */}
        <p className="text-center">Ingredients</p>
        <Autocomplete referringData={allDietOptions} sliceResults={true} />
      </Col>

      <Col xs={12} className="mb-4">
        {/* Allergenes */}
        <p className="text-center">Allergens</p>
        <Autocomplete referringData={allAllergens} sliceResults={false} />
      </Col>
    </Row>
  );
};

export default AdditionalData;
