import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import allDietOptions from "../../food.json";
import allAllergens from "../../allergens.json";
import Autocomplete from "../input/Autocomplete";

const AdditionalData = (props) => {
  return (
    <Row className="g-3  px-5 d-flex align-items-center justify-content-end border border-2  shadow-sm rounded-4 ">
      <Col xs={12} className="text-center fw-bold fs-5 text-muted">
        Additional Data
      </Col>

      <Col xs={12}>
        {/* Ingredients */}
        <p className="text-center">Ingredients</p>
        <Autocomplete
          referringData={allDietOptions}
          sliceResults={true}
          foodData={props.foodData}
          sectionName={props.sectionName}
          fieldName="ingredients"
        />
      </Col>

      <Col xs={12} className="mb-4">
        {/* Allergenes */}
        <p className="text-center">Allergens</p>
        <Autocomplete
          referringData={allAllergens}
          sliceResults={false}
          foodData={props.foodData}
          sectionName={props.sectionName}
          fieldName="allergens"
        />
      </Col>
    </Row>
  );
};

export default AdditionalData;
