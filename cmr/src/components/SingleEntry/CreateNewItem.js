import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { createEmptyFood } from "../models/food";
import SingleEntry from "./SingleEntry";

const CreateNewItem = (props) => {
  const handleCreateEmptyCard = () => {
    props.setItems((prevValue) => [createEmptyFood(), ...prevValue]);
  };

  return (
    <Button variant="primary" onClick={handleCreateEmptyCard}>
      Add New Item
    </Button>
  );
};

export default CreateNewItem;
