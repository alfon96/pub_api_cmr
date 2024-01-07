import React from "react";
import Badge from "react-bootstrap/Badge";
import SearchBar from "../SearchBar/SearchBar";
import classes from "./WrapBadges.module.css";

const Keywords = () => {
  return (
    <>
      <SearchBar />
      <div className={classes.badgeContainer}>
        <Badge bg="primary">Cheese</Badge>
        <Badge bg="secondary">Bread</Badge>
        <Badge bg="success">Olives</Badge>
        <Badge bg="danger">Salad</Badge>
        <Badge bg="warning" text="dark">
          Mushrooms
        </Badge>
        <Badge bg="info">Avocado</Badge>
        <Badge bg="light" text="dark">
          Cherries
        </Badge>
        <Badge bg="dark">Milk</Badge>
      </div>
    </>
  );
};

export default Keywords;
