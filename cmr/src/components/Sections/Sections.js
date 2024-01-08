import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SectionsAccordion(props) {
  const items = props.items;
  const [title, setTitle] = useState(props.title);
  const handleFormClick = (e) => {
    e.stopPropagation();
  };
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0" className="text-dark">
        <Accordion.Header>
          <Form onClick={handleFormClick}>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-0  fs-5 "
              style={{ background: "transparent" }}
            />
          </Form>
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
