import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import allDietOptions from "../data/food.json";
import allAllergens from "../data/allergens.json";
import Autocomplete from "../input/Autocomplete";

const AdditionalData = ({ dish }) => {
  return (
    <Row
      className="g-1 g-xxl-5 px-3 d-flex align-items-center justify-content-end bg-white"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <Col xs={12} xxl={6}>
        <h6 className="text-center text-muted my-2">Ingredients</h6>
        <Autocomplete
          referringData={allDietOptions}
          sliceResults={true}
          dish={dish}
          fieldName="ingredients"
        />
      </Col>

      <Col xs={12} xxl={6} className="mb-4">
        {/* Allergenes */}
        <h6 className="text-center text-muted my-2">Allergens - Diet Type</h6>
        <Autocomplete
          referringData={allAllergens}
          sliceResults={false}
          dish={dish}
          fieldName="allergens"
        />
      </Col>
    </Row>
  );
};

export default AdditionalData;
