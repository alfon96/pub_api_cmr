import testData from "../data/test.json";

export const createMap = (menu) => {
  const elementsMap = new Map();

  menu.forEach((section) => {
    elementsMap.set(section.id, section);
    section.items.forEach((dish) => {
      elementsMap.set(dish.id, dish);
    });
  });

  return { menu, elementsMap };
};
