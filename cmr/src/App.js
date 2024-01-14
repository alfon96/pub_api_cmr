import React, { useMemo, useState } from "react";
import sectionsFile from "./components/data/sections.json";
import dishesFile from "./components/data/dishes.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import SectionContainer from "./components/dnd-kit/Section";
import DishCard from "./components/dnd-kit/DishCard";
import Button from "@mui/material-next/Button";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  typography: {
    poster: {
      fontSize: 64,
      color: "red",
    },
    // Disable h3 variant
    h3: undefined,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // Map the new variant to render a <h1> by default
          poster: "h1",
        },
      },
    },
  },
});

function App() {
  const [sections, setSections] = useState(sectionsFile);
  const [dishes, setDishes] = useState(dishesFile);

  const sectionsId = useMemo(
    () => sections.map((section) => section.id),
    [sections]
  );

  const [activeSection, setActiveSection] = useState(null);
  const [activeDish, setActiveDish] = useState(null);

  const createSection = () => {
    const newSection = {
      id: uuidv4(),
      title: `New Section `,
    };

    setSections((prev) => [...prev, newSection]);
  };

  function onDragStart(event) {
    if (event.active.data.current?.type === "Section") {
      setActiveSection(event.active.data.current.section);
      return;
    }

    if (event.active.data.current?.type === "DishCard") {
      setActiveDish(event.active.data.current.dish);
      return;
    }
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveADishCard = active.data.current?.type === "DishCard";
    const isOverADishCard = over.data.current?.type === "DishCard";

    if (!isActiveADishCard) return;

    // Im dropping a DishCard over another DishCard
    if (isActiveADishCard && isOverADishCard) {
      setDishes((dishes) => {
        const activeIndex = dishes.findIndex((t) => t.id === activeId);
        const overIndex = dishes.findIndex((t) => t.id === overId);

        if (dishes[activeIndex].sectionId != dishes[overIndex].sectionId) {
          dishes[activeIndex].sectionId = dishes[overIndex].sectionId;
          return arrayMove(dishes, activeIndex, overIndex - 1);
        }

        return arrayMove(dishes, activeIndex, overIndex);
      });
    }

    const isOverASection = over.data.current?.type === "Section";

    // Im dropping a Task over a column
    if (isActiveADishCard && isOverASection) {
      setDishes((dishes) => {
        const activeIndex = dishes.findIndex((t) => t.id === activeId);

        dishes[activeIndex].sectionId = overId;
        return arrayMove(dishes, activeIndex, activeIndex);
      });
    }
  }

  const onDragEnd = (event) => {
    setActiveSection(null);
    setActiveDish(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Section";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setSections((sections) => {
      const activeSectionIndex = sections.findIndex(
        (col) => col.id === activeId
      );

      const overSectionIndex = sections.findIndex((col) => col.id === overId);

      return arrayMove(sections, activeSectionIndex, overSectionIndex);
    });
  };

  return (
    <div className=" py-5 shadow-lg bg-light" style={{ minHeight: "100vh" }}>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="d-flex  mt-5  flex-column align-items-center justify-content-center ">
          <Button
            startIcon={<AddIcon />}
            color="primary"
            variant="filled"
            className="mb-4"
            onClick={createSection}
          >
            Add Section
          </Button>
          <SortableContext items={sectionsId}>
            {sections.map((section) => (
              <React.Fragment key={section.id}>
                <SectionContainer
                  section={section}
                  dishes={dishes.filter(
                    (dish) => dish.sectionId === section.id
                  )}
                />
              </React.Fragment>
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeSection && (
              <SectionContainer
                section={activeSection}
                dishes={dishes.filter(
                  (dish) => dish.sectionId == activeSection.id
                )}
              />
            )}
            {activeDish && <DishCard dish={activeDish} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default App;
