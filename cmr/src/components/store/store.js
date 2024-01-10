// store.js
import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "./foodSlice";
import draggableSlice from "./draggableSlice";

const store = configureStore({
  reducer: {
    food: foodSlice,
    drag: draggableSlice,
  },
});

export default store;
