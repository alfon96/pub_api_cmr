import React, { useRef, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import CardForm from "./CardForm";
import ImgDropAndCrop from "../Images/ImageUploader";
import Form from "react-bootstrap/Form";

function ItemCard() {
  return (
    <>
      <Row className="border shadow-lg rounded-4">
        <Col xs={12} xxl={6} className="p-0  ">
          <ImgDropAndCrop></ImgDropAndCrop>
        </Col>
        <Col xs={12} xxl={6} className="p-0  rounded-end-4 ">
          <CardForm></CardForm>
        </Col>
      </Row>
    </>
  );
}

export default ItemCard;
