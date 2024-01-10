import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import useTicketHandler from "../hook/ticketHandler";

function CardForm(props) {
  const [name, setName, handleNameTicket] = useTicketHandler({
    initialValue: props.foodData.name,
    sectionName: props.sectionName,
    elementId: props.foodData.id,
    fieldName: "name",
  });

  const [description, setDescription, handleDescriptionTicket] =
    useTicketHandler({
      initialValue: props.foodData.description,
      sectionName: props.sectionName,
      elementId: props.foodData.id,
      fieldName: "description",
    });

  const [price, setPrice, handlePriceTicket] = useTicketHandler({
    initialValue: props.foodData.price,
    sectionName: props.sectionName,
    elementId: props.foodData.id,
    fieldName: "price",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form
      className="d-flex flex-column p-3 rounded-end-4"
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
