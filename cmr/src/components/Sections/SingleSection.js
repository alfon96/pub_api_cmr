import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { reorderItems } from "../store/foodSlice";
import useTicketHandler from "../hook/ticketHandler";
import DraggableWrapper from "../SingleEntry/DraggableWrapper";
import { useEffect } from "react";

const SingleSection = (props) => {
  const sectionKey = props.sectionKey;
  const section = props.section;

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

  useEffect(() => {
    handleSectionItems();
  }, [section]);

  const dispatch = useDispatch();

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list
    let reorderedItems;
    dispatch(
      (reorderedItems = reorderItems({
        result: result,
        sectionId: section.id,
      }))
    );
    setSectionItems(reorderedItems);
  };
  const noDrag = useSelector((state) => state.drag.noDrag);

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
                <DraggableWrapper
                  section={section}
                  setSectionItems={setSectionItems}
                  sectionKey={props.sectionKey}
                ></DraggableWrapper>
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
