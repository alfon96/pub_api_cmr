import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SingleEntry from "../SingleEntry/SingleEntry";
import ListGroup from "react-bootstrap/ListGroup";
import Box from "@mui/material/Box";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Stack from "@mui/material/Stack";
import ClearIcon from "@mui/icons-material/Clear";
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

  const handleDeleteEntry = () => {};
  return (
    <div ref={setNodeRef} style={style}>
      <ListGroup.Item className="bg-white shadow-sm rounded-2 border-0 my-1 d-flex align-items-center justify-content-center">
        <Stack spacing={3}>
          <DragIndicatorIcon
            {...attributes}
            {...listeners}
            className=""
          ></DragIndicatorIcon>
          <ClearIcon
            onClick={handleDeleteEntry}
            className=" "
            style={{ cursor: "pointer" }}
          ></ClearIcon>
        </Stack>

        <SingleEntry dish={dish}></SingleEntry>
      </ListGroup.Item>
    </div>
  );
};

export default DishCard;
