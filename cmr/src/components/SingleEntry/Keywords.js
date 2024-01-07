import React from "react";
import Badge from "react-bootstrap/Badge";
import SearchBar from "../SearchBar/SearchBar";
import classes from "./WrapBadges.module.css";

const Keywords = () => {
  return (
    <>
      <SearchBar />
      <div className={classes.badgeContainer}>
        <Badge bg="primary">Vegan</Badge>
        <Badge bg="secondary">Vegetarian</Badge>
        <Badge bg="success">Meat</Badge>
        <Badge bg="danger">Fish</Badge>
        <Badge bg="warning" text="dark">
          Gluten-Free
        </Badge>
        <Badge bg="info">Lactose-Free</Badge>
        <Badge bg="light" text="dark">
          No-Walnuts
        </Badge>
        <Badge bg="dark">No-Dairy</Badge>
      </div>
    </>
  );
};

export default Keywords;
