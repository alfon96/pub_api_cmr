import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/system";

const CustomFormLabel = styled(FormLabel)({
  color: "#003399",
});

const initialData = {
  vegan: false,
  vegetarian: false,
  fish: false,
  meat: false,
};
export default function CheckboxesGroup() {
  const [state, setState] = React.useState(initialData);

  const { vegan, vegetarian, fish, meat } = state;

  const handleChange = (event) => {
    const newData = { ...initialData };
    newData[event.target.name] = event.target.checked;
    setState(newData);
  };

  const { gilad, jason, antoine } = state;

  return (
    <Box sx={{ display: "inline-flex" }} className="m-0 p-0">
      <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
        <CustomFormLabel component="legend" className="my-1">
          Diet Filters
        </CustomFormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color={"success"}
                size="small"
                checked={vegan}
                onChange={handleChange}
                name="vegan"
              />
            }
            label="Vegan"
          />
          <FormControlLabel
            control={
              <Checkbox
                color={"info"}
                size="small"
                checked={vegetarian}
                onChange={handleChange}
                name="vegetarian"
              />
            }
            label="Vegetarian"
          />
          <FormControlLabel
            control={
              <Checkbox
                color={"warning"}
                size="small"
                checked={fish}
                onChange={handleChange}
                name="fish"
              />
            }
            label="Fish"
          />
          <FormControlLabel
            control={
              <Checkbox
                color={"error"}
                size="small"
                checked={meat}
                onChange={handleChange}
                name="meat"
              />
            }
            label="Meat"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
