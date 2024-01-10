import Accordion from "react-bootstrap/Accordion";
import SingleSection from "./SingleSection";
import { useSelector } from "react-redux";

function SectionsAccordion() {
  const fullMenu = useSelector((state) => state.food.menu);

  return (
    <Accordion defaultActiveKey="0" className="my-5">
      {Object.entries(fullMenu).map(([sectionName, sectionItems], index) => (
        <Accordion.Item key={index} eventKey={index} className="text-dark">
          <SingleSection
            sectionName={sectionName}
            sectionItems={sectionItems}
          />
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default SectionsAccordion;
