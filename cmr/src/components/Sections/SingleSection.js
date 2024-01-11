import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import SingleEntry from "../SingleEntry/SingleEntry";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { createEmptyFood } from "../models/food";

const SingleSection = (props) => {
  const emptyFood = createEmptyFood();
  const [items, setItems] = useState([emptyFood, ...props.sectionItems]);

  const [title, setTitle] = useState(props.sectionName);
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };
  const noDrag = useSelector((state) => state.drag.noDrag);
  return (
    <>
      <Accordion.Header>
        <Form onClick={handleFormClick}>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-0 fs-5"
            style={{ background: "transparent" }}
          />
        </Form>
      </Accordion.Header>
      <Accordion.Body className="mb-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={props.sectionName}>
            {(provided) => (
              <ListGroup
                {...provided.droppableProps}
                ref={provided.innerRef}
                className=""
              >
                {items.map((item, index) => (
                  <Draggable
                    handle=".handle"
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                    isDragDisabled={noDrag}
                  >
                    {(provided) => (
                      <>
                        {/* Create a new Item */}

                        {/* List of fetched items */}
                        <ListGroup.Item
                          className=" px-0 shadow my-1  rounded-3  d-flex align-items-center justify-content-center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <SingleEntry
                            foodData={item}
                            sectionName={props.sectionName}
                          />
                        </ListGroup.Item>
                      </>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ListGroup>
            )}
          </Droppable>
        </DragDropContext>
      </Accordion.Body>
    </>
  );
};

export default SingleSection;
