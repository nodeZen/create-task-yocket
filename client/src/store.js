import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./store/task-slice";
import authReducer from "./store/auth-slice";

export default configureStore({
  reducer: {
    task: tasksReducer,
    auth: authReducer,
  },
});
