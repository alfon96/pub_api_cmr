import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { IoIosSave } from "react-icons/io";
import { MdOutlineUndo } from "react-icons/md";
import { IoMdRedo } from "react-icons/io";

const Sidebar = () => {
  return (
    <Col
      xs={1}
      className=" px-3 rounded-3 vh-100 position-fixed d-flex flex-column align-items-center justify-content-center"
    >
      <Button variant="outline-secondary" className="w-100 ">
        <IoIosSave style={{ width: "25px", height: "25px" }} />
      </Button>
      <Button variant="outline-secondary" className="w-100 my-1">
        <MdOutlineUndo style={{ width: "25px", height: "25px" }} />
      </Button>
      <Button variant="outline-secondary" className="w-100">
        <IoMdRedo style={{ width: "25px", height: "25px" }} />
      </Button>
    </Col>
  );
};

export default Sidebar;
