import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import useTicketHandler from "../hook/useTicketHandler";

function CardForm({ dish }) {
  const values = dish.content;
  const [name, setName, handleNameTicket] = useTicketHandler({
    initialValue: values.name,

    fieldName: "name",
  });

  const [description, setDescription, handleDescriptionTicket] =
    useTicketHandler({
      initialValue: values.description,

      fieldName: "description",
    });

  const [price, setPrice, handlePriceTicket] = useTicketHandler({
    initialValue: values.price,

    fieldName: "price",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form
      className="d-flex flex-column bg-white p-3 rounded-end-4 h-100"
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
        onBlur={handleNameTicket}
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
        onBlur={handleDescriptionTicket}
      />
      <InputGroup className="my-3 w-75 mx-auto ">
        <Form.Control
          type="number"
          step="0.01"
          placeholder="5.50"
          className="ms-auto text-center fw-semibold"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          onBlur={handlePriceTicket}
        />
        <InputGroup.Text id="money">€</InputGroup.Text>
      </InputGroup>
    </Form>
  );
}

export default CardForm;
