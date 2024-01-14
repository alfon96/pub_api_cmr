import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ListGroup from "react-bootstrap/ListGroup";
import useTicketHandler from "../hook/useTicketHandler";
import DraggableWrapper from "../SingleEntry/DraggableWrapper";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SingleEntry from "../SingleEntry/SingleEntry";
import CreateNewItem from "../SingleEntry/CreateNewItem";

const SingleSection = (props) => {
  const sectionKey = props.sectionKey;
  const section = props.section;
  const noDrag = useSelector((state) => state.drag.noDrag);

  const [sectionItems, setSectionItems, handleSectionItems] = useTicketHandler({
    initialValue: section.child,
    pathKey: [sectionKey],
    fieldName: "child",
  });

  const [sectionTitle, setSectionTitle, handleSectionTitle] = useTicketHandler({
    initialValue: section.name,
    pathKey: [sectionKey],
    fieldName: "name",
  });

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  function swapKeysOrder(dict, key1, key2) {
    if (!(key1 in dict) || !(key2 in dict)) return dict;

    const keys = Object.keys(dict);
    const index1 = keys.indexOf(key1);
    const index2 = keys.indexOf(key2);

    keys[index1] = key2;
    keys[index2] = key1;

    const newDict = {};
    keys.forEach((key) => {
      newDict[key] = dict[key];
    });

    return newDict;
  }

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const currentSectionItems = sectionItems;
    const keys = Object.keys(sectionItems);
    const newSection = swapKeysOrder(
      currentSectionItems,
      keys[result.source.index],
      keys[result.destination.index]
    );

    setSectionItems(newSection);

    //handleSectionItems();
  };

  return (
    <>
      <Accordion.Header>
        <Form onClick={handleFormClick}>
          <Form.Control
            type="text"
            placeholder="Enter the Menu Section Title"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            className="border-0 fs-5"
            style={{ background: "transparent" }}
          />
        </Form>
      </Accordion.Header>
      <Accordion.Body className="mb-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={section.name}>
            {(provided) => (
              <ListGroup
                {...provided.droppableProps}
                ref={provided.innerRef}
                className=""
              >
                {Object.entries(sectionItems).map(([key, value], index) => (
                  <Draggable
                    handle=".handle"
                    key={key}
                    draggableId={key.toString()}
                    index={index}
                    isDragDisabled={noDrag}
                  >
                    {(provided) => (
                      <>
                        {/* Create a new Item */}
                        {index === 0 && (
                          <CreateNewItem
                            section={section}
                            sectionKey={sectionKey}
                            setItems={setSectionItems}
                          ></CreateNewItem>
                        )}
                        {/* List of fetched items */}
                        <ListGroup.Item
                          className=" px-0 shadow my-1  rounded-3  d-flex align-items-center justify-content-center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <SingleEntry
                            itemKey={key}
                            section={value}
                            sectionKey={sectionKey}
                            setItems={setSectionItems}
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
