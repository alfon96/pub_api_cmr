import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function CardForm() {
  return (
    <Form className="d-flex flex-column p-3">
      <Form.Control type="text" placeholder="Dish Name" className="mt-1" />

      <Form.Control
        as="textarea"
        placeholder="Dish Description"
        className="mt-3"
        rows="3"
      />
      <InputGroup className="my-3 w-75 ms-auto ">
        <Form.Control
          type="number"
          step="0.01"
          placeholder="5.50"
          className="ms-auto"
        />
        <InputGroup.Text id="money">€</InputGroup.Text>
      </InputGroup>

      <Button
        variant="warning"
        type="submit"
        className=" text-dark ms-auto fw-semibold"
      >
        Submit
      </Button>
    </Form>
  );
}

export default CardForm;
