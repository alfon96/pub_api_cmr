import CardForm from "./CardForm";
import ImgDropAndCrop from "../Images/ImageUploader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import ChipsArray from "../chip/Chip";
import DishContent from "./DishContent";

function ItemCard({ dish }) {
  return (
    <>
      <Card sx={{ display: "flex", width: "100%" }}>
        <CardMedia sx={{ width: 250 }} alt="Dish Picture">
          <ImgDropAndCrop dish={dish}></ImgDropAndCrop>
        </CardMedia>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }} className="m-0 p-3 pb-0">
            <CardForm dish={dish}></CardForm>
          </CardContent>
        </Box>
        <Box sx={{ display: "flex" }}>
          <CardContent sx={{ flex: "1 0 auto" }} className="m-0 p-0  ">
            <ChipsArray isIngredient={true} dish={dish}></ChipsArray>
          </CardContent>
        </Box>
        <Box sx={{ display: "flex" }}>
          <CardContent sx={{ flex: "1 0 auto" }} className="mx-0 p-0  ">
            <ChipsArray dish={dish}></ChipsArray>
          </CardContent>
        </Box>
        <Box sx={{ display: "flex" }}>
          <CardContent sx={{ flex: "1 0 auto" }} className="m-0 p-3 pb-0">
            <DishContent dish={dish}></DishContent>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}

export default ItemCard;
