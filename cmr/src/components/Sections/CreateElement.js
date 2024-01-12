import ListGroup from "react-bootstrap/ListGroup";

const CreateElement = () => {
  return (
    <ListGroup.Item
      className=" px-0 shadow my-1  rounded-3  d-flex align-items-center justify-content-center"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <SingleEntry foodData={emptyFood} sectionKey={props.sectionKey} />
    </ListGroup.Item>
  );
};

export default CreateElement;
