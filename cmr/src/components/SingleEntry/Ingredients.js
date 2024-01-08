import React from "react";
import Badge from "react-bootstrap/Badge";
import SearchBar from "../SearchBar/SearchBar";
import classes from "./WrapBadges.module.css";
import Autocomplete from "../input/Autocomplete";

const Keywords = () => {
  return (
    <>
      <p className="text-center">Ingredients</p>

      <Autocomplete />
    </>
  );
};

export default Keywords;
