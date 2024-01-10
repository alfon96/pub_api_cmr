import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import { updateMasterTicket } from "../store/foodSlice";

function CardForm(props) {
  const [name, setName] = useState(props.foodData.name);
  const [description, setDescription] = useState(props.foodData.description);
  const [price, setPrice] = useState(props.foodData.price);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form
      className="d-flex flex-column p-3 bg-light rounded-end-4"
      onClick={handleSubmit}
    >
      <Form.Control
        type="text"
        placeholder="Dish Name"
        className="mt-1 text-center fw-bold"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onMouseLeave={() => {
          dispatch(
            updateMasterTicket({
              sectionName: props.sectionName,
              elementId: props.foodData.id,
              fieldName: "name",
              newValue: name,
            })
          );
        }}
      />

      <Form.Control
        as="textarea"
        placeholder="Dish Description"
        className="mt-3 text-center fst-italic"
        rows="3"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <InputGroup className="my-3 w-50 mx-auto ">
        <Form.Control
          type="number"
          step="0.01"
          placeholder="5.50"
          className="ms-auto text-center fw-semibold"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <InputGroup.Text id="money">€</InputGroup.Text>
      </InputGroup>
    </Form>
  );
}

export default CardForm;
