import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { IoIosSave } from "react-icons/io";
import { MdOutlineUndo } from "react-icons/md";
import { IoMdRedo } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateTicketHistory } from "../store/foodSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <Col
      xs={1}
      className=" px-3 rounded-3 vh-100 position-fixed d-flex flex-column align-items-center justify-content-center"
    >
      <Button
        variant="outline-secondary"
        className="w-100 "
        onClick={(e) => {
          // dispatch(
          //   updateMasterTicket({
          //     sectionName: props.sectionName,
          //     elementId: props.foodData.id,
          //     fieldName: "price",
          //     newValue: price,
          //   })
          // );
        }}
      >
        <IoIosSave style={{ width: "25px", height: "25px" }} />
      </Button>
      <Button
        variant="outline-secondary"
        className="w-100 my-1"
        onClick={(e) => {
          dispatch(
            updateTicketHistory({
              undo: true,
            })
          );
        }}
      >
        <MdOutlineUndo style={{ width: "25px", height: "25px" }} />
      </Button>
      <Button
        variant="outline-secondary"
        className="w-100"
        onClick={(e) => {
          dispatch(
            updateTicketHistory({
              redo: true,
            })
          );
        }}
      >
        <IoMdRedo style={{ width: "25px", height: "25px" }} />
      </Button>
    </Col>
  );
};

export default Sidebar;
