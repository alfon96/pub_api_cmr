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
    <div className=" position-fixed bottom-0 end-0 p-3 d-flex justify-element-center align-items-end flex-column gap-2">
      <Button
        variant="dark"
        className=" rounded-5 btn-lg d-flex justify-element-center align-items-end"
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
        <IoIosSave />
      </Button>
      <Button
        variant="info"
        className="rounded-5 btn-lg d-flex justify-element-center align-items-end "
        onClick={(e) => {
          dispatch(
            updateTicketHistory({
              undo: true,
            })
          );
        }}
      >
        <MdOutlineUndo />
      </Button>

      <Button
        variant="warning"
        className="rounded-5 btn-lg d-flex justify-element-center align-items-end"
        onClick={(e) => {
          dispatch(
            updateTicketHistory({
              redo: true,
            })
          );
        }}
      >
        <IoMdRedo />
      </Button>
    </div>
  );
};

export default Sidebar;
