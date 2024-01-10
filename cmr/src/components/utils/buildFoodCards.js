import SingleEntry from "../SingleEntry/SingleEntry";

export const buildFoodCards = (dataFromServer) => {
  const sections = Object.keys(dataFromServer);
  const foodCards = {};

  sections.forEach((section) => {
    const sectionItems = dataFromServer[section];
    foodCards[section] = []; // Initialize as an empty array

    sectionItems.forEach((item) => {
      foodCards[section].push(
        <SingleEntry key={item.id} foodData={item}></SingleEntry>
      );
    });
  });

  return foodCards;
};
