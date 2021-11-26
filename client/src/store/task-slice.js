import { createSlice } from "@reduxjs/toolkit";
import taskState from "./task-state";

export const todoSlice = createSlice({
  name: "todo",
  initialState: taskState,
  reducers: {
    setNewtaskList: (state, action) => {
      state.taskList = action.payload;
    },
    setInfoMessage: (state, action) => {
      state.infoMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewtaskList,setInfoMessage } = todoSlice.actions;

export default todoSlice.reducer;
