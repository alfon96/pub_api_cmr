import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useMemo, useState } from "react";
import DishCard from "./DishCard";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";
const SectionContainer = ({ dishes, section }) => {
  const dishesIds = useMemo(() => {
    return dishes.map((dish) => dish.id);
  }, [dishes]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: section.id,
    data: { section, type: "Section" },
  });

  const style = {
    transition,

    transform: isDragging ? "translate3d(0, 0, 0)" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="w-100 px-5">
      <Accordion>
        <AccordionSummary
          id={section.id}
          expandIcon={<ExpandMoreIcon />}
          className="my-2"
        >
          <React.Fragment>
            <DragIndicatorIcon
              {...attributes}
              {...listeners}
              className="me-3"
            ></DragIndicatorIcon>
            <Divider flexItem />
            {section.title}
          </React.Fragment>
        </AccordionSummary>
        <Divider className="bg-dark mb-4" />
        <AccordionDetails>
          <SortableContext items={dishesIds}>
            <ListGroup>
              {dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </ListGroup>
          </SortableContext>
        </AccordionDetails>
        <AccordionActions>
          <Button>Delete</Button>
          <Button>Add</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
};

export default SectionContainer;
