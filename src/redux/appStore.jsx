import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import expensesReducer from "./expensesSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer,
  },
});

export default appStore;
