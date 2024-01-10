import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Title from "../Title/Title";
import SearchBar from "../SearchBar/SearchBar";
import SectionsAccordion from "../Sections/Sections";

import { useDispatch } from "react-redux";

import { setMenu } from "../store/foodSlice";
import Sidebar from "../sidebar/Sidebar";

const AddEdit = () => {
  const dataFromServer = {
    Pizze: [
      {
        id: "wdocoq",
        name: "Pizza Margherita",
        price: 7.99,
        description: "Classic Italian pizza with fresh mozzarella and basil.",
        allergens: ["Vegetarian"],
        imagePreview:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: ["assets/pizza1.jpg", "assets/pizza2.jpg"],
        ingredients: ["Mozzarella Cheese", "Tomato", "Basil", "White Flour"],
        food_beverage: 0,
        xOffset: 0.5238257317903338,
        yOffset: 0.552667346245327,
        scale: 1.2,
        order: 0,
      },
      {
        id: "ddeeff",
        name: "Pizza Hawaiian",
        price: 9.49,
        description:
          "A tropical pizza with ham, pineapple, and mozzarella cheese.",
        allergens: ["None"],
        imagePreview:
          "https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2020-03/hawaiian-pizza.jpg?itok=a1-_QjRA",
        images: ["assets/pizza1.jpg", "assets/pizza2.jpg"],
        ingredients: ["Ham", "Pineapple", "Mozzarella Cheese", "White Flour"],
        food_beverage: 0,
        xOffset: 0.5238257317903338,
        yOffset: 0.552667346245327,
        scale: 1.2,
        order: 1,
      },
      {
        id: "gghhii",
        name: "Pizza Veggie",
        price: 7.99,
        description:
          "A vegetarian delight with bell peppers, olives, and mozzarella cheese.",
        allergens: ["Vegetarian"],
        imagePreview:
          "https://www.twopeasandtheirpod.com/wp-content/uploads/2021/03/Veggie-Pizza-8.jpg",
        images: ["assets/pizza1.jpg", "assets/pizza2.jpg"],
        ingredients: [
          "Bell Peppers",
          "Olives",
          "Mozzarella Cheese",
          "White Flour",
        ],
        food_beverage: 0,
        xOffset: 0.5238257317903338,
        yOffset: 0.552667346245327,
        scale: 1.2,
        order: 2,
      },
      {
        id: "jjkkll",
        name: "Pizza BBQ Chicken",
        price: 10.99,
        description:
          "A savory pizza with BBQ chicken, red onions, and cheddar cheese.",
        allergens: ["None"],
        imagePreview:
          "https://www.thecandidcooks.com/wp-content/uploads/2023/04/bbq-chicken-pizza-feature.jpg",
        images: ["assets/pizza1.jpg", "assets/pizza2.jpg"],
        ingredients: [
          "BBQ Chicken",
          "Red Onions",
          "Cheddar Cheese",
          "White Flour",
        ],
        food_beverage: 0,
        xOffset: 0.5238257317903338,
        yOffset: 0.552667346245327,
        scale: 1.2,
        order: 3,
      },
      {
        id: "mmnnoo",
        name: "Pizza Meat Lovers",
        price: 11.99,
        description: "A carnivore's dream with pepperoni, sausage, and bacon.",
        allergens: ["None"],
        imagePreview:
          "https://www.thespruceeats.com/thmb/X5Bb0o-D-a3PcKYnqMEQApKUUT0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/aqIMG_4568fhor-0b89dc5c8c494ee9828ed29805791c5a.jpg",
        images: ["assets/pizza1.jpg", "assets/pizza2.jpg"],
        ingredients: [
          "Pepperoni",
          "Sausage",
          "Bacon",
          "Mozzarella Cheese",
          "White Flour",
        ],
        food_beverage: 0,
        xOffset: 0.5238257317903338,
        yOffset: 0.552667346245327,
        scale: 1.2,
        order: 4,
      },
    ],
    Hamburger: [
      {
        id: "apdvi",
        name: "Classic Burger",
        price: 5.99,
        description: "Juicy beef burger with lettuce, tomato and cheese.",
        keywords: ["Meat"],
        imagePreview:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: ["assets/burger1.jpg", "assets/burger2.jpg"],
        ingredients: [
          "Cheddar Cheese",
          "Tomato",
          "Pickles",
          "Salad",
          "Onion",
          "Barbecue Sauce",
        ],
        food_beverage: 0,
        xOffset: 0.4942449957064148,
        yOffset: 0.4692070823710547,
        scale: 1.2038924930491195,
        order: 0,
      },
    ],
  };
  const dispatch = useDispatch();
  const menu = {};
  dispatch(setMenu(dataFromServer));

  return (
    <>
      {/* //Title */}
      <Container fluid className="mt-5 p-0 ">
        <Row className="g-0">
          <Sidebar></Sidebar>

          <Col xs={2}>
            <div className="bg-primary"></div>
          </Col>

          <Col xs={6}>
            <Title></Title>
          </Col>

          <Col xs={3}>
            <div className="bg-dark"></div>
          </Col>

          <Col xs={3}>
            <div className="bg-primary"></div>
          </Col>

          <Col xs={6}>{/* <SearchBar></SearchBar> */}</Col>

          <Col xs={3}>
            <div className="bg-dark"></div>
          </Col>
          <Col xs={1}>
            <div className="bg-dark"></div>
          </Col>

          <Col xs={10}>
            <SectionsAccordion></SectionsAccordion>
          </Col>

          <Col xs={1}>
            <div className="bg-primary"></div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddEdit;
