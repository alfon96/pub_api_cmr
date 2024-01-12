import Accordion from "react-bootstrap/Accordion";
import SingleSection from "./SingleSection";
import { useSelector } from "react-redux";

function SectionsAccordion() {
  const fullMenu = useSelector((state) => state.food.menu);
  const sectionKeys = Object.keys(fullMenu);
  return (
    <Accordion defaultActiveKey="0" className="my-5">
      {sectionKeys.map((sectionKey, index) => {
        const section = fullMenu[sectionKey];
        return (
          <Accordion.Item
            key={section.name}
            eventKey={index}
            className="text-dark"
          >
            <SingleSection sectionKey={sectionKey} section={section} />
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default SectionsAccordion;
