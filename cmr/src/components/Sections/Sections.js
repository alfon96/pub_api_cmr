import React from "react";
import Accordion from "react-bootstrap/Accordion";

function SectionsAccordion(props) {
  const items = props.items;
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h4 className="text-dark">{props.title}</h4>
        </Accordion.Header>
        <Accordion.Body className="my-5">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item}
              {index < items.length - 1 && <hr className="my-5" />}
            </React.Fragment>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default SectionsAccordion;
