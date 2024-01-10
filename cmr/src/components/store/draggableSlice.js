// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dragSlice = createSlice({
  name: "draggable",
  initialState: {
    noDrag: false,
  },
  reducers: {
    stopDrag: (state) => {
      state.noDrag = true;
    },
    allowDrag: (state) => {
      state.noDrag = false;
    },
  },
});

export const { stopDrag, allowDrag } = dragSlice.actions;
export default dragSlice.reducer;
