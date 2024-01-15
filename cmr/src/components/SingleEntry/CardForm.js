import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import useTicketHandler from "../hook/useTicketHandler";
import TextField from "@mui/material/TextField";

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

  return (
    <div className="d-flex flex-column bg-white m-0 p-0 rounded-end-4 ">
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        size="small"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onBlur={handleNameTicket}
      />
      <TextField
        size="small"
        id="outlined-basic"
        label="Description"
        variant="outlined"
        multiline
        rows={3}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        onBlur={handleDescriptionTicket}
        className="my-3"
      />
      <TextField
        size="small"
        id="outlined-basic"
        label="Price"
        variant="outlined"
        type="number"
        value={price}
        inputProps={{
          step: "0.01",
        }}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        onBlur={handlePriceTicket}
        className=""
      />
    </div>
  );
}

export default CardForm;
