import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import SearchBar from "../SearchBar/SearchBar";
import classes from "./WrapBadges.module.css";
import Autocomplete from "../input/Autocomplete";

const Keywords = () => {
  const [filters, setFilters] = useState(["Vegan"]);

  return (
    <>
      <p className="text-center">Diet Type & Allergens</p>
      <Autocomplete />
    </>
  );
};

export default Keywords;
