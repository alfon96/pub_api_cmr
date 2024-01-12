import { Draggable } from "@hello-pangea/dnd";
import SingleEntry from "../SingleEntry/SingleEntry";
import ListGroup from "react-bootstrap/ListGroup";
import CreateNewItem from "../SingleEntry/CreateNewItem";
import { useSelector } from "react-redux";

const DraggableWrapper = (props) => {
  const section = props.section;
  const noDrag = useSelector((state) => state.drag.noDrag);
  const keyItemsSection = Object.keys(section.child);

  return (
    <>
      {keyItemsSection.map((key, index) => (
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
                  sectionKey={props.sectionKey}
                  setItems={props.setSectionItems}
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
                  section={section}
                  sectionKey={props.sectionKey}
                  setItems={props.setSectionItems}
                />
              </ListGroup.Item>
            </>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default DraggableWrapper;
