import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import EggAltIcon from "@mui/icons-material/EggAlt";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "nowrap",

    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    overflow: "auto",
    maxWidth: "200px",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function getRandomColor() {
  const colors = [
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export default function ChipsArray({ isIngredient, dish }) {
  const [chip, setChip] = React.useState("");

  const buildChips = React.useMemo(() => {
    const actualElements = isIngredient ? "ingredients" : "allergens";
    let chips = [];

    if (dish.content && dish.content[actualElements]) {
      dish.content[actualElements].map((item, index) => {
        chips.push({
          key: index,
          label: item,
          color: getRandomColor(),
        });
      });
    }

    return chips;
  }, [dish]);

  const [chipData, setChipData] = React.useState(buildChips);

  const createChip = () => {
    setChipData((currentChips) => {
      const newLabel = chip;

      if (!currentChips.some((chip) => chip.label === newLabel)) {
        return [
          ...currentChips,
          {
            key: currentChips.length + 1,
            label: newLabel,
            color: getRandomColor(),
          },
        ];
      }
      setChip("");
      return currentChips;
    });
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        height: "170px",
      }}
    >
      <FormControl
        sx={{ width: "180px" }}
        variant="standard"
        onSubmit={createChip}
        className=" m-1"
      >
        <InputLabel htmlFor="standard-adornment-password">
          {isIngredient ? "Add ingredients" : "Add allergens"}
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="add new ingredient or allergen"
                onClick={createChip}
                onMouseDown={createChip}
              >
                {isIngredient ? <EggAltIcon /> : <HealthAndSafetyIcon />}
              </IconButton>
            </InputAdornment>
          }
          value={chip}
          onChange={(e) => {
            setChip(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              createChip();
              setChip("");
            }
          }}
        />
      </FormControl>

      <div
        style={{
          width: "180px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start", // Allineamento delle chips a sinistra
          listStyle: "none",
          padding: "2px", // Aggiungi spazio tra le chips
          overflowY: "auto",
          maxHeight: "150px", // Imposta l'altezza massima del contenitore scrollabile
        }}
      >
        {chipData.map((data) => {
          return (
            <ListItem key={data.key}>
              <Chip
                size="small"
                color={data.color}
                label={data.label}
                onDelete={
                  data.label === "React" ? undefined : handleDelete(data)
                }
              />
            </ListItem>
          );
        })}
      </div>
    </div>
  );
}
