import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./tasks-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { tasks: taskSlice.reducer, ui: uiSlice.reducer },
});

export default store;
