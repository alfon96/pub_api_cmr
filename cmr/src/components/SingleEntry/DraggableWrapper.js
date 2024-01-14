import React from "react";
import { DndContext } from "@dnd-kit/core";

import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import {useDroppable} from '@dnd-kit/core';

function DragComponent() {
  return (
    <DndContext>
      <Draggable />
      <Droppable />
    </DndContext>
  );
}

export default DragComponent;
