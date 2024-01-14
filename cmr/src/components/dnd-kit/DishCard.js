import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SingleEntry from "../SingleEntry/SingleEntry";
import ListGroup from "react-bootstrap/ListGroup";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DishCard = ({ dish }) => {
  if (!dish) {
    console.log("Empty");
  }
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: dish.id,
    data: {
      dish,
      type: "DishCard",
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ListGroup.Item className="bg-white shadow-sm rounded-2 border-0 my-1">
        <Row className="bg-white m-0 p-0 rounded-4 d-flex align-items-center justify-content-center ">
          <Col xs={1} className="text-center">
            <DragIndicatorIcon
              {...attributes}
              {...listeners}
            ></DragIndicatorIcon>
          </Col>
          <Col xs={11} className="bg-white ps-0 pe-3 rounded-4 d-flex  ">
            <SingleEntry dish={dish}></SingleEntry>
          </Col>
        </Row>
      </ListGroup.Item>
    </div>
  );
};

export default DishCard;
