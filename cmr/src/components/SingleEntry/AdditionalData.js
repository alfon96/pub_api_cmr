import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import allDietOptions from "../data/food.json";
import allAllergens from "../data/allergens.json";
import Autocomplete from "../input/Autocomplete";

const AdditionalData = (props) => {
  return (
    <Row className="g-1 px-3 d-flex align-items-center justify-content-end ">
      <Col xs={12}>
        <h6 className="text-center text-muted  my-2">Ingredients</h6>
        <Autocomplete
          referringData={allDietOptions}
          sliceResults={true}
          sectionKey={props.sectionKey}
          itemKey={props.itemKey}
          section={props.section}
          fieldName="ingredients"
        />
      </Col>

      <Col xs={12} className="mb-4">
        {/* Allergenes */}
        <h6 className="text-center text-muted my-2">Allergens - Diet Type</h6>
        <Autocomplete
          referringData={allAllergens}
          sliceResults={false}
          sectionKey={props.sectionKey}
          itemKey={props.itemKey}
          section={props.section}
          fieldName="allergens"
        />
      </Col>
    </Row>
  );
};

export default AdditionalData;
