import { v4 as uuidv4 } from "uuid";

export const createEmptyFood = () => {
  const id = uuidv4();

  return {
    id,
    name: "",
    price: 0,
    description: "",
    allergens: [],
    imagePreview: "",
    images: [],
    ingredients: [],
    food_beverage: "",
    offset: { x: 0, y: 0 },
    scale: 1,
    order: 0,
  };
};

export const getEmptyFoodField = (fieldName) => {
  const emptyFood = createEmptyFood();

  if (emptyFood.hasOwnProperty(fieldName)) {
    return emptyFood[fieldName];
  } else {
    return null;
  }
};
