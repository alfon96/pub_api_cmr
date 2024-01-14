import Accordion from "react-bootstrap/Accordion";
import SingleSection from "./SingleSection";
import { useSelector } from "react-redux";

function SectionsAccordion() {
  const fullMenu = useSelector((state) => state.food.menu);

  return (
    <Accordion defaultActiveKey="0" className="my-5">
      {Object.entries(fullMenu).map(([sectionKey, sectionValues], index) => {
        return (
          <Accordion.Item
            key={sectionKey}
            eventKey={index.toString()}
            className="text-dark"
          >
            <SingleSection sectionKey={sectionKey} section={sectionValues} />
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default SectionsAccordion;
